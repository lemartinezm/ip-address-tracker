import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import iconLocation from '../../assets/icon-location.svg';
import '../../../node_modules/leaflet/dist/leaflet.css';
import './styles.scss';

// El StricMode provoca error de renderizado del componente
export default function Map({ userData }) {

  function CustomMap({ userData }) {
    const map = useMap();

    useEffect(() => {
      map.flyTo([userData.location.lat, userData.location.lng]);
    }, [userData])

    return (
      <>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[userData.location.lat, userData.location.lng]} icon={L.icon({ iconUrl: iconLocation })} />
      </>)
  }

  return (
    <MapContainer id='map' center={[userData.location.lat, userData.location.lng]} zoom={16} zoomControl={false} scrollWheelZoom={false} >
      <CustomMap userData={userData} />
    </MapContainer>
  )
}
