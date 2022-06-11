export interface Recipe {
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  link: string[];
  metadata: Metadata;
  ingredients: string[];
  steps: Steps[];
}

export interface Metadata {
  lastViewed: string;
  created: string;
  timeToCook: string;
}

export interface Steps {
  step: number;
  directions: string;
}
