import React from 'react';
import { useMapBox } from '../hooks/useMapBox';

const initialPoint = {
  lng: -88.8446,
  lat: 13.8731,
  zoom: 8.0471,
};

export const Maps = () => {
  const { setRefDiv, coords } = useMapBox(initialPoint);

  return (
    <>
      <div className="info">
        lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
      </div>

      <div ref={setRefDiv} className="mapContainer" />
    </>
  );
};
