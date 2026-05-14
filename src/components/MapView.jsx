import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl'; 
import { Map, Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const MapView = ({ propiedades, selectedProperty, setSelectedProperty }) => {
  const mapRef = useRef(null);

  // 1. Encuadre automático (fitBounds) al hacer una búsqueda masiva
  useEffect(() => {
    if (propiedades.length > 0 && mapRef.current) {
      const bounds = new mapboxgl.LngLatBounds();
      let hasCoords = false;

      propiedades.forEach((prop) => {
        if (prop.coords?.lng && prop.coords?.lat) {
          bounds.extend([parseFloat(prop.coords.lng), parseFloat(prop.coords.lat)]);
          hasCoords = true;
        }
      });

      if (hasCoords) {
        mapRef.current.fitBounds(bounds, { 
          padding: 80, 
          duration: 1500, 
          maxZoom: 15 
        });
      }
    }
  }, [propiedades]);

  // 2. 🌟 EL MOTOR DE VUELO: Esto centra el mapa al hacer clic en una Card
  useEffect(() => {
    // Si hay una propiedad seleccionada, tiene coordenadas, y el mapa ya cargó...
    if (selectedProperty?.coords?.lat && selectedProperty?.coords?.lng && mapRef.current) {
      
      mapRef.current.flyTo({
        center: [parseFloat(selectedProperty.coords.lng), parseFloat(selectedProperty.coords.lat)],
        duration: 1500, // 1.5 segundos de animación de vuelo
        zoom: 16,       // Nivel de zoom de calle
        essential: true
      });
      
    } else if (selectedProperty && (!selectedProperty.coords?.lat || !selectedProperty.coords?.lng)) {
      console.warn(`La propiedad Código ${selectedProperty.codigo} no tiene coordenadas en la base de datos.`);
    }
  }, [selectedProperty]); // Este useEffect se dispara CADA VEZ que tocas una card

  return (
    <div className="w-full h-full rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-[#1a1a1a]">
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: -33.4489,
          longitude: -70.6693,
          zoom: 11
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        mapLib={mapboxgl}
        reuseMaps
      >
        <NavigationControl position="top-left" />

        {propiedades.map((prop) => {
          // Si la propiedad no tiene coordenadas, no dibujamos el pin
          if (!prop.coords?.lat || !prop.coords?.lng) return null;

          const isSelected = selectedProperty?.id === prop.id || selectedProperty?.codigo === prop.codigo;

          return (
            <Marker 
              key={prop.id || prop.codigo} 
              latitude={parseFloat(prop.coords.lat)} 
              longitude={parseFloat(prop.coords.lng)} 
              anchor="bottom"
              style={{ zIndex: isSelected ? 50 : 1 }} // El pin seleccionado se pone por encima de los demás
            >
              <div 
                className="group relative flex flex-col items-center cursor-pointer"
                onClick={() => {
                  // Si tienes la función setSelectedProperty, permitimos seleccionar desde el mapa también
                  if (setSelectedProperty) setSelectedProperty(prop);
                }} 
              >
                <div className={`absolute bottom-10 bg-white text-black text-[10px] font-bold px-3 py-1 rounded-lg transition-opacity whitespace-nowrap shadow-xl ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  {prop.precios?.arriendo?.valor || prop.precios?.venta?.valor} {prop.precios?.arriendo?.moneda || prop.precios?.venta?.moneda}
                </div>
                
                <FaMapMarkerAlt 
                  size={isSelected ? 50 : 35} 
                  className="text-[#24B6C1] transition-all duration-300"
                  style={{
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