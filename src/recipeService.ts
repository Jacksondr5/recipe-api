import { Recipe } from "./recipe";

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

export class RecipeService {
  public get(id: number): Recipe {
    return {
      id,
      name: "chikin",
      thumbnail: "path/to/stuff",
      description: "stuff",
      link: ["this", "that"],
      metadata: {
        lastViewed: "5/3/2003",
        created: "3/3/2003",
        timeToCook: "34 min",
      },
      ingredients: ["garlic", "onions", "olive oil"],
      steps: {
        step1: "grill 'em",
        step2: "don't be a scrub",
      },
    };
  }
}
