import { Recipe, RecipePreview } from "./recipe";
import {
  createOneRecipe,
  deleteOneRecipe,
  findAllRecipes,
  findOneRecipe,
  searchForRecipeIngredient,
  searchForRecipeName,
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

export async function searchRecipeIngredient(ingredient: string) {
  return await searchForRecipeIngredient(ingredient);
}

export async function searchRecipeName(name: string) {
  return await searchForRecipeName(name);
}

export async function createRecipe(recipeBody: RecipePreview) {
  return await createOneRecipe(recipeBody);
}

export async function deleteRecipe(id: number) {
  await deleteOneRecipe(id);
}

export async function updateRecipe(id: number, recipeBody: Recipe) {
  await updateOneRecipe(id, recipeBody);
}
