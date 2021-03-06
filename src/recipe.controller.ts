import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";

import { Recipe, RecipePreview } from "./recipe";
import {
  getRecipe,
  getAllRecipe,
  createRecipe,
  deleteRecipe,
  searchRecipeIngredient,
  updateRecipe,
  searchRecipeName,
} from "./recipeService";

import * as yup from "yup";

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

@Route("recipe")
export class RecipeController extends Controller {
  @Get()
  public async getAllRec() {
    return getAllRecipe();
  }

  @Get("{recipeId}")
  public async getRec(@Path() recipeId: number) {
    return getRecipe(recipeId);
  }

  @Get("search/ingredient/{ingredient}")
  public async searchRecIngred(@Path() ingredient: string) {
    return searchRecipeIngredient(ingredient);
  }
  @Get("search/name/{name}")
  public async searchRecName(@Path() name: string) {
    return searchRecipeName(name);
  }

  @SuccessResponse("201", "Created")
  @Post()
  public async createRec(@Body() requestBody: RecipePreview) {
    await recipeSchema.validate(requestBody);

    return createRecipe(requestBody);
  }

  @SuccessResponse("202", "Deleted")
  @Delete("{recipeId}")
  public async deleteRec(@Path() recipeId: number) {
    return deleteRecipe(recipeId);
  }

  @SuccessResponse("200", "Edited")
  @Put("{recipeId}")
  public async updateRec(
    @Path() recipeId: number,
    @Body() requestBody: Recipe
  ) {
    await recipeSchema.validate(requestBody);

    return updateRecipe(recipeId, requestBody);
  }
}
