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
    return updateRecipe(recipeId, requestBody);
  }
}
