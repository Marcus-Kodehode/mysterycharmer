export type Lang = "no" | "en";
export type Category = "classic" | "nerdy" | "cheeky" | "spicy";

export type Compliment = {
  key: string;
  text: string;
  categories: Category[];
};
