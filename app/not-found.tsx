export default function NotFound() {
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
						<h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
							Página no encontrada
						</h1>

						<div className='mt-10 flex items-center justify-center gap-x-6'>
							<a
								href='/'
								className='rounded-md bg-purple px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								Volver a inicio
							</a>
							<a href='/' className='text-sm font-semibold text-gray-900'>
								Contactar soporte <span aria-hidden='true'>&rarr;</span>
							</a>
						</div>
					</div>
				</div>
				<div className='bg-cover bg-center' style={{ backgroundImage: `url('/images/linea-login.png')` }}>
				</div>
			</div>
		</main>	
	);
}
