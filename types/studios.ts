import { ProjectType } from "./projects";

export interface StudioType {
  id: number;
  created: string;
  project: ProjectType;
  name: string;
  status: string;
  date: string | null;
  location: string | null;
  language: string;
  summary: string | null;
  summary_trans: string | null;
}
