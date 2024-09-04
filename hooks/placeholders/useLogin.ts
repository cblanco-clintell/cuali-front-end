import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setAuth, logout, startLoading, finishInitialLoad } from '@/redux/features/auth/authSlice';
import { toast } from 'react-toastify';

export default function useLogin() {
	const router = useRouter();
	const dispatch = useAppDispatch();

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

		// Simulate a login that works with any email and password
		setTimeout(() => {
			if (email && password) {
				dispatch(setAuth()); // Update the auth state
				toast.success('Login successful');
				router.push('/'); // Redirect to homepage or dashboard
			} else {
				toast.error('Email and password are required');
				dispatch(logout()); // Clear any existing auth state
			}

			dispatch(finishInitialLoad());
		}, 1000); // Simulate a network request delay
	};

	return {
		email,
		password,
		isLoading: false, // No real loading state needed for fake login
		onChange,
		onSubmit,
	};
}