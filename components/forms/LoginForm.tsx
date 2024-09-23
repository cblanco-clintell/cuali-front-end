'use client';
import Link from 'next/link';
import { SocialButtons } from '@/components/common';
import useLogin from '@/hooks/use-login';
import { Form } from '@/components/forms';

export default function LoginForm() {
	const { email, password, isLoading, onChange, onSubmit } = useLogin();

	const config = [
		{
			labelText: 'Correo *',
			labelId: 'email',
			type: 'email',
			value: email,
			required: true,
		},
		{
			labelText: 'Contraseña *',
			labelId: 'password',
			type: 'password',
			value: password,
			link: {
				linkText: 'Olvidé mi contraseña',
				linkUrl: '/password-reset',
			},
			required: true,
		},
	];

	return (
		<>
			<Form
				config={config}
				isLoading={isLoading}
				btnText='Iniciar sesión'
				onChange={onChange}
				onSubmit={onSubmit}
			/>
			{/* <SocialButtons /> */}

			{/* <p className='mt-10 text-center text-sm text-gray-500'>
				Don&apos;t have an account?{' '}
				<Link
					href='/auth/register'
					className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
				>
					Register here
				</Link>
			</p> */}
		</>
		
	);
}
