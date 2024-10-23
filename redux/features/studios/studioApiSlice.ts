import { apiSlice } from '../../services/apiSlice';

const studioApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createStudio: builder.mutation({
      query: ({ projectId, ...studioData }) => ({
        url: `/studios/project/${projectId}/create/`,
        method: 'POST',
        body: studioData,
      }),
    }),

    updateStudio: builder.mutation({
      query: ({ projectId, studioId, ...studioData }) => ({
        url: `/studios/project/${projectId}/${studioId}/update/`,
        method: 'PATCH',
        body: studioData,
      }),
    }),

    uploadStudioDocument: builder.mutation({
      query: ({ studioId, file }) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: `/studios/${studioId}/upload/`,
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useCreateStudioMutation,
  useUpdateStudioMutation,
  useUploadStudioDocumentMutation,
} = studioApiSlice;
