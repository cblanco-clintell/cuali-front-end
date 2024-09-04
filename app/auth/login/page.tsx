import Link from 'next/link';
import { LoginForm } from '@/components/forms';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Cuali | Login',
	description: 'Cuali login page',
};

export default function Page() {
	return (
		<main className="flex flex-col flex-grow">
			<div className="grid grid-cols-1 sm:grid-cols-2 h-screen flex-grow">
				<div className="flex justify-center items-center">
					<div className="min-w-[50%] xl:min-w-[40%] mx-auto">
						<img
							className="mx-auto h-20 w-[20rem]"
							src="/logo.svg"
							alt="Cuali"
						/>
						<h2 className="mt-10 text-center text-lg leading-9 tracking-tight text-gray-500">
							Sign in
						</h2>

						<LoginForm />
					</div>
				</div>
				<div
					className="bg-cover bg-center"
					style={{ backgroundImage: `url('/images/linea-login.png')` }}
				></div>
			</div>
		</main>
	);
}