import mongoose, { Schema } from "mongoose";
import { Recipe } from "./recipe";
import { emptyRecipe } from "./emptyRecipe";

type RecipePreview = Omit<Recipe, "id">;

const url = process.env.DB_URI;

if (!url || url === "undefined") {
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
  thumbnail: {},
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

export function searchForRecipeIngredient(
  ingred: string
): Promise<Array<Recipe> | null> {
  return recipeModel
    .find({ "ingredients.ingredient": { $regex: `(.*)${ingred}(.*)` } })
    .lean()
    .exec();
}

export function searchForRecipeName(
  name: string
): Promise<Array<Recipe> | null> {
  return recipeModel
    .find({ name: { $regex: `(.*)${name}(.*)`, $options: "i" } })
    .lean()
    .exec();
}

export async function createOneRecipe(
  recipeBody: RecipePreview
): Promise<Recipe | null> {
  const lastRecipe: Recipe[] = await recipeModel
    .find()
    .sort({ id: -1 })
    .limit(1)
    .lean();

  const newRecipeBody = { ...recipeBody, id: lastRecipe[0].id + 1 };
  return new recipeModel(newRecipeBody).save();
}

export function deleteOneRecipe(id: number) {
  recipeModel.deleteOne({ id: id }).lean().exec();
}

export async function updateOneRecipe(id: number, recipeBody: Recipe) {
  const data = await recipeModel.find({ id: id }).lean().exec();
  if (!data) {
    throw new Error("This ID does not exist");
  }
  recipeModel.updateOne({ id: id }, recipeBody).exec();
}
