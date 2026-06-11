import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ChevronDown } from "lucide-react"; 
import logo from "../assets/Logo_A.png";
import { Link, useNavigate } from 'react-router-dom';

/* =========================
   UTILERÍA: SCROLL PERSONALIZADO
========================= */
// Función para hacer scroll con tiempo exacto (duration en milisegundos)
const customSmoothScroll = (targetId, duration = 1000) => {
  const target = document.getElementById(targetId);
  if (!target) return;

  // Calculamos la posición considerando un pequeño margen (ej. -80px para el header)
  const targetPosition = target.getBoundingClientRect().top + window.scrollY - 80;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  // Ecuación de suavizado (EaseInOutQuad) para un movimiento elegante
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    
    // Calculamos la siguiente posición
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    
    // Continuamos la animación hasta alcanzar la duración
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      window.scrollTo(0, targetPosition); // Aseguramos posición final exacta
    }
  };

  requestAnimationFrame(animation);
};

/* =========================
   DESKTOP NAVBAR
========================= */
const NavbarDesktop = ({ 
  openDropdown, setOpenDropdown, 
  openToolsDropdown, setOpenToolsDropdown,
  searchCode, setSearchCode, onSearch 
}) => (
  <nav className="fixed w-full z-50 bg-black/50 text-white font-[Outfit] pt-8 hidden lg:block">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">

      <div className="flex items-center flex-1">
        <Link to="/" className="flex items-center -ml-3">
          <img
            src={logo}
            alt="Logo Alaluf"
            className="h-11 w-auto object-contain hover:opacity-80 transition"
          />
        </Link>

        <div className="flex items-center text-[15px] tracking-wide ml-auto gap-11">
          <div className="flex items-center gap-12">
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown(true)}
              onMouseLeave={() => setOpenDropdown(false)}
            >
              <span className="cursor-pointer hover:text-teal-400 transition duration-300 font-medium">
                Servicios
              </span>

              <AnimatePresence>
                {openDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.25 }}
                    className="absolute top-12 -left-6 bg-black/50 backdrop-blur-2xl p-6 shadow-2xl w-60 border border-white/10"
                  >
                    <ul className="space-y-4 text-base font-medium">
                      <li className="relative cursor-pointer transition hover:text-teal-400 before:content-['>'] before:absolute before:-left-4 before:opacity-0 hover:before:opacity-100">
                        <Link to="/licitaciones" className="block w-full">Licitaciones</Link>
                      </li>
                      <li className="relative cursor-pointer transition hover:text-teal-400 before:content-['>'] before:absolute before:-left-4 before:opacity-0 hover:before:opacity-100">
                        <Link to="/industrial" className="block w-full">Industrial</Link>
                      </li>
                      <li className="relative cursor-pointer transition hover:text-teal-400 before:content-['>'] before:absolute before:-left-4 before:opacity-0 hover:before:opacity-100">
                        <Link to="/terrenos_proyectos" className="block w-full">Terrenos para Proyectos</Link>
                      </li>
                      <li className="relative cursor-pointer transition hover:text-teal-400 before:content-['>'] before:absolute before:-left-4 before:opacity-0 hover:before:opacity-100">
                        <Link to="/comercial" className="block w-full">Comercial</Link>
                      </li>
                      <li className="relative cursor-pointer transition hover:text-teal-400 before:content-['>'] before:absolute before:-left-4 before:opacity-0 hover:before:opacity-100">
                        <Link to="/residencial" className="block w-full">Residencial</Link>
                      </li>
                       <li className="relative cursor-pointer transition hover:text-teal-400 before:content-['>'] before:absolute before:-left-4 before:opacity-0 hover:before:opacity-100">
                        <Link to="/administracion-activo" className="block w-full">Administración de Arriendos</Link>
                      </li>
                       <li className="relative cursor-pointer transition hover:text-teal-400 before:content-['>'] before:absolute before:-left-4 before:opacity-0 hover:before:opacity-100">
                        <Link to="/tasacion-activo" className="block w-full">Tasación de Activos</Link>
                      </li>
                       <li className="relative cursor-pointer transition hover:text-teal-400 before:content-['>'] before:absolute before:-left-4 before:opacity-0 hover:before:opacity-100">
                        <Link to="/club_deals_inversiones" className="block w-full">Club Deals e Inversiones</Link>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/nosotros" className="hover:text-teal-400 transition duration-300 font-medium">Nosotros</Link>
            <a href="https://alaluf.cl/pressroom2.php" className="hover:text-teal-400 transition duration-300 font-medium">Newsletter</a>
            
            <div
              className="relative"
              onMouseEnter={() => setOpenToolsDropdown(true)}
              onMouseLeave={() => setOpenToolsDropdown(false)}
            >
              <span className="cursor-pointer hover:text-teal-400 transition duration-300 font-medium flex items-center gap-1">
                Herramientas <ChevronDown size={14} className="opacity-70" />
              </span>

              <AnimatePresence>
                {openToolsDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.25 }}
                    className="absolute top-12 -left-6 bg-black/50 backdrop-blur-2xl p-6 shadow-2xl w-60 border border-white/10"
                  >
                    <ul className="space-y-4 text-base font-medium">
                      <li className="relative cursor-pointer transition hover:text-teal-400 before:content-['>'] before:absolute before:-left-4 before:opacity-0 hover:before:opacity-100">
                        <Link to="/simulador-hipotecario" className="block w-full">Simulador Hipotecario</Link>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 🌟 AQUÍ LLAMAMOS A LA FUNCIÓN (ej. 1200ms = 1.2 segundos de duración) */}
            <a 
              href="#contacto" 
              onClick={(e) => {
                e.preventDefault();
                customSmoothScroll('contacto', 1200); // <-- Cambia este número para controlar la velocidad
              }}
              className="hover:text-teal-400 transition duration-300 font-medium"
            >
              Contacto
            </a>
          </div>

          <a href="https://alaluf.cl/mialaluf/" className="ml-auto hover:text-teal-400 transition duration-300 font-medium">
            Mi Alaluf
          </a>
        </div>
      </div>

      <div className="hidden lg:flex items-center bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10 hover:border-teal-400/50 transition ml-10">
        <input
          type="text"
          placeholder="Ingresar código"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          className="bg-transparent outline-none text-sm placeholder-white w-32"
        />
        <Search 
          size={18} 
          className="ml-2 opacity-70 cursor-pointer hover:text-teal-400 transition" 
          onClick={onSearch}
        />
      </div>

    </div>
    <div className="border-b border-white/20"></div>
  </nav>
);


/* =========================
   MOBILE NAVBAR
========================= */
const NavbarMobile = ({ 
  openMenu, setOpenMenu, 
  openMobileTools, setOpenMobileTools,
  searchCode, setSearchCode, onSearch 
}) => (
  <nav className="fixed w-full z-50 bg-black/60 text-white font-[Outfit] pt-6 lg:hidden">
    <div className="flex items-center justify-between px-6 py-4">
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="Logo Alaluf"
          className="h-10 w-auto object-contain hover:opacity-80 transition"
        />
      </Link>
      <button onClick={() => setOpenMenu(!openMenu)} className="text-white">
        {openMenu ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>

    <AnimatePresence>
      {openMenu && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-black/80 backdrop-blur-2xl px-6 pb-6 border-t border-white/10"
        >
          <div className="flex flex-col gap-5 text-base mt-4">
            <span className="cursor-pointer hover:text-teal-400 transition">Servicios</span>
            <Link to="/nosotros" onClick={() => setOpenMenu(false)} className="hover:text-teal-400 transition">Nosotros</Link>
            <a href="https://alaluf.cl/pressroom2.php" className="hover:text-teal-400 transition">Newsletter</a>
            
            <div className="flex flex-col">
              <span 
                onClick={() => setOpenMobileTools(!openMobileTools)} 
                className="cursor-pointer hover:text-teal-400 transition flex items-center justify-between"
              >
                Herramientas <ChevronDown size={16} className={`transition-transform duration-200 ${openMobileTools ? "rotate-180 text-teal-400" : "opacity-70"}`} />
              </span>
              <AnimatePresence>
                {openMobileTools && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-4 mt-3 space-y-3 border-l border-white/10 text-sm font-medium overflow-hidden"
                  >
                    <Link 
                      to="/simulador-hipotecario" 
                      onClick={() => { setOpenMenu(false); setOpenMobileTools(false); }}
                      className="block hover:text-teal-400 transition py-1"
                    >
                      Simulador Hipotecario
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 🌟 AQUÍ LLAMAMOS A LA FUNCIÓN EN MÓVIL */}
            <a 
              href="#contacto" 
              onClick={(e) => {
                e.preventDefault();
                setOpenMenu(false); // Cierra el menú hamburguesa
                setTimeout(() => {
                  customSmoothScroll('contacto', 1200); // <-- Velocidad parametrizada
                }, 150);
              }} 
              className="hover:text-teal-400 transition"
            >
              Contacto
            </a>
            
            <a href="https://alaluf.cl/mialaluf/" className="hover:text-teal-400 transition font-semibold">Mi Alaluf</a>

            <div className="flex items-center bg-white/10 px-4 py-2 rounded-xl mt-4">
              <input
                type="text"
                placeholder="Ingresar código"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                className="bg-transparent outline-none text-sm placeholder-gray-300 w-full"
              />
              <Search 
                size={18} 
                className="ml-2 opacity-70 cursor-pointer" 
                onClick={onSearch}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </nav>
);


/* =========================
   MAIN NAVBAR
========================= */
const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openToolsDropdown, setOpenToolsDropdown] = useState(false); 
  const [openMobileTools, setOpenMobileTools] = useState(false); 
  const [searchCode, setSearchCode] = useState(""); 
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchCode.trim()) {
      navigate(`/buscar?q=${searchCode.trim()}`);
      setSearchCode(""); 
      setOpenMenu(false); 
    }
  };

  return (
    <>
      <NavbarDesktop
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        openToolsDropdown={openToolsDropdown}
        setOpenToolsDropdown={setOpenToolsDropdown}
        searchCode={searchCode}
        setSearchCode={setSearchCode}
        onSearch={handleSearch}
      />
      <NavbarMobile
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        openMobileTools={openMobileTools}
        setOpenMobileTools={setOpenMobileTools}
        searchCode={searchCode}
        setSearchCode={setSearchCode}
        onSearch={handleSearch}
      />
    </>
  );
};

export default Navbar;