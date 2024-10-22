import { StudioModel, StudioProcessStatus } from "./studios";
import { Keyword } from "./keywords";
import { Segment } from "./segments";
import { Objective } from "./objectives";
import { Category } from "./categories";
import { User } from "./user";
import { Question } from "./questions";
import { GrammarData } from "./grammar";

export enum ProjectStatus {
  DRAFT = 'DRAFT',
  VALID = 'VALID',
  DELETED = 'DELETED',
}

export interface ProjectModel {
  id: number;
  created: string;
  name: string;
  status: ProjectStatus;
  user: User | null;
  briefing: string | null;
  objectives: string[] | null;
  state?: StudioProcessStatus | null; 
  stateText?: string; 
  lastPresentationState?: string | null;
  studios: StudioModel[];
  categories: Category[];
  keywords: Keyword[];
  segments: Segment[];
  questions: Question[] | null;
  grammar?: GrammarData[];
}
