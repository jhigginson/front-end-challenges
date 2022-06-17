import L from 'leaflet';
import { useState, useEffect, useMemo } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import './Map.css';

var customIcon = L.icon({
  iconUrl: '/images/icon-location.svg',
  iconSize: [46, 56], // size of the icon
  iconAnchor: [23, 55], // point of the icon which will correspond to marker's location
});

const Map = ({ info }) => {
  const [map, setMap] = useState(null);


  useEffect(() => {
    if (map) {
      map.setView([info.lat, info.long], 13);
    }
  }, [info, map]);


  const displayMap = useMemo(
    () => (
      <MapContainer
        center={[info.lat, info.long]}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
        ref={setMap}
        >

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[info.lat, info.long]} icon={customIcon}></Marker>
      </MapContainer>
    ),
    [info.lat, info.long],
  )

  return (
    <>
      {displayMap}
    </>
  );
};

export default Map;
