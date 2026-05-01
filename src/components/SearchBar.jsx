import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  ChevronDown,
  Check,
  ChevronRight,
} from "lucide-react";

const SearchBar = () => {
  const [tipoPropiedad, setTipoPropiedad] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [accionActiva, setAccionActiva] = useState("Comprar");
  const dropdownRef = useRef(null);

  const propiedades = [
    {
      nombre: "Residencial",
      sub: ["Casas", "Departamentos"],
    },
    {
      nombre: "Comercial",
      sub: [
        "Oficinas",
        "Locales Comerciales",
        "Casas Comerciales",
        "Edificios Corporativos",
        "Retail",
        "Hoteleria",
      ],
    },
    {
      nombre: "Industrial",
      sub: [
        "Galpones",
        "Bodegas",
        "Terrenos Industriales",
        "Terrenos para Proyectos",
      ],
    },
    {
      nombre: "Inversion",
      sub: ["Parcelas", "Sitios"],
    },
  ];

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative -mt-80 z-30 px-4 pb-25">
      {/* Contenedor Principal (Estilo Imagen 2) */}
      <div className="max-w-6xl mx-auto bg-gray-200/20 backdrop-blur-md p-4 flex flex-wrap items-center gap-3 justify-center font-[Outfit] rounded-[40px] border border-white/20 shadow-2xl">
        
        {/* Acciones: Comprar, Vender, Arrendar */}
        <div className="flex bg-black/20 p-1 rounded-xl border border-white/5">
          {["Comprar", "Vender", "Arrendar"].map((accion) => (
            <button
              key={accion}
              onClick={() => setAccionActiva(accion)}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                accionActiva === accion 
                ? "bg-gray-500/60 text-white shadow-inner" 
                : "text-white/60 hover:text-white"
              }`}
            >
              {accion}
            </button>
          ))}
        </div>

        {/* Dropdown: Tipo de propiedad */}
        <div className="relative w-full sm:w-56" ref={dropdownRef}>
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="px-5 py-4 bg-gray-600/60 text-white rounded-xl flex items-center justify-between w-full hover:bg-gray-600/80 transition-colors border border-white/10"
          >
            <span className="text-sm truncate font-medium">
              {tipoPropiedad || "Tipo de propiedad"}
            </span>
            <ChevronDown
              size={16}
              className={`ml-2 text-[#24B6C1] transition-transform duration-300 ${
                openDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {openDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-3 left-0 bg-[#1a1a1a]/95 backdrop-blur-2xl p-3 shadow-2xl w-72 border border-white/10 rounded-2xl z-50"
              >
                <ul className="space-y-1">
                  {propiedades.map((prop, i) => (
                    <li key={i} className="relative group">
                      <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#24B6C1]/10 hover:text-[#24B6C1] transition flex items-center justify-between group">
                        <span className="text-sm font-medium">{prop.nombre}</span>
                        {prop.sub && <ChevronRight size={14} className="text-gray-600 group-hover:text-[#24B6C1]" />}
                      </button>

                      {prop.sub && (
                        <ul className="absolute top-0 left-full ml-2 hidden group-hover:block bg-[#1a1a1a] backdrop-blur-2xl w-64 rounded-xl border border-white/10 p-2 shadow-2xl z-50">
                          {prop.sub.map((subItem, j) => (
                            <li
                              key={j}
                              onClick={() => {
                                setTipoPropiedad(subItem);
                                setOpenDropdown(false);
                              }}
                              className="flex items-center justify-between px-4 py-2.5 rounded-lg cursor-pointer text-sm text-gray-300 hover:bg-[#24B6C1]/10 hover:text-[#24B6C1] transition"
                            >
                              {subItem}
                              {tipoPropiedad === subItem && <Check size={14} className="text-[#24B6C1]" />}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() => {
                        setTipoPropiedad(null);
                        setOpenDropdown(false);
                      }}
                      className="w-full text-center px-4 py-2 text-[10px] uppercase tracking-widest text-gray-500 hover:text-red-400 transition border-t border-white/5 mt-2 pt-3"
                    >
                      Limpiar selección
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input de Búsqueda */}
        <div className="flex-1 min-w-[240px]">
          <input
            type="text"
            placeholder="Ingresa comuna o ciudad"
            className="w-full px-6 py-4 bg-gray-600/40 text-white rounded-xl placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-[#24B6C1] transition-all text-sm"
          />
        </div>

        {/* Botón Buscar */}
        <button className="px-6 py-4 bg-gray-400/40 hover:bg-gray-400/60 text-white rounded-xl flex items-center gap-2 transition-all group">
          <span className="text-sm font-semibold">Buscar</span>
          <Search size={18} className="group-hover:scale-110 transition-transform" />
        </button>

        {/* Botón Mapa */}
        <button className="px-6 py-4 bg-[#24B6C1] hover:bg-cyan-600 text-white rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-cyan-900/20">
          <span className="text-sm font-semibold">Mapa</span>
          <MapPin size={18} />
        </button>

      </div>
    </div>
  );
};

export default SearchBar;