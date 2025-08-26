export type Lang = "no" | "en" | "es" | "sw" | "zh";
export type Category = "classic" | "nerdy" | "cheeky" | "spicy";

export type Compliment = {
  key: string;
  text: string;
  categories: Category[];
};
