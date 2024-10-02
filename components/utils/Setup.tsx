'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useVerify from '@/hooks/use-verify';
import { setUser } from '@/redux/features/user/userSlice';
import { setProjects } from '@/redux/features/projects/projectSlice';
import { useRetrieveProfileQuery } from '@/redux/features/auth/authApiSlice';
import { useGetProjectsQuery } from '@/redux/features/projects/projectApiSlice';

export default function Setup() {
    useVerify(); // Assuming this is a hook for user/session verification

    const dispatch = useDispatch();

    // Fetch user profile
    // const { data: profile, isLoading: profileIsLoading, isFetching: profileIsFetching } = useRetrieveProfileQuery({});

    // Fetch all projects
    const { data: projects, isLoading: projectsIsLoading, isFetching: projectsIsFetching } = useGetProjectsQuery({});

    // Effect to dispatch user profile data to Redux store
    // useEffect(() => {
    //     if (!profileIsLoading && !profileIsFetching && profile) {
    //         dispatch(setUser(profile)); // Dispatch user data to Redux
    //     }
    // }, [profile, profileIsLoading, profileIsFetching, dispatch]);

    // Effect to dispatch projects data to Redux store
    useEffect(() => {
        if (!projectsIsLoading && !projectsIsFetching && projects) {
            dispatch(setProjects(projects)); // Dispatch projects data to Redux store
        }
    }, [projects, projectsIsLoading, projectsIsFetching, dispatch]);

    return <ToastContainer
    position="bottom-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={true}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    progressClassName="bg-violet-500"
/>;
}