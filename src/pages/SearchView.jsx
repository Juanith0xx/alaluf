import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaFilter, FaArrowLeft } from "react-icons/fa";

// Componentes del proyecto
import Navbar from "../components/Navbar"; 
import PropertyCard from "../components/PropertyCard"; 

const SearchView = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [propiedades, setPropiedades] = useState([]);
  const [loading, setLoading] = useState(true);

  // Captura de parámetros
  const query = searchParams.get("q");
  const tipo_prop = searchParams.get("tipo_prop");
  const obj = searchParams.get("obj");
  const comuna = searchParams.get("comuna");
  const offset = searchParams.get("offset") || 0;

  const getLabelTipo = (id) => {
    const tipos = { "1": "Casas", "2": "Oficinas", "3": "Deptos", "4": "Locales", "5": "Bodegas", "6": "Galpones", "7": "Terrenos" };
    return tipos[id] || "Propiedad";
  };

  const getLabelObj = (id) => (id === "2" ? "Arriendo" : "Venta");

  useEffect(() => {
    const fetchResultados = async () => {
      setLoading(true);
      try {
        let url = "";
        if (tipo_prop && obj && comuna) {
          url = `http://localhost:5000/api/propiedades/buscar?tipo_prop=${tipo_prop}&obj=${obj}&comuna=${comuna}&offset=${offset}&limit=20`;
        } else if (query) {
          url = `http://localhost:5000/api/propiedades/${query}`;
        } else {
          setPropiedades([]);
          setLoading(false);
          return;
        }
        const response = await fetch(url);
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setPropiedades(data);
        } else if (data && (data.id || data.codigo)) {
          setPropiedades([data]); 
        } else {
          setPropiedades([]);
        }
      } catch (error) {
        console.error("Error en SearchView:", error);
        setPropiedades([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResultados();
  }, [query, tipo_prop, obj, comuna, offset]);

  const nombreComunaReal = propiedades.length > 0 ? propiedades[0].ubicacion.comuna : "Chile";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-[Outfit]">
      <Navbar />

      {/* HEADER: Limpio, sin el buscador que flotaba mal */}
      <div className="bg-[#111111] border-b border-white/5 pt-32 pb-16 shadow-xl">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => navigate('/')}
              className="group p-4 border border-white/10 rounded-2xl hover:bg-[#24B6C1] hover:border-[#24B6C1] transition-all duration-300"
            >
              <FaArrowLeft className="group-hover:scale-110 transition-transform" />
            </button>

            <div>
              <p className="text-[#24B6C1] text-xs font-bold uppercase tracking-[0.3em] mb-2">
                {tipo_prop && obj && comuna 
                  ? `${getLabelObj(obj)} / ${getLabelTipo(tipo_prop)}` 
                  : query 
                    ? `Ficha de Propiedad: ${query}` 
                    : "Explorando Propiedades"}
              </p>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
                Resultados de la búsqueda
              </h1>
              <div className="flex items-center gap-3 mt-4">
                <span className="flex h-2 w-2 rounded-full bg-[#24B6C1] animate-pulse"></span>
                <p className="text-gray-400 text-sm font-medium">
                  {propiedades.length} {propiedades.length === 1 ? 'propiedad disponible' : 'propiedades disponibles'} 
                  {tipo_prop && obj && comuna && ` en ${nombreComunaReal}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="max-w-[1600px] mx-auto p-6 grid lg:grid-cols-12 gap-10 mt-10">
        
        {/* GRILLA */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">Disponibilidad Actual</h2>
            <button className="flex items-center gap-2 text-xs font-bold text-gray-300 border border-white/10 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition">
              Filtros Avanzados <FaFilter className="text-[#24B6C1]" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {loading ? (
              <div className="col-span-2 py-40 text-center">
                <div className="inline-block w-12 h-12 border-4 border-[#24B6C1] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-500 mt-4 text-xs uppercase tracking-widest">Sincronizando con Alaluf</p>
              </div>
            ) : propiedades.length > 0 ? (
              propiedades.map((prop) => (
                <PropertyCard key={prop.id || prop.codigo} item={prop} />
              ))
            ) : (
              <div className="col-span-2 py-40 text-center border border-dashed border-white/10 rounded-[40px] bg-white/5">
                <p className="text-2xl font-bold text-gray-500">Sin coincidencias</p>
              </div>
            )}
          </div>
        </div>

        {/* SIDEBAR STICKY */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-8">
            <div className="h-[450px] bg-[#1a1a1a] rounded-[40px] border border-white/10 relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-70.6483,-33.4569,12/1000x1000?access_token=YOUR_TOKEN')] bg-cover opacity-30 grayscale transition-all duration-1000"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                 <div className="w-14 h-14 bg-[#24B6C1] rounded-full flex items-center justify-center mb-4 animate-bounce">
                    <MapPin size={28} className="text-white" />
                 </div>
                 <p className="text-white font-black text-xl mb-1">Explora el Mapa</p>
                 <p className="text-gray-400 text-sm">Vista satelital activa para {nombreComunaReal}</p>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[40px] text-black shadow-2xl relative overflow-hidden">
              <h3 className="text-2xl font-black mb-2 tracking-tighter">Asesoría Especializada</h3>
              <p className="text-gray-500 text-sm mb-8">Déjanos tus datos y un consultor te contactará.</p>
              <form className="space-y-4">
                <input type="text" placeholder="Tu nombre" className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-[#24B6C1]" />
                <input type="email" placeholder="Correo" className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-[#24B6C1]" />
                <textarea placeholder="Mensaje" className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100 h-32 resize-none focus:outline-[#24B6C1]"></textarea>
                <button type="button" className="w-full py-5 bg-black text-white font-black rounded-2xl hover:bg-[#24B6C1] transition-all uppercase tracking-widest text-xs">
                  Enviar Requerimiento
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MapPin = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

export default SearchView;