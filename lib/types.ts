export type Lang = "no" | "en";
export type Category = "classic" | "nerdy" | "cheeky" | "spicy";

export type Compliment = {
  id: string;           // unik per språk, f.eks. "no-01" / "en-01"
  key?: string;         // felles nøkkel tvers av språk (valgfritt), f.eks. "001"
  text: string;
  lang: Lang;
  categories: Category[];
  // legacy-felt – behold i JSON hvis de finnes, men vi bruker dem ikke:
  tone?: 0 | 1 | 2 | 3 | 4;
  risk?: 0 | 1 | 2;
};
