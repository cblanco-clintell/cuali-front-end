import { ProjectType } from "./projects";

export interface AliConversationType {
  id: number;
  created: string;
  updated: string;
  user: any;
  project: ProjectType;
  saved: boolean;
  title: string;
  results: AliResultType[];
}

export interface AliResultType {
  id: number;
  created: string;
  query: string;
  response: string;
  saved: boolean;
  conversation_embedding: number[] | null;
  details: {
    studio_ids: number[];
    segment_ids: number[];
    conversation_ids: number[];
    version: number;
  };
  studio_ids: number[] | null;
  user: any;
  project: ProjectType;
  conversation: number | null;
}