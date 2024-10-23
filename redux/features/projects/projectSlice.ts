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
  selectedStudioIds: number[];
}

const initialState: ProjectState = {
  projects: [],
  selectedProjectId: null,
  selectedObjectiveIndex: null,
  selectedQuestionIndex: 0,
  selectedStudioIds: [],
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
    updateProjectStudio(state, action: PayloadAction<{ projectId: number; studio: StudioModel }>) {
      const project = state.projects.find(p => p.id === action.payload.projectId);
      console.log("updateProjectStudio", action.payload);
      if (project) {
        const studioIndex = project.studios.findIndex(s => s.id === action.payload.studio.id);
        console.log("studioIndex", studioIndex);
        if (studioIndex !== -1) {
          project.studios[studioIndex] = action.payload.studio;
        }
      }
    },
    addProjectStudio(state, action: PayloadAction<{ projectId: number; studio: StudioModel }>) {
      const project = state.projects.find(p => p.id === action.payload.projectId);
      if (project) {
        project.studios.push(action.payload.studio);
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
    setSelectedStudios(state, action: PayloadAction<number[]>) {
      state.selectedStudioIds = action.payload;
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
  updateProjectStudio,
  setSelectedQuestion,
  updateProjectGrammar,
  setSelectedStudios,
  addProjectStudio,
} = projectSlice.actions;

export default projectSlice.reducer;
