import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import fondo from "../assets/Marmol.jpg";

const SearchBar = () => {
  const [tipoPropiedad, setTipoPropiedad] = useState("Tipo de propiedad");
  const [openDropdown, setOpenDropdown] = useState(false);

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

  return (
    <div
      className="relative -mt-32 z-30 rounded-md overflow-visible bg-cover bg-center pb-10"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="bg-gray-300/40 p-6 flex flex-wrap items-center gap-2 justify-center font-[Outfit]">

        {/* Acciones */}
        <button className="px-8 py-5 border border-gray-400 text-white w-full sm:w-auto">
          Comprar
        </button>

        <button className="px-8 py-5 border border-gray-400 text-white w-full sm:w-auto">
          Vender
        </button>

        <button className="px-8 py-5 border border-gray-400 text-white w-full sm:w-auto">
          Arrendar
        </button>

        {/* Dropdown */}
        <div className="relative w-full sm:w-56">
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="px-8 py-5 border border-gray-400 bg-gray-800/20 text-white rounded flex items-center justify-between w-full"
          >
            {tipoPropiedad}
          </button>

          <AnimatePresence>
            {openDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.25 }}
                className="absolute top-full mt-2 left-0 bg-black/30 backdrop-blur-2xl p-4 shadow-2xl w-full border border-white/10 rounded z-20"
              >
                <ul className="space-y-2 text-base font-medium relative">
                  {propiedades.map((prop, i) => (
                    <li key={i} className="relative group">

                      {/* Item principal */}
                      <button
                        onClick={() => {
                          setTipoPropiedad(prop.nombre);
                          if (!prop.sub) setOpenDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:text-teal-400 transition flex items-center gap-2"
                      >
                        {prop.sub && (
                          <span className="text-gray-400 group-hover:text-teal-400 transition">
                            &gt;
                          </span>
                        )}
                        {prop.nombre}
                      </button>

                      {/* Submenu derecho */}
                      {prop.sub && (
                        <ul className="absolute top-0 left-full ml-4 hidden group-hover:block bg-black/50 backdrop-blur-2xl w-56 rounded border border-white/10 p-2 space-y-1 z-30">
                          {prop.sub.map((subItem, j) => (
                            <li
                              key={j}
                              onClick={() => {
                                setTipoPropiedad(subItem);
                                setOpenDropdown(false);
                              }}
                              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:text-teal-400 transition group/sub"
                            >
                              <span className="opacity-0 group-hover/sub:opacity-100 transition">
                                &gt;
                              </span>
                              {subItem}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Ingresa comuna o ciudad"
          className="px-8 py-5 border border-gray-400 text-white rounded placeholder-white focus:outline-none focus:border-cyan-400 w-full sm:w-auto"
        />

        {/* Buscar */}
        <button className="px-8 py-5 border border-gray-400 text-white rounded flex items-center gap-2 w-full sm:w-auto justify-center transition hover:border-cyan-400">
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
