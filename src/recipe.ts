export interface Recipe {
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  link: string[];
  metadata: {};
  ingredients: string[];
  steps: {};
}
