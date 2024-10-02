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
  studio_ids: number[] | null;
  user: any;
  project: ProjectType;
  conversation: number | null;
}

export interface AliQueryParams {
  text_generate: string;
  studio_ids: number[];
  conversation_id: number | null;
  project_id: number;
}