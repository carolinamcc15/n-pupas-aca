import { AuthContextProvider } from 'context/AuthContext';
import { BranchContextProvider } from 'context/BranchContext';
import { RouteGuard } from 'components/guards/RouteGuard';
import Layout from 'components/layout/layout';
import { loginRoute } from 'routes/routes';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AuthContextProvider>
      <BranchContextProvider>
        {router.pathname === loginRoute ? (
          <Component {...pageProps} />
        ) : (
          <RouteGuard>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RouteGuard>
        )}
        <Toaster
          position='top-center'
          reverseOrder={false}
          containerClassName='toast-container font-bold'
          toastOptions={{
            style: {
              padding: '14px',
              background: 'rgba(0, 0, 0, 0.7)',
              color: '#fff',
            },
          }}
        />
      </BranchContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
