export interface ProjectType {
  id: number;
  created: string;
  name: string;
  status: string;
  user: { id: number; username: string };
  briefing: string | null;
  objectives: string[] | null;
  studios: StudioType[];
}

export interface StudioType {
  id: number;
  created: string;
  project: number;
  name: string;
  status: string;
  date: string | null;
  location: string | null;
  language: string;
  summary: string | null;
  summary_trans: string | null;
}
