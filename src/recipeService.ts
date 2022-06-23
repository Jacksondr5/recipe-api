import { Recipe } from "./recipe";
import {
  createOneRecipe,
  deleteOneRecipe,
  findAllRecipes,
  findOneRecipe,
  searchForRecipe,
  updateOneRecipe,
} from "./recipe.data";

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

export async function getRecipe(id: number) {
  return await findOneRecipe(id);
}

export async function getAllRecipe() {
  return await findAllRecipes();
}

export async function searchRecipe(ingredient: string) {
  return await searchForRecipe(ingredient);
}

export async function createRecipe(recipeBody: Recipe) {
  return await createOneRecipe(recipeBody);
}

export async function deleteRecipe(id: number) {
  await deleteOneRecipe(id);
}

export async function updateRecipe(id: number, recipeBody: Recipe) {
  await updateOneRecipe(id, recipeBody);
}
