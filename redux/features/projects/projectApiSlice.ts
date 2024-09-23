import { apiSlice } from '../../services/apiSlice';

const projectApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => ({
                    url: `/projects/`,
                    method: 'GET',
            }),
        }),
    }),
});

export const {
    useGetProjectsQuery,
} = projectApiSlice;
