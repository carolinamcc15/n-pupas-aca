import { PupuseriaApi } from 'services/PupuseriaApi';
import CommentCard from 'components/cards/comment';
import { employeePages } from 'constants/strings';
import { tokenCookie } from 'constants/data';
import { getCookie } from 'cookies-next';
import Head from 'next/head';

const pupuseriaApi = new PupuseriaApi();

const CommentsPage = ({ reports }) => {
  return (
    <main className='p-6 flex-grow flex flex-col gap-5'>
      <Head>
        <title>{employeePages.comments}</title>
      </Head>
      <h1 className='font-bold text-2xl sm:text-3xl md:my-3'>{employeePages.comments}</h1>
      <div className='flex-grow grid grid-cols-1 sm:grid-cols-2'>
        <section className='w-full max-w-[1300px] rounded-md shadow-lg flex flex-col gap-4 bg-light-blue p-4 py-6 sm:px-5 sm:py-10'>
          {reports.length > 0 ? (
            reports.map(comment => {
              return <CommentCard comment={comment} key={comment.id} />;
            })
          ) : (
            <p>No has recibido ningún reporte aún</p>
          )}
        </section>
        <img src='/onReports.png' alt='Empleado' className='w-28 sm:w-96 place-self-center object-center' />
      </div>
    </main>
  );
};

export default CommentsPage;

export async function getServerSideProps({ req, res }) {
  const token = getCookie(tokenCookie, { req, res });

  try {
    const employee = await pupuseriaApi.getEmployeeInfo(token);

    return {
      props: {
        reports: employee.reports,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: '/500',
      },
    };
  }
}
