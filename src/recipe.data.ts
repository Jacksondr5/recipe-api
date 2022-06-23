import mongoose, { Schema } from "mongoose";
import { Recipe } from "./recipe";

const url = process.env.DB_URI;

if (!url) {
  throw new Error("URL is undefined");
}

mongoose.connect(url);
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.once("connected", () => {
  console.log("Database Connected");
});

var recipeSchema = new Schema<Recipe>({
  id: Number,
  name: String,
  thumbnail: String,
  description: String,
  link: [],
  metadata: {},
  ingredients: [],
  steps: [],
});

const recipeModel = mongoose.model<Recipe>("recipes", recipeSchema);

export function findOneRecipe(id: number): Promise<Recipe | null> {
  return recipeModel.findOne({ id: id }).lean().exec();
}

export function findAllRecipes(): Promise<Array<Recipe> | null> {
  return recipeModel.find().lean().exec();
}

export function searchForRecipe(
  ingredient: string
): Promise<Array<Recipe> | null> {
  return recipeModel
    .find({ ingredients: { $regex: `(.*)${ingredient}(.*)` } })
    .lean()
    .exec();
}

export function createOneRecipe(recipeBody: Recipe): Promise<Recipe | null> {
  return new recipeModel(recipeBody).save();
}

export function deleteOneRecipe(id: number) {
  recipeModel.deleteOne({ id: id }).lean().exec();
}

export function updateOneRecipe(id: number, recipeBody: Recipe) {
  const data = recipeModel.find({ id: id }).lean().exec();
  if (!data) {
    throw new Error("This ID does not exist");
  }
  recipeModel.updateOne({ id: id }, recipeBody);
}
