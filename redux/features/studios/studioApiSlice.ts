import { apiSlice } from '../../services/apiSlice';
import { updateProjectStudio } from '@/redux/features/projects/projectSlice';

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
      query: ({ projectId, studioId, file }) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: `/studios/project/${projectId}/${studioId}/upload/`,
          method: 'POST',
          body: formData,
        };
      },
      async onQueryStarted({ projectId, studioId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Data uploaded", data);

          dispatch(updateProjectStudio({ projectId: Number(projectId), studio: data.studio }));
        } catch (error) {
          console.error('Failed to upload document:', error);
        }
      },
    }),
  }),
});

export const {
  useCreateStudioMutation,
  useUpdateStudioMutation,
  useUploadStudioDocumentMutation,
} = studioApiSlice;
