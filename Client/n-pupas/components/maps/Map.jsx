import React, { useEffect, useState, useCallback } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import MapboxGeocoder from '@mapbox/mapbox-sdk/services/geocoding';
import { MapEvents } from './MapEvents';
import toast from 'react-hot-toast';
import { debounce } from 'lodash';

import { LocationIcon } from '../icons/LocationIcon';

const geocodingService = MapboxGeocoder({
  accessToken:
    'pk.eyJ1IjoiY2NhcnJhbnphYyIsImEiOiJjbGo2aGh1MG4waHl6M3NvcndhejBhb3FmIn0.8EkawZUOeZ6OTYEvQ7kC_Q',
});

async function geocodeAddress(address) {
  try {
    const response = await geocodingService
      .forwardGeocode({
        query: address,
        limit: 5,
        // Looks for places in El Salvador
        countries: ['sv'],
      })
      .send();

    const features = response.body.features;
    if (features.length > 0) {
      const { center } = features[0];
      return { lat: center[1], lng: center[0] };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error geocoding address:', error);
  }

  return null;
}

export default function MapComponent({
  selectedLocation,
  setSelectedLocation,
  addressValue,
  setAddressValue,
}) {
  const [debouncedValue, setDebouncedValue] = useState('');

  const getSimilarAddress = async (latitude, longitude) => {
    try {
      const response = await geocodingService
        .forwardGeocode({
          query: `${longitude},${latitude}`,
          limit: 1,
        })
        .send();

      const similarAddress = response.body.features[0]?.place_name;

      if (similarAddress) {
        setAddressValue(similarAddress);
      } else {
        toast.error('Seleccione un punto válido en el mapa');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleGeocode = useCallback(
    debounce(async address => {
      const location = await geocodeAddress(address);
      setSelectedLocation(location);
    }, 500),
    []
  );

  const handleChange = event => {
    const { value } = event.target;
    setAddressValue(value);
    setDebouncedValue(value);
  };

  useEffect(() => {
    if (debouncedValue) {
      handleGeocode(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    // Located in El Salvador by default
    <>
      <div className='w-full'>
        <label htmlFor='address' className='mb-5 text-xs text-primary-500 uppercase'>
          Seleccione o ingrese la dirección
        </label>
        <div className='relative'>
          <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
            <LocationIcon />
          </div>
          <input
            type='text'
            onChange={handleChange}
            value={addressValue}
            id='address'
            placeholder='Bulevar de Los Próceres San Salvador'
            className='text-primary-500 mt-1 pl-10  appearance-none rounded w-full py-3 px-3 leading-tight focus:outline-none focus:border-2 focus:border-primary-300 placeholder:font-light placeholder:text-primary-400'
          />
        </div>
      </div>
      <MapContainer
        center={[13.6929, -89.2182]}
        zoom={8}
        style={{ height: '350px', width: '450px' }}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {selectedLocation && <Marker position={selectedLocation} />}
        <MapEvents setSelectedLocation={setSelectedLocation} setAddress={getSimilarAddress} />
      </MapContainer>
    </>
  );
<<<<<<< Updated upstream
}
=======
}
>>>>>>> Stashed changes
