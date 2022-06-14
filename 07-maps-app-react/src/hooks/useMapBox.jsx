import { useRef, useState, useEffect, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { v4 } from 'uuid';

mapboxgl.accessToken =
  'pk.eyJ1IjoidmljZmxvcmVzMTEiLCJhIjoiY2t4M2RteDRkMXhjZTJubXQ3azRyMjYyOSJ9.C_SEkqMAGTDxWNrKmu_gVA';

export const useMapBox = (initialPoint) => {
  const mapDiv = useRef();

  const setRefDiv = useCallback((node) => {
    mapDiv.current = node;
  }, []);

  const marcadores = useRef({});

  const mapa = useRef();
  const [coords, setCoords] = useState(initialPoint);

  // Punto inicial
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapDiv.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [initialPoint.lng, initialPoint.lat],
      zoom: initialPoint.zoom,
    });
    mapa.current = map;
  }, [initialPoint]);

  // Obtener coordenadas cuando se mueve el mapa
  useEffect(() => {
    if (mapa !== undefined) {
      mapa.current.on('move', () => {
        const { lng, lat } = mapa.current.getCenter();
        setCoords({
          lng: lng.toFixed(4),
          lat: lat.toFixed(4),
          zoom: mapa.current.getZoom().toFixed(4),
        });
      });
    }
  }, []);

  // agregar marcador al hacer click
  useEffect(() => {
    if (mapa !== undefined) {
      mapa.current.on('click', (event) => {
        const { lng, lat } = event.lngLat;
        const marker = new mapboxgl.Marker();
        marker.id = v4();

        marker.setLngLat([lng, lat]).addTo(mapa.current).setDraggable(true);

        marcadores.current[marker.id] = marker;
      });
    }
  }, []);

  return {
    coords,
    setRefDiv,
    marcadores,
  };
};
