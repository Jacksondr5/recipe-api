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
import * as yup from "yup";

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

let recipeSchema = yup.object().shape({
  id: yup.number().positive().integer(),
  name: yup.string().required(),
  thumbnail: yup.object().required().shape({
    image: yup.string(),
  }),
  description: yup.string().required(),
  link: yup.array().of(yup.string().required()),
  metadata: yup.object().required().shape({
    lastViewed: yup.string().required(),
    created: yup.string().required(),
    timeToCook: yup.string().required(),
  }),
  ingredients: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          ingredient: yup.string().required(),
          starred: yup.boolean().required(),
        })
        .required()
    )
    .required(),
  steps: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          step: yup.number().positive().integer().required(),
          directions: yup.string().required(),
          image: yup.string(),
        })
        .required()
    )
    .required(),
});

export async function getRecipe(id: number) {
  const data = await findOneRecipe(id);
  if (!data) {
    throw new Error("This ID does not exist");
  }
  return data;
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
  await recipeSchema.validate(recipeBody);
  return await createOneRecipe(recipeBody);
}

export async function deleteRecipe(id: number) {
  await getRecipe(id);
  await deleteOneRecipe(id);
}

export async function updateRecipe(id: number, recipeBody: Recipe) {
  await recipeSchema.validate(recipeBody);
  await getRecipe(id);
  await updateOneRecipe(id, recipeBody);
}
