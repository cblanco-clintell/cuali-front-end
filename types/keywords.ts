export interface Keyword {
  keyword: string;
  emotion: string;
  sentiment: number;
  valence: 'positive' | 'negative' | 'neutral';
  categories_ids: number[];
  segments_ids: number[];
  question_ids: number[];
}
