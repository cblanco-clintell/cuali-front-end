import { NextRouter, useRouter } from 'next/router';
import { useAppDispatch } from '@/redux/hooks';
import { logout as setLogout} from '@/redux/features/auth/authSlice';
import { useLogoutMutation } from '@/redux/features/auth/authApiSlice';

export default function useLogout(router: string[] | NextRouter) {
    const dispatch = useAppDispatch();
    const [logout] = useLogoutMutation();

    const handleLogout = () => {
        logout(undefined)
            .unwrap()
            .then(() => {
                dispatch(setLogout());
            });
        router.push('/login');
    };

    return handleLogout;
}