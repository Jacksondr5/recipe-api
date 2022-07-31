import {
  updateRecipe,
  createRecipe,
  deleteRecipe,
  getRecipe,
} from "../../src/recipeService";
import { findOneRecipe } from "../../src/recipe.data";
import { Recipe } from "../../src/recipe";
import { emptyRecipe } from "../mocks/emptyRecipe";
jest.mock("../../src/recipe.data.ts");

let testRecipe: Recipe = { ...emptyRecipe };

describe("recipe service", () => {
  beforeEach(() => {
    testRecipe = { ...emptyRecipe };
    (findOneRecipe as jest.Mock).mockResolvedValue(testRecipe);
  });

  describe("post one recipe", () => {
    it.todo("should add a new recipe");
    it.todo("should throw an error if recipe is invalid");
  });
  describe("put one recipe", () => {
    it.todo("should update a recipe");
    it.todo("should throw an error if id doesn't exist");
    it.todo("should throw an error if recipe is invalid");
  });
  describe("delete one recipe", () => {
    it.todo("should delete a recipe");
    it.todo("should throw an error if id does not exist");
    it.todo("should throw an error if recipe is invalid");
  });
  describe("get one recipe", () => {
    it("should get one recipe", async () => {
      //Assemble
      const id = 0;
      //Act
      const actual = await getRecipe(id);
      //Assert
      expect(actual).toBe(testRecipe);
    });
    it("should throw an error if id doesn't exist", () => {
      //Assemble
      const id = 0;
      (findOneRecipe as jest.Mock).mockResolvedValueOnce(null);
      //Act & Assert
      return expect(() => getRecipe(id)).rejects.toThrow(
        "This ID does not exist"
      );
    });
  });
});
