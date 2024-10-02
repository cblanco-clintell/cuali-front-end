import { StudioType } from "./studios";

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

