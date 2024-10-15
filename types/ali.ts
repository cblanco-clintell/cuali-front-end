import { ProjectModel } from "./projects";

export interface AliConversationModel {
  id: number;
  created: string;
  updated: string;
  user: any;
  project: ProjectModel;
  saved: boolean;
  title: string;
  results: AliResultModel[];
}

export interface AliResultModel {
  id: number;
  created: string;
  query: string;
  response: string;
  saved: boolean;
  conversation_embedding: number[] | null;
  studio_ids: number[] | null;
  user: any;
  project: ProjectModel;
  conversation: number | null;
}

export interface AliQueryParams {
  text_generate: string;
  studio_ids: number[];
  conversation_id: number | null;
  project_id: number;
}