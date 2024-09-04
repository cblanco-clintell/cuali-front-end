import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setAuth, finishInitialLoad, logout, startLoading } from '@/redux/features/auth/authSlice';

export default function useVerify() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Simulate token presence without actually verifying
        const fakeTokenExists = true; // Simulate token existence

        if (fakeTokenExists) {
            dispatch(startLoading());

            setTimeout(() => {
                try {
                    // Simulate successful verification
                    dispatch(setAuth());
                } catch (error) {
                    // Simulate failed verification and logout
                    dispatch(logout());
                } finally {
                    dispatch(finishInitialLoad());
                }
            }, 1000); // Simulate a network delay
        } else {
            dispatch(finishInitialLoad());
        }
    }, [dispatch]);
}