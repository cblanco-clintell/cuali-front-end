import { StudioDocumentModel } from "./studios";

type Speaker = 
  | 'SPEAKER_01' | 'SPEAKER_02' | 'SPEAKER_03' | 'SPEAKER_04' | 'SPEAKER_05'
  | 'SPEAKER_06' | 'SPEAKER_07' | 'SPEAKER_08' | 'SPEAKER_09' | 'SPEAKER_10'
  | string;

export interface Segment {
  id: number;
  created: string;
  studio_document: number | null;
  speaker: Speaker;
  speakerGender: string | null;
  speakerSalary: number | null;
  speakerAge: number | null;
  start: number;
  end: number;
  transcription: string;
  translation: string | null;
}
