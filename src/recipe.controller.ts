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

import { Recipe } from "./recipe";
import {
  getRecipe,
  getAllRecipe,
  createRecipe,
  deleteRecipe,
  searchRecipe,
  updateRecipe,
} from "./recipeService";

import * as yup from "yup";

let recipeSchema = yup.object().shape({
  id: yup.number().required().positive().integer(),
  name: yup.string().required(),
  thumbnail: yup.string().required(),
  description: yup.string().required(),
  link: yup.array().required().of(yup.string().required()),
  metadata: yup.object().required().shape({
    lastViewed: yup.string().required(),
    created: yup.string().required(),
    timeToCook: yup.string().required(),
  }),
  ingredients: yup.array().required().of(yup.string().required()),
  steps: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          step: yup.number().positive().integer().required(),
          directions: yup.string().required(),
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

  @Get("search/{ingredient}")
  public async searchRec(@Path() ingredient: string) {
    return searchRecipe(ingredient);
  }

  @SuccessResponse("201", "Created")
  @Post()
  public async createRec(@Body() requestBody: Recipe) {
    try {
      await recipeSchema.validate(requestBody);
    } catch (error) {
      this.setStatus(422);
      return { message: error.message };
    }
    return createRecipe(requestBody);
  }

  @SuccessResponse("202", "Deleted")
  @Delete("{recipeId}")
  public async deleteRec(@Path() recipeId: number): Promise<{ message: any }> {
    return deleteRecipe(recipeId);
  }

  @SuccessResponse("200", "Edited")
  @Put("{recipeId}")
  public async updateRec(
    @Path() recipeId: number,
    @Body() requestBody: Recipe
  ) {
    try {
      await recipeSchema.validate(requestBody);
    } catch (error) {
      this.setStatus(422);
      return { message: error.message };
    }
    return updateRecipe(recipeId, requestBody);
  }
}
