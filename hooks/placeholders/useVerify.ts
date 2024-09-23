// useVerify.ts
import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setAuth, finishInitialLoad, logout, startLoading } from '@/redux/features/auth/authSlice';
import { useVerifyMutation, useRefreshMutation } from '@/redux/features/auth/authApiSlice';

export default function useVerify() {
    const dispatch = useAppDispatch();
    const [verify] = useVerifyMutation();
    const [refresh] = useRefreshMutation();

    useEffect(() => {
        const refreshToken = localStorage.getItem('refresh'); 
        const accessToken = localStorage.getItem('access');

        if (refreshToken) {
            dispatch(startLoading());

            const verifyToken = async () => {
                try {
                    await verify({ token: accessToken }).unwrap();
                    dispatch(setAuth());
                } catch (error) {
                    // console.log('Token verification failed. Refreshing token:', refreshToken);

                    try {
                        const response = await refresh({ refresh: refreshToken }).unwrap();
                        localStorage.setItem('access', response.access);
                        dispatch(setAuth());
                    } catch (refreshError) {
                        dispatch(logout());
                    }
                } finally {
                    dispatch(finishInitialLoad());
                }
            };

            verifyToken();
        } else {
            dispatch(finishInitialLoad());
        }
    }, [dispatch, verify, refresh]);
}
