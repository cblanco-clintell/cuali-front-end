import { apiSlice } from '../../services/apiSlice';

const aliApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch conversations, and provide a tag for cache invalidation
    fetchProjectConversations: builder.query({
      query: (projectId) => `ali/conversations/project/${projectId}/`,
    }),

    // Fetch results, tag them as well if needed
    fetchConversationResults: builder.query({
      query: (conversationId) => `ali/conversations/${conversationId}/results/`,
    }),

    // Update conversation, invalidate the corresponding tag after update
    updateConversation: builder.mutation({
      query: ({ conversationId, data }) => ({
        url: `ali/conversations/${conversationId}/`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const {
  useFetchProjectConversationsQuery,
  useFetchConversationResultsQuery,
  useUpdateConversationMutation,
} = aliApiSlice;