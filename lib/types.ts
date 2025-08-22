export type Tone = 0 | 1 | 2 | 3 | 4; // 4 = Spicy (18+)
export type Lang = "no" | "en";

export type Compliment = {
  id: string;
  text: string;
  lang: Lang;
  tone: Tone;
  categories?: string[];
  risk?: 0 | 1 | 2;
};
