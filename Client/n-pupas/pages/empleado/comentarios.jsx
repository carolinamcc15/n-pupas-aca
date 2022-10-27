import { PupuseriaApi } from 'services/PupuseriaApi';
import CommentCard from 'components/cards/comment';
import { employeePages } from 'constants/strings';
import { tokenCookie } from 'constants/data';
import { getCookie } from 'cookies-next';
import Head from 'next/head';

const pupuseriaApi = new PupuseriaApi();

const CommentsPage = ({ reports }) => {
  return (
    <main className='p-6 flex flex-col gap-5'>
      <Head>
        <title>{employeePages.comments}</title>
      </Head>
      <h1 className='font-bold text-2xl sm:text-3xl'>{employeePages.comments}</h1>
      <section className='flex flex-col gap-5 md:grid md:grid-cols-2'>
        {reports.length > 0 ? (
          reports.map(comment => {
            return <CommentCard comment={comment} key={comment.id} />;
          })
        ) : (
          <p>No has recibido ningún reporte aún</p>
        )}
      </section>
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
