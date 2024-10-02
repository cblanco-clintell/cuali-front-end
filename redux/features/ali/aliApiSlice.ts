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

    sendAliQuery: builder.mutation({
      query: ({ textGenerate, studioIds, conversationId = null }) => ({
        url: 'ali/conversations/generate_response/',
        method: 'POST',
        body: {
          text_generate: textGenerate,
          studio_ids: JSON.stringify(studioIds),
          conversation_id: conversationId,
        },
      }),
    }),
    createAliQueryAnswer: builder.mutation({
      query: ({ text_generate, studio_ids, conversation_id, project_id }) => ({
        url: 'conversations/generate_response/',
        method: 'POST',
        body: {
          text_generate,
          studio_ids: JSON.stringify(studio_ids),
          conversation_id,
          project_id
        },
      }),
    }),
  }),
});

export const {
  useFetchProjectConversationsQuery,
  useFetchConversationResultsQuery,
  useUpdateConversationMutation,
  useSendAliQueryMutation,
} = aliApiSlice;