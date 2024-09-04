import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { useLoginMutation } from '@/redux/features/auth/authApiSlice';
import { setAuth, logout, startLoading, finishInitialLoad } from '@/redux/features/auth/authSlice';
import { useRetrieveProfileQuery } from '@/redux/features/auth/authApiSlice';
import { toast } from 'react-toastify';

export default function useLogin() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();
	const { refetch } = useRetrieveProfileQuery({});

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(startLoading());

		login({ email, password })
			.unwrap()
			.then(async (response) => {
				const { access, refresh } = response;
				localStorage.setItem('access', access);
				localStorage.setItem('refresh', refresh);
				dispatch(setAuth());
				await refetch(); // Fetch user data after login
				router.push('/');
			})
			.catch(() => {
				toast.error('Error al iniciar sesión');
				dispatch(logout());
			})
			.finally(() => {
				dispatch(finishInitialLoad());
			});
	};

	return {
		email,
		password,
		isLoading,
		onChange,
		onSubmit,
	};
}
