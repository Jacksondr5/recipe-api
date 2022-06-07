import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";

import { Recipe } from "./recipe";
import { RecipeService } from "./recipeService";

@Route("recipe")
export class RecipeController extends Controller {
  @Get("{recipeId}")
  public async getRecipe(@Path() recipeId: number): Promise<Recipe> {
    return new RecipeService().get(recipeId);
  }
}
