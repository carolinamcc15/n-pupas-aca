import Head from 'next/head';

export default function Custom404() {
  return (
    <main className='min-h-[60vh] flex flex-col justify-center items-center'>
      <Head>
        <title>Not found</title>
      </Head>
      <h1 className='font-bold text-7xl text-primary-500 animate-bounce'>404</h1>
      <p className='text-lg mt-4'>Lo sentimos, la página que quieres visitar no existe</p>
    </main>
  );
}
