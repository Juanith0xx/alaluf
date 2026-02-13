import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ChevronDown, Check } from "lucide-react";

const SearchBar = () => {
  const [tipoPropiedad, setTipoPropiedad] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const propiedades = [
    { nombre: "Comercial" },
    { nombre: "Residencial" },
    { nombre: "Terrenos y Proyectos" },
    {
      nombre: "Industrial",
      sub: [
        "Bodegas Industriales",
        "Galpones Industriales",
        "Terrenos Industriales",
      ],
    },
    { nombre: "Hotelería" },
    { nombre: "Campos" },
    { nombre: "Licitaciones" },
  ];

  // 🔥 Cerrar al hacer click fuera
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
    <div className="relative -mt-32 z-30 rounded-md">
      <div className="bg-gray-300/40 backdrop-blur-md p-6 flex flex-wrap items-center gap-2 justify-center font-[Outfit]">

        {/* Acciones */}
        {["Comprar", "Vender", "Arrendar"].map((accion, i) => (
          <button
            key={i}
            className="px-8 py-5 border border-gray-400 bg-gray-800/50 text-white w-full sm:w-auto hover:border-cyan-400 transition"
          >
            {accion}
          </button>
        ))}

        {/* Dropdown */}
        <div className="relative w-full sm:w-56" ref={dropdownRef}>
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="px-8 py-5 border border-gray-400 bg-gray-800/50 text-white rounded flex items-center justify-between w-full hover:border-cyan-400 transition"
          >
            <span>
              {tipoPropiedad || "Tipo de propiedad"}
            </span>

            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${
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
                transition={{ duration: 0.25 }}
                className="absolute top-full mt-2 left-0 bg-black/70 backdrop-blur-2xl p-4 shadow-2xl w-full border border-white/10 rounded z-50"
              >
                <ul className="space-y-2 text-base font-medium">
                  {propiedades.map((prop, i) => (
                    <li key={i} className="relative group">

                      {/* Item principal */}
                      <button
                        onClick={() => {
                          if (!prop.sub) {
                            setTipoPropiedad(prop.nombre);
                            setOpenDropdown(false);
                          }
                        }}
                        className="w-full text-left px-4 py-2 hover:text-cyan-400 transition flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          {prop.nombre}
                        </span>

                        {tipoPropiedad === prop.nombre && (
                          <Check size={16} className="text-cyan-400" />
                        )}
                      </button>

                      {/* Submenu */}
                      {prop.sub && (
                        <ul className="absolute top-0 left-full ml-4 hidden group-hover:block bg-black/80 backdrop-blur-2xl w-56 rounded border border-white/10 p-2 space-y-1 z-50">
                          {prop.sub.map((subItem, j) => (
                            <li
                              key={j}
                              onClick={() => {
                                setTipoPropiedad(subItem);
                                setOpenDropdown(false);
                              }}
                              className="flex items-center justify-between px-4 py-2 cursor-pointer hover:text-cyan-400 transition"
                            >
                              {subItem}

                              {tipoPropiedad === subItem && (
                                <Check size={14} className="text-cyan-400" />
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}

                  {/* 🔥 Opción limpiar */}
                  <li>
                    <button
                      onClick={() => {
                        setTipoPropiedad(null);
                        setOpenDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-400 hover:text-red-400 transition border-t border-white/10 mt-2 pt-3"
                    >
                      Limpiar selección
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Ingresa comuna o ciudad"
          className="px-8 py-5 border border-gray-400 bg-gray-800/50 text-white text-center rounded placeholder-white focus:outline-none focus:border-cyan-400 w-full sm:w-auto"
        />

        {/* Buscar */}
        <button className="px-8 py-5 border border-gray-400 bg-gray-800/50 text-white rounded flex items-center gap-2 w-full sm:w-auto justify-center transition hover:border-cyan-400">
          Buscar <Search size={20} />
        </button>

        {/* Mapa */}
        <button className="px-8 py-5 bg-[#24B6C1] hover:bg-cyan-600 text-white rounded flex items-center gap-2 w-full sm:w-auto justify-center transition">
          Mapa <MapPin size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
