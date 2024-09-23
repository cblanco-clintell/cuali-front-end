'use client';

import useVerify from '@/hooks/use-verify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/features/user/userSlice';
import { useRetrieveProfileQuery } from '@/redux/features/auth/authApiSlice';

export default function Setup() {
    useVerify();

    const dispatch = useDispatch();
    // const { data: profile, isLoading, isFetching, isError, error } = useRetrieveProfileQuery({});

    // const storedCompanyId = useMemo(() => {
    //     return typeof window !== 'undefined' ? localStorage.getItem('selectedCompanyId') : null;
    // }, []);

    // useEffect(() => {
    //     if (isLoading || isFetching || !profile) {
    //         return;
    //     }

    //     if (profile) {
    //     }
    // }, [profile, isLoading, isFetching, dispatch, storedCompanyId]);

    return <ToastContainer />;
}
