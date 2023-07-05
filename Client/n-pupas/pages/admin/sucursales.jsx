import 'react-confirm-alert/src/react-confirm-alert.css';
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { CustomModal } from 'components/layout/modal/custom-modal';
import PageHeading from 'components/information/page-heading';
import { PupuseriaApi } from 'services/PupuseriaApi';
import { confirmAlert } from 'react-confirm-alert';
import useAuthContext from 'context/AuthContext';
import BranchCard from 'components/cards/branch';
import { adminPages } from 'constants/strings';
import { tokenCookie } from 'constants/data';
import { adminRoutes } from 'routes/routes';
const MultipleLocationsMap = dynamic(() => import('components/maps/MultipleMarkersMap'), {
  ssr: false,
});

const pupuseriaApi = new PupuseriaApi();

const BranchesPage = ({ allBranches, competenceBranches }) => {
  const [branches, setBranches] = useState(allBranches);

  const [deleteToggle, setDeleteToggle] = useState(false);
  const { token } = useAuthContext();

  useEffect(() => {
    const getAllBranches = async () => {
      const branches = await pupuseriaApi.getAllBranches(token);
      setBranches(branches);
    };
    getAllBranches();
  }, [deleteToggle]);

  const deleteBranch = async id => {
    try {
      const deleted = await pupuseriaApi.deleteBranch(token, id);
      if (deleted) {
        setDeleteToggle(!deleteToggle);
        toast.success('Sucursal eliminada');
      } else {
        toast.error('No se pudo eliminar la sucursal');
      }
    } catch (e) {
      toast.error('Ocurrió un error interno');
    }
  };

  const onDeleteHandler = (id, branchName) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CustomModal
            onClose={onClose}
            onConfirm={() => deleteBranch(id)}
            text={`¿Segura/o que quieres eliminar la sucursal "${branchName}"?`}
          />
        );
      },
    });
  };

  return (
    <main className='p-6 sm:px-10 flex flex-col gap-5'>
      <Head>
        <title>{adminPages.branches}</title>
        <link
          rel='stylesheet'
          href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
          integrity='sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
          crossorigin=''
        />
        <script
          src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
          integrity='sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
          crossorigin=''
        ></script>
      </Head>
      <PageHeading
        title={adminPages.branches}
        route={adminRoutes.newBranch}
        text='Agregar sucursal'
      />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
        <div className='md:col-span-2'>
          <div className='flex gap-5 mb-4'>
            <div className='flex gap-2'>
              <img
                className='w-3'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/1334px-Map_marker.svg.png'
                alt='blue marker icon - my branches'
              />
              <p className='text-[#09b4f2] text-sm' font-bold>
                Mis sucursales
              </p>
            </div>
            <div className='flex gap-2 '>
              <img
                className='w-3'
                src='https://static-00.iconduck.com/assets.00/map-marker-icon-342x512-gd1hf1rz.png'
                alt='red marker icon - competence'
              />
              <p className='text-red-500 text-sm' font-bold>
                Competencia
              </p>
            </div>
          </div>
          <MultipleLocationsMap branches={branches} competenceBranches={competenceBranches} />
        </div>
        <div className='gap-4 grid grid-cols-1 md:h-[500px] overflow-y-auto'>
          {branches.length > 0 &&
            branches
              .sort((a, b) => {
                return (b.open ? 1 : 0) - (a.open ? 1 : 0);
              })
              .map(branch => {
                return (
                  <BranchCard
                    branch={branch}
                    key={branch.id}
                    onDeleteHandler={() => onDeleteHandler(branch.id, branch.name)}
                  />
                );
              })}
        </div>
      </div>
    </main>
  );
};

export default BranchesPage;

export async function getServerSideProps({ req, res }) {
  const token = getCookie(tokenCookie, { req, res });

  try {
    const allBranches = await pupuseriaApi.getAllBranches(token);
    const competenceBranches = await pupuseriaApi.getCompetenceBranches(token);
    return {
      props: {
        allBranches: allBranches,
        competenceBranches,
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