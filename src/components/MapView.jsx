import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl'; 
import { Map, Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FaMapMarkerAlt, FaBus, FaStore, FaGraduationCap, FaHospital } from 'react-icons/fa'; // 🌟 Importamos FaHospital para la mejora de salud

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const MapView = ({ propiedades, selectedProperty, setSelectedProperty, activeFilter }) => {
  const mapRef = useRef(null);
  const [puntosInteres, setPuntosInteres] = useState([]);
  const [loadingPoi, setLoadingPoi] = useState(false);

  // 1. Encuadre automático (fitBounds)
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

  // 2. EL MOTOR DE VUELO: Centra el mapa al cambiar de propiedad
  useEffect(() => {
    if (selectedProperty?.coords?.lat && selectedProperty?.coords?.lng && mapRef.current) {
      mapRef.current.flyTo({
        center: [parseFloat(selectedProperty.coords.lng), parseFloat(selectedProperty.coords.lat)],
        duration: 1500,
        zoom: 16,       
        essential: true
      });
    }
  }, [selectedProperty]);

  // 3. 🌟 MOTOR DE BÚSQUEDA ROBUSTO (Soporta Polígonos/Áreas mediante nwr + out center)
  useEffect(() => {
    if ((activeFilter === "Transporte" || activeFilter === "Servicios" || activeFilter === "Educación") && selectedProperty?.coords?.lat && selectedProperty?.coords?.lng) {
      setLoadingPoi(true);
      const lat = parseFloat(selectedProperty.coords.lat);
      const lng = parseFloat(selectedProperty.coords.lng);

      let query = "";

      // 🌟 Reemplazamos 'node' por 'nwr' y agregamos 'out center;' para obtener el centro geométrico de polígonos
      if (activeFilter === "Transporte") {
        query = `[out:json];nwr(around:500,${lat},${lng})[highway=bus_stop];out center;`;
      } else if (activeFilter === "Servicios") {
        // 🌟 AGREGADO: Incorporamos hospitales y clínicas de la comuna a la consulta
        query = `[out:json];(
          nwr(around:500,${lat},${lng})[shop];
          nwr(around:500,${lat},${lng})[amenity=pharmacy];
          nwr(around:500,${lat},${lng})[amenity=bank];
          nwr(around:500,${lat},${lng})[amenity=hospital];
          nwr(around:500,${lat},${lng})[amenity=clinic];
        );out center;`;
      } else if (activeFilter === "Educación") {
        // 🌟 AHORA BUSCA POLÍGONOS: Captura Betterland School y colegios mapeados como recintos enteros
        query = `[out:json];(
          nwr(around:500,${lat},${lng})[amenity=school];
          nwr(around:500,${lat},${lng})[amenity=kindergarten];
          nwr(around:500,${lat},${lng})[amenity=university];
          nwr(around:500,${lat},${lng})[amenity=college];
        );out center;`;
      }
      
      const urlPrincipal = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
      const urlRespaldo = `https://overpass.kumi.systems/api/interpreter?data=${encodeURIComponent(query)}`;

      fetch(urlPrincipal)
        .then((res) => {
          if (!res.ok) throw new Error("Servidor principal saturado");
          return res.json();
        })
        .then((data) => {
          setPuntosInteres(data.elements || []);
          setLoadingPoi(false);
        })
        .catch((err) => {
          console.warn("Cambiando al servidor mirror de respaldo...", err.message);
          
          fetch(urlRespaldo)
            .then((res) => res.json())
            .then((data) => {
              setPuntosInteres(data.elements || []);
              setLoadingPoi(false);
            })
            .catch((backupErr) => {
              console.error("Error en ambos servidores de mapas:", backupErr);
              setLoadingPoi(false);
            });
        });
    } else {
      setPuntosInteres([]);
    }
  }, [activeFilter, selectedProperty]);

  return (
    <div className="w-full h-full rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-[#1a1a1a] relative">
      
      {/* Indicador de carga flotante */}
      {loadingPoi && (
        <div className="absolute top-4 right-4 bg-black/80 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-sm z-50 flex items-center gap-2 border border-white/10">
          <div className="w-3 h-3 border-2 border-[#24B6C1] border-t-transparent rounded-full animate-spin"></div>
          Buscando {activeFilter?.toLowerCase()} cercano...
        </div>
      )}

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

        {/* RENDER DINÁMICO DE PUNTOS DE INTERÉS */}
        {puntosInteres.map((item) => {
          // 🌟 EXTRACCIÓN SEGURA DE COORDENADAS: Si es un polígono, OpenStreetMap guarda la lat/lon dentro del objeto '.center'
          const markerLat = item.lat || item.center?.lat;
          const markerLon = item.lon || item.center?.lon;

          // Si el elemento no posee coordenadas en ninguna estructura, evitamos que rompa la renderización
          if (!markerLat || !markerLon) return null;

          const isTransport = item.tags?.highway === "bus_stop";
          const isEducation = item.tags?.amenity === "school" || 
                              item.tags?.amenity === "kindergarten" || 
                              item.tags?.amenity === "university" ||
                              item.tags?.amenity === "college";
          
          // 🌟 Identificamos si el punto de interés de servicios es del rubro salud
          const isHealth = item.tags?.amenity === "hospital" || item.tags?.amenity === "clinic";

          // Valores base orientados a "Servicios" comerciales estándar
          let tooltipColor = "bg-[#0091A4]";
          let tooltipText = item.tags?.name || item.tags?.shop || item.tags?.amenity || "Servicio";

          if (isTransport) {
            tooltipColor = "bg-[#E30613]";
            tooltipText = item.tags?.name || item.tags?.ref || "Paradero Red";
          } else if (isEducation) {
            tooltipColor = "bg-[#6366F1]"; 
            tooltipText = item.tags?.name || "Establecimiento Educacional";
          } else if (isHealth) {
            tooltipColor = "bg-emerald-600"; // 🌟 Color Verde Salud diferenciador para clínicas y hospitales
            tooltipText = item.tags?.name || "Centro de Salud / Clínica";
          }

          return (
            <Marker
              key={item.id}
              latitude={parseFloat(markerLat)}
              longitude={parseFloat(markerLon)}
              anchor="center"
            >
              <div className="group relative flex flex-col items-center">
                
                {/* Tooltip adaptativo con colores fluidos por categoría */}
                <div className={`absolute bottom-8 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-[60] ${tooltipColor}`}>
                  {tooltipText}
                </div>

                {/* Pintar botón según tipo de servicio encontrado */}
                {isTransport ? (
                  <div 
                    className="w-7 h-7 bg-[#E30613] hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-all duration-200 transform hover:scale-110 cursor-pointer"
                    style={{ filter: "drop-shadow(0 2px 6px rgba(227, 6, 19, 0.4))" }}
                  >
                    <FaBus size={11} />
                  </div>
                ) : isEducation ? (
                  <div 
                    className="w-7 h-7 bg-[#6366F1] hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-all duration-200 transform hover:scale-110 cursor-pointer"
                    style={{ filter: "drop-shadow(0 2px 6px rgba(99, 102, 241, 0.4))" }}
                  >
                    <FaGraduationCap size={12} />
                  </div>
                ) : isHealth ? (
                  // 🌟 NUEVO PARADIGMA: PIN VERDE DE SALUD PARA CLÍNICAS Y HOSPITALES
                  <div 
                    className="w-7 h-7 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-all duration-200 transform hover:scale-110 cursor-pointer"
                    style={{ filter: "drop-shadow(0 2px 6px rgba(5, 150, 105, 0.4))" }}
                  >
                    <FaHospital size={11} />
                  </div>
                ) : (
                  <div 
                    className="w-7 h-7 bg-[#0091A4] hover:bg-[#007a8a] text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-all duration-200 transform hover:scale-110 cursor-pointer"
                    style={{ filter: "drop-shadow(0 2px 6px rgba(0, 145, 164, 0.4))" }}
                  >
                    <FaStore size={11} />
                  </div>
                )}

              </div>
            </Marker>
          );
        })}

        {/* PINTAR LOS PINES DE LAS PROPIEDADES ALALUF */}
        {propiedades.map((prop) => {
          if (!prop.coords?.lat || !prop.coords?.lng) return null;

          const isSelected = selectedProperty?.id === prop.id || selectedProperty?.codigo === prop.codigo;

          return (
            <Marker 
              key={prop.id || prop.codigo} 
              latitude={parseFloat(prop.coords.lat)} 
              longitude={parseFloat(prop.coords.lng)} 
              anchor="bottom"
              style={{ zIndex: isSelected ? 50 : 1 }} 
            >
              <div 
                className="group relative flex flex-col items-center cursor-pointer"
                onClick={() => {
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