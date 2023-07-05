import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React from 'react';
import L from 'leaflet';

var LeafIcon = L.Icon.extend({
  options: {
    iconSize: [30, 45],
    iconAnchor:   [15, 35],
  },
});

const MultipleLocationsMap = ({ branches, competenceBranches }) => {
  var blueIcon = new LeafIcon({
    iconUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/1334px-Map_marker.svg.png',
  });

  var redIcon = new LeafIcon({
    iconUrl: 'https://static-00.iconduck.com/assets.00/map-marker-icon-342x512-gd1hf1rz.png',
  });

  return (
    <MapContainer center={[13.6929, -89.2182]} zoom={9} style={{ height: '470px' }}>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      {branches.map((branch, index) => (
        <Marker key={index} position={[branch.latitude, branch.longitude]} icon={blueIcon}>
          <Popup>
            <p className='font-bold m-0'>
              {branch.pupuseria} (Sucursal {branch.name})
            </p>
            <p>
              Horario: {branch.openingTime} - {branch.closingTime}
            </p>
          </Popup>
        </Marker>
      ))}
      {competenceBranches.map((branch, index) => (
        <Marker key={index} position={[branch.latitude, branch.longitude]} icon={redIcon} className='z-20'>
          <Popup>
            <p className='font-bold m-0'>
              {branch.pupuseria} (Sucursal {branch.name})
            </p>
            <p>
              Horario: {branch.openingTime} - {branch.closingTime}
            </p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MultipleLocationsMap;