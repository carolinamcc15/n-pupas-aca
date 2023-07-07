import { useMapEvents } from 'react-leaflet';

export const MapEvents = ({ setSelectedLocation, setAddress }) => {
  useMapEvents({
    click: event => {
      setSelectedLocation(event?.latlng);
      setAddress(event.latlng.lat, event.latlng.lng);
    },
  });

  return null;
<<<<<<< Updated upstream
};
=======
};
>>>>>>> Stashed changes
