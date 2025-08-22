export type Tone = 0 | 1 | 2 | 3;      // 0 søt → 3 cheeky (PG-13)
export type Lang = "no" | "en";

export type Compliment = {
  id: string;
  text: string;
  lang: Lang;
  tone: Tone;
  categories?: string[];
  risk?: 0 | 1 | 2;
};
