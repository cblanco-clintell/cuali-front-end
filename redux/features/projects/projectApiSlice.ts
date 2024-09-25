import { apiSlice } from '../../services/apiSlice';

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
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
} = projectApiSlice;