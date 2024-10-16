import { apiSlice } from '../../services/apiSlice';
import {
  updateProjectKeywords,
  updateProjectQuestions,
  updateProjectCategories,
  updateProjectSegments,
  updateProjectStudios,
} from './projectSlice';

const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: `/projects/`,
        method: 'GET',
      }),
    }),
    getProject: builder.query({
      query: (projectId: string) => ({
        url: `/projects/${projectId}/`,
        method: 'GET',
      }),
    }),
    getProjectKeywords: builder.query({
      query: (projectId: string) => ({
        url: `/projects/${projectId}/keywords/`,
        method: 'GET',
      }),
      async onQueryStarted(projectId, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateProjectKeywords({ projectId: Number(projectId), keywords: data }));
        } catch {
          // Handle error
        }
      },
    }),
    getProjectQuestions: builder.query({
      query: (projectId: string) => ({
        url: `/projects/${projectId}/questions/`,
        method: 'GET',
      }),
      async onQueryStarted(projectId, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateProjectQuestions({ projectId: Number(projectId), questions: data.questions }));
        } catch {
          // Handle error
        }
      },
    }),
    getProjectCategories: builder.query({
      query: (projectId: string) => ({
        url: `/projects/${projectId}/categories/`,
        method: 'GET',
      }),
      async onQueryStarted(projectId, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateProjectCategories({ projectId: Number(projectId), categories: data }));
        } catch {
          // Handle error
        }
      },
    }),
    getProjectSegments: builder.query({
      query: (projectId: string) => ({
        url: `/projects/${projectId}/segments/`,
        method: 'GET',
      }),
      async onQueryStarted(projectId, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateProjectSegments({ projectId: Number(projectId), segments: data }));
        } catch {
          // Handle error
        }
      },
    }),
    getProjectStudios: builder.query({
      query: (projectId: string) => ({
        url: `/projects/${projectId}/studios/`,
        method: 'GET',
      }),
      async onQueryStarted(projectId, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateProjectStudios({ projectId: Number(projectId), studios: data }));
        } catch {
          // Handle error
        }
      },
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useLazyGetProjectKeywordsQuery,
  useLazyGetProjectQuestionsQuery,
  useLazyGetProjectCategoriesQuery,
  useLazyGetProjectSegmentsQuery,
  useLazyGetProjectStudiosQuery,
} = projectApiSlice;
