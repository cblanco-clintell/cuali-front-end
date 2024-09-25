import { apiSlice } from '../../services/apiSlice';

const aliApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProjectConversations: builder.query({
      query: (projectId) => `ali/conversations/${projectId}/`,
    }),

    fetchConversationResults: builder.query({
      query: (conversationId) => `ali/conversations/${conversationId}/results/`,
    }),
  }),
});

export const {
  useFetchProjectConversationsQuery,
  useFetchConversationResultsQuery,
} = aliApiSlice;