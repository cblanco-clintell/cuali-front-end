import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProjectModel } from '@/types/projects';
import { Keyword } from '@/types/keywords';
import { Category } from '@/types/categories';
import { Segment } from '@/types/segments';
import { Question } from '@/types/questions';
import { StudioModel } from '@/types/studios';
import { GrammarData } from '@/types/grammar';

interface ProjectState {
  projects: ProjectModel[];
  selectedProjectId: number | null;
  selectedObjectiveIndex: number | null;
  selectedQuestionIndex: number | null;
}

const initialState: ProjectState = {
  projects: [],
  selectedProjectId: null,
  selectedObjectiveIndex: null,
  selectedQuestionIndex: 0,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects(state, action: PayloadAction<ProjectModel[]>) {
      state.projects = action.payload;
    },
    setSelectedProject(state, action: PayloadAction<number>) {
      state.selectedProjectId = action.payload;
      state.selectedObjectiveIndex = null;
    },
    setSelectedObjective(state, action: PayloadAction<number>) {
      state.selectedObjectiveIndex = action.payload;
    },
    updateProjectKeywords(state, action: PayloadAction<{ projectId: number; keywords: Keyword[] }>) {
      const project = state.projects.find(p => p.id === action.payload.projectId);
      if (project) {
        project.keywords = action.payload.keywords;
      }
    },
    updateProjectQuestions(state, action: PayloadAction<{ projectId: number; questions: Question[] }>) {
      const project = state.projects.find(p => p.id === action.payload.projectId);
      if (project) {
        project.questions = action.payload.questions;
      }
    },
    updateProjectCategories(state, action: PayloadAction<{ projectId: number; categories: Category[] }>) {
      const project = state.projects.find(p => p.id === action.payload.projectId);
      if (project) {
        project.categories = action.payload.categories;
      }
    },
    updateProjectSegments(state, action: PayloadAction<{ projectId: number; segments: Segment[] }>) {
      const project = state.projects.find(p => p.id === action.payload.projectId);
      if (project) {
        project.segments = action.payload.segments;
      }
    },
    updateProjectStudios(state, action: PayloadAction<{ projectId: number; studios: StudioModel[] }>) {
      const project = state.projects.find(p => p.id === action.payload.projectId);
      if (project) {
        project.studios = action.payload.studios;
      }
    },
    setSelectedQuestion(state, action: PayloadAction<number>) {
      state.selectedQuestionIndex = action.payload;
    },
    updateProjectGrammar(state, action: PayloadAction<{ projectId: number; grammar: GrammarData }>) {
      const project = state.projects.find(p => p.id === action.payload.projectId);
      if (project) {
        project.grammar = action.payload.grammar;
      }
    },
  },
});

export const {
  setProjects,
  setSelectedProject,
  setSelectedObjective,
  updateProjectKeywords,
  updateProjectQuestions,
  updateProjectCategories,
  updateProjectSegments,
  updateProjectStudios,
  setSelectedQuestion,
  updateProjectGrammar,
} = projectSlice.actions;

export default projectSlice.reducer;
