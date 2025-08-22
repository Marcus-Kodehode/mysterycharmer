export type Lang = "no" | "en" | "es" | "sw";
export type Category = "classic" | "nerdy" | "cheeky" | "spicy";

export type Compliment = {
  key: string;
  text: string;
  categories: Category[];
};
