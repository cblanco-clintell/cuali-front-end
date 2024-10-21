export interface GrammarToken {
  token: string;
  translation: string;
  count: number;
}

export interface GrammarCategory {
  verb: GrammarToken[];
  noun: GrammarToken[];
  adj: GrammarToken[];
  other: GrammarToken[];
  
}

export interface GrammarData {
  studio_document: number;
  categories: GrammarCategory;
}
