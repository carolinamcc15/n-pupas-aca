import { useRouter } from 'next/router';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import BackButton from 'components/buttons/back-arrow';
import AddBranchForm from 'components/forms/add-branch';
import { PupuseriaApi } from 'services/PupuseriaApi';
import useAuthContext from 'context/AuthContext';
import { adminPages } from 'constants/strings';
import { adminRoutes } from 'routes/routes';
import toast from 'react-hot-toast';

const MapComponent = dynamic(() => import('components/maps/Map'), { ssr: false });

export default function NewBranchPage() {
  const pupuseriaApi = new PupuseriaApi();
  const { token } = useAuthContext();
  const router = useRouter();

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [addressValue, setAddressValue] = useState('');

  const updateSelectedLocation = location => {
    setSelectedLocation(location);
  };

  const updateSelectedAddress = location => {
    setAddressValue(location);
  };

  const onSubmitForm = async data => {
    if (selectedLocation && addressValue) {
      try {
        const created = await pupuseriaApi.createBranch(token, {
          ...data,
          address: addressValue,
          latitude: selectedLocation.lat,
          longitude: selectedLocation.lng,
        });

        if (created) {
          toast.success('Sucursal creada exitosamente');
          router.push(adminRoutes.branches);
        } else {
          toast.error('No se pudo crear la sucursal');
        }
      } catch (e) {
        toast.error('Ocurrió un error interno');
      }
    } else {
      toast.error('No has seleccionado la ubicación');
    }
  };

  return (
    <main className="bg-[url('/waves-bg.svg')] flex-1 bg-no-repeat bg-cover h-full p-6 md:p-12 flex justify-center items-center">
      <Head>
        <title>{adminPages.newBranch}</title>
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
      <section className='grid grid-cols-1 sm:grid-cols-2 w-full max-w-[1000px] bg-white rounded-md shadow-lg'>
        <div className='flex flex-col items-center bg-primary-100 p-4 sm:px-5 sm:py-6 rounded-t-md sm:rounded-l-md gap-4'>
          <div className='flex gap-3'>
            <BackButton linkTo={adminRoutes.branches} colorClass='text-primary-500' />
            <h1 className='font-bold text-xl sm:text-2xl md:text-center md:my-3'>
              {adminPages.newBranch}
            </h1>
          </div>
          <MapComponent
            selectedLocation={selectedLocation}
            addressValue={addressValue}
            setAddressValue={updateSelectedAddress}
            setSelectedLocation={updateSelectedLocation}
          />
        </div>
        <div className='p-6 sm:px-6 sm:pb-10 sm:pt-16 flex flex-col justify-between items-center'>
          <AddBranchForm onSubmitHandler={onSubmitForm} />
        </div>
      </section>
    </main>
  );
}