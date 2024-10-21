import { apiSlice } from '../../services/apiSlice';

const studioApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createStudio: builder.mutation({
      query: ({ projectId, ...studioData }) => ({
        url: `/studio/project/${projectId}/create/`,
        method: 'POST',
        body: studioData,
      }),
    }),

    updateStudio: builder.mutation({
      query: ({ projectId, studioId, ...studioData }) => ({
        url: `/studio/project/${projectId}/${studioId}/update/`,
        method: 'PATCH',
        body: studioData,
      }),
    }),
  }),
});

export const {
  useCreateStudioMutation,
  useUpdateStudioMutation,
} = studioApiSlice;