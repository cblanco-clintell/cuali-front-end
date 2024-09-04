import { PasswordResetConfirmForm } from '@/components/forms';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Cuali - Confirmar contraseña',
	description: 'Confirma tu contraseña en Cuali',
};

interface Props {
	params: {
		uid: string;
		token: string;
	};
}

export default function Page({ params: { uid, token } }: Props) {
	return (
		<main className="flex flex-col flex-grow">
			<div className='grid grid-cols-1 sm:grid-cols-2 h-screen flex-grow'>
				<div className='flex justify-center items-center'>
					<div className='min-w-[50%] xl:min-w-[40%] mx-auto'>
						<img
							className='mx-auto h-20 w-[20rem]'
							src='/logo.svg'
							alt='Cuali'
						/>
						<h2 className='mt-10 text-center text-lg leading-9 tracking-tight text-gray-500'>
							Reinicia tu contraseña
						</h2>

						<PasswordResetConfirmForm uid={uid} token={token} />
					</div>
				</div>
				<div className='bg-cover bg-center' style={{ backgroundImage: `url('/images/linea-login.png')` }}>
				</div>
			</div>
		</main>	
	);
}
