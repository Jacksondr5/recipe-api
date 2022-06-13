import { Recipe } from "./recipe";
import mongoose, { Schema } from "mongoose";
import * as dotenv from "dotenv";

export type RecipeCreationParams = Pick<
  Recipe,
  | "id"
  | "name"
  | "thumbnail"
  | "description"
  | "link"
  | "metadata"
  | "ingredients"
  | "steps"
>;

dotenv.config();
const url = process.env.DB_URI;

mongoose.connect(url);
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.once("connected", () => {
  console.log("Database Connected");
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

const recipeModel = mongoose.model("recipes", recipeSchema);

export async function getRecipe(id: number) {
  try {
    const data = await recipeModel.find({ id: id });
    return data;
  } catch (error) {
    return { message: error.message };
  }
}

export async function getAllRecipe() {
  try {
    const data = await recipeModel.find();
    return data;
  } catch (error) {
    return { message: error.message };
  }
}

export async function searchRecipe(ingredient: string) {
  try {
    const data = await recipeModel.find({
      ingredients: { $regex: `(.*)${ingredient}(.*)` },
    });
    return data;
  } catch (error) {
    return { message: error.message };
  }
}

export async function createRecipe(recipeBody: Recipe) {
  try {
    const data = new recipeModel(recipeBody);
    const dataToSave = await data.save();
    return dataToSave;
  } catch (error) {
    return { message: error.message };
  }
}

export async function deleteRecipe(id: number) {
  try {
    await recipeModel.deleteOne({ id: id });
  } catch (error) {
    return { message: error.message };
  }
}

export async function updateRecipe(id: number, recipeBody: Recipe) {
  try {
    const data = await recipeModel.find({ id: id });
    if (data.length === 0) {
      return { message: "This ID does not exist" };
    }
    await recipeModel.updateOne({ id: id }, recipeBody);
  } catch (error) {
    return { message: error.message };
  }
}