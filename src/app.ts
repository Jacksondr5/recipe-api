import express  from 'express';
import { promises as fs } from 'fs';
import mongoose, { Model, Schema } from 'mongoose';
import * as dotenv from 'dotenv';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

dotenv.config();
const url = process.env.DB_URI;
    
mongoose.connect(url);
const db = mongoose.connection;
db.on('error', (error) => {
    console.log(error)
});
db.once('connected', () => {
    console.log('Database Connected');
});

var recipeSchema = new Schema({
    id: Number,
    name: String,
    thumbnail: String,
    description: String,
    link: [],
    metadata: {},
    ingredients: [],
    steps: {},
});

interface Recipe {
    id: number;
    name: string;
    thumbnail: string;
    description: string;
    link: [];
    metadata: {};
    ingredients: [];
    steps: {};
}

const recipeModel = mongoose.model('recipes', recipeSchema)

//get recipes
app.get('/recipe', async function(req, res) {
    try {
        const recipeId = req.query.id;
        const ingredSearch = req.query.search;
        if (recipeId) {
            const recipeInt = +recipeId;
            const data = await recipeModel.find({id:`${recipeInt}`});
            res.status(200).json(data)
        }
        if (ingredSearch) {
            const data = await recipeModel.find({ingredients: {$regex: `(.*)${ingredSearch}(.*)`}});
            res.status(200).json(data)
        }
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
});

//get all recipes
app.get('/recipe/all', async function(req, res) {
    try {
        const data = await recipeModel.find();
        res.status(200).json(data)
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
});

//add a new recipe
app.post('/recipe', async function(req, res) {
    const data = new recipeModel(req.body);

    try {
        const dataToSave = await data.save();
        res.status(201).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

//delete a recipe by id
app.delete('/recipe', async function(req, res) {
    try {
        const recipeId = req.query.id;
        const recipeInt = +recipeId;
        await recipeModel.deleteOne({ id: `${recipeInt}` });
        res.status(202).send("Object deleted")
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

//update a recipe by id
app.patch('/recipe', async function(req,res) {
    try{
        const recipeId = req.query.id;
        const recipeInt = +recipeId;
        await recipeModel.updateOne({ id: `${recipeInt}`}, req.body);
        res.status(200).json(req.body);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

//get a list of recipes based on ingredients
app.get('/recipe/search', async function(req, res) {
    try{
        console.log(req.query.search)
        const recipeIngred = req.query.search;
        
        const data = await recipeModel.find({ingredients: {$regex: `(.*)${recipeIngred}(.*)`}});
        res.status(200).json(data)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

app.listen(port, () => {
    console.log(`recipe application is running on port ${port}.`)
});