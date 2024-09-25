import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProjectType } from '@/types/projects';

interface ProjectState {
  projects: ProjectType[];
  selectedProjectId: number | null;
  selectedObjectiveIndex: number | null;
}

const initialState: ProjectState = {
  projects: [],
  selectedProjectId: null,
  selectedObjectiveIndex: null,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects(state, action: PayloadAction<ProjectType[]>) {
      state.projects = action.payload;
    },
    setSelectedProject(state, action: PayloadAction<number>) {
      state.selectedProjectId = action.payload;
      state.selectedObjectiveIndex = null;
    },
    setSelectedObjective(state, action: PayloadAction<number>) {
      state.selectedObjectiveIndex = action.payload;
    },
  },
});

export const { setProjects, setSelectedProject, setSelectedObjective } = projectSlice.actions;
export default projectSlice.reducer;