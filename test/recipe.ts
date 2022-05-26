import express, { Request, Response, NextFunction, response } from 'express';
import { promises as fs } from 'fs';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

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

const jsonFilePath = './test/recipes.json'

const getRecipeJson = async(): Promise<Recipe[]> => {
    const _recipes = await fs.readFile(jsonFilePath, 'utf8');
    return JSON.parse(_recipes);
}

const writeJson = async(allRecipes: Recipe[]): Promise<void> => {
    await fs.writeFile(jsonFilePath, JSON.stringify(allRecipes));
}

app.get('/recipe', async function(req, res) {
    const recipeId = req.query.id;
    const allRecipes = await getRecipeJson();
    const index = allRecipes.findIndex((item: { id: number; }) => item.id === +recipeId);
    res.status(200).json(allRecipes[index]);
});

app.get('/all', async function(req, res) {
    const allRecipes = await getRecipeJson();
    console.log(allRecipes)
    res.status(200).json(allRecipes);
});

app.post('/recipe', async function(req, res) {
    const allRecipes = await getRecipeJson();
    const newRecipe:Recipe = req.body;
    console.log(req.body);
    allRecipes.push(newRecipe);
    await writeJson(allRecipes);
    res.status(201).json(newRecipe);
})

app.listen(port, () => {
    console.log(`recipe application is running on port ${port}.`)
});