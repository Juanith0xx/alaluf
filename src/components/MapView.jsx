import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl'; 
import { Map, Marker, NavigationControl, FullscreenControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const MapView = ({ propiedades, selectedProperty }) => {
  const mapRef = useRef();
  const [viewState, setViewState] = useState({
    latitude: -33.4489,
    longitude: -70.6693,
    zoom: 11
  });

  useEffect(() => {
    console.log("Propiedades en el Mapa:", propiedades.map(p => ({ id: p.id, coords: p.coords })));
  }, [propiedades]);

  useEffect(() => {
    if (selectedProperty && selectedProperty.coords?.lat && selectedProperty.coords?.lng) {
      mapRef.current?.flyTo({
        center: [selectedProperty.coords.lng, selectedProperty.coords.lat],
        duration: 2000,
        zoom: 15,
        essential: true
      });
    }
  }, [selectedProperty]);

  return (
    <div className="w-full h-full rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-[#1a1a1a]">
      <Map
        {...viewState}
        ref={mapRef}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        mapLib={mapboxgl}
        reuseMaps
      >
        <NavigationControl position="top-left" />

        {propiedades.map((prop) => {
          if (!prop.coords?.lat || !prop.coords?.lng) return null;

          const isSelected = selectedProperty?.id === prop.id;

          return (
            <Marker 
              key={prop.id || prop.codigo} 
              latitude={parseFloat(prop.coords.lat)} 
              longitude={parseFloat(prop.coords.lng)} 
              anchor="bottom"
            >
              <div className="group relative flex flex-col items-center">
                <div className="absolute bottom-10 bg-white text-black text-[10px] font-bold px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-50">
                  {prop.precios?.arriendo?.valor || prop.precios?.venta?.valor} {prop.precios?.arriendo?.moneda || prop.precios?.venta?.moneda}
                </div>
                
                <FaMapMarkerAlt 
                  // Mantenemos el cambio de tamaño para destacar la selección
                  size={isSelected ? 35 : 30} 
                  // COLOR FIJO: #24B6C1 para todos los estados
                  className="text-[#24B6C1] cursor-pointer hover:scale-125 transition-all duration-300"
                  style={{
                    // Ajustamos el resplandor (glow) para diferenciar el seleccionado
                    filter: isSelected 
                      ? "drop-shadow(0 0 15px rgba(36, 182, 193, 0.9))" 
                      : "drop-shadow(0 0 8px rgba(36, 182, 193, 0.4))"
                  }}
                />
              </div>
            </Marker>
          );
        })}
      </Map>
    </div>
  );
};

export default MapView;