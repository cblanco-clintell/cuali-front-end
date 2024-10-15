import { ProjectModel } from "./projects";
import { KeywordsModel, CategoriesModel } from "./keywords";
import { QuestionsModel } from "./questions";
import { SegmentsModel } from "./segments";

export enum StudioProcessStatus {
  PROCESSED = 'PROCESSED',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING = 'PENDING',
  ERROR = 'ERROR',
  // Add other statuses as per the enumeration in your Django project
}

export enum StudioStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
  // Add other statuses as per the enumeration in your Django project
}


export interface StudioModel {
  id: number;
  created: string;  // DateTime string
  project: ProjectModel | null;
  name: string;
  status: StudioStatus;
  date: string | null;  // Date string
  location: string | null;
  language: string | null;
  state?: StudioProcessStatus | null;  // Property
  stateText?: string;  // Property
  studio_documents: StudioDocumentModel[];
}

export interface StudioDocumentModel {
  id: number;
  created: string;  // DateTime string
  studio: StudioModel | null;
  name: string;
  type: string;
  status: StudioStatus;
  process: StudioProcessStatus;
  filepath: string;
  summary: string | null;
  summaryTrans: string | null;
  keywords: KeywordsModel[];
  questions: QuestionsModel[];
  segments: SegmentsModel[];
  categories: CategoriesModel[];
}

