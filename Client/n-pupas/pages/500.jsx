import Head from 'next/head';

export default function Custom404() {
  return (
    <main className='min-h-[60vh] flex flex-col justify-center items-center'>
      <Head>
        <title>Error interno</title>
      </Head>
      <h1 className='font-bold text-7xl text-primary-500 animate-bounce'>500</h1>
      <p className='text-lg mt-4'>
        Lo sentimos, ocurrió un <span className='font-bold'>error interno</span> :(
      </p>
      <p className='text-lg mt-2'>Inténtalo más tarde</p>
    </main>
  );
}
