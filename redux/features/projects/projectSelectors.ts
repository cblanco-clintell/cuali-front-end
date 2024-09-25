import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

// Basic selectors
export const selectProjects = (state: RootState) => state.projects.projects;
export const selectSelectedProjectId = (state: RootState) => state.projects.selectedProjectId;
export const selectSelectedObjectiveIndex = (state: RootState) => state.projects.selectedObjectiveIndex;

// Memoized selector to get the selected project
export const selectSelectedProject = createSelector(
  [selectProjects, selectSelectedProjectId],
  (projects, selectedProjectId) => {
    return projects.find(project => project.id === selectedProjectId) || null;
  }
);

// Memoized selector to get the selected objective of the selected project
export const selectSelectedObjective = createSelector(
  [selectSelectedProject, selectSelectedObjectiveIndex],
  (selectedProject, selectedObjectiveIndex) => {
    if (selectedProject && selectedObjectiveIndex !== null && selectedProject.objectives) {
      return selectedProject.objectives[selectedObjectiveIndex] || null;
    }
    return null;
  }
);