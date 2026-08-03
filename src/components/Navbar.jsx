import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ChevronDown } from "lucide-react"; 
import logo from "../assets/Logo_A.png";
import { Link, useNavigate } from 'react-router-dom';

/* =========================
   UTILERÍA: SCROLL PERSONALIZADO (Mantenido por si lo usas en otros elementos)
========================= */
const customSmoothScroll = (targetId, duration = 1000) => {
  const target = document.getElementById(targetId);
  if (!target) return;

  const targetPosition = target.getBoundingClientRect().top + window.scrollY - 80;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      window.scrollTo(0, targetPosition); 
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
  <nav className="fixed w-full z-50 bg-black/50 text-white font-[Outfit] pt-8 hidden xl:block">
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

            <Link
              to="/nosotros"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-400 transition duration-300 font-medium"
            >
              Nosotros
            </Link>
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
                    <ul className="space-y-4 text-base font-medium pb-4">
                      <li className="relative cursor-pointer transition hover:text-teal-400 before:content-['>'] before:absolute before:-left-4 before:opacity-0 hover:before:opacity-100">
                        <Link to="/simulador-hipotecario" className="block w-full">Simulador Hipotecario</Link>
                      </li>
                    </ul>
                    <ul className="space-y-4 text-base font-medium">
                      <li className="relative cursor-pointer transition hover:text-teal-400 before:content-['>'] before:absolute before:-left-4 before:opacity-0 hover:before:opacity-100">
                        <Link to="/tasa-propiedad" className="block w-full">Valoriza tu Propiedad</Link>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 🌟 AQUÍ ESTÁ EL CAMBIO PARA ESCRITORIO: Navega directamente a /contacto */}
            <Link 
              to="/contacto" 
              className="hover:text-teal-400 transition duration-300 font-medium"
            >
              Contacto
            </Link>
          </div>

          <a
            href="https://alaluf.cl/mialaluf/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto hover:text-teal-400 transition duration-300 font-medium"
          >
            Mi Alaluf
          </a>
        </div>
      </div>

      <div className="hidden xl:flex items-center bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10 hover:border-teal-400/50 transition ml-10">
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
  openMenu,
  setOpenMenu,
  openMobileTools,
  setOpenMobileTools,
  openMobileServices,
  setOpenMobileServices,
  searchCode,
  setSearchCode,
  onSearch
}) => (
  <nav className="fixed inset-x-0 top-0 z-50 w-full bg-black/60 text-white font-[Outfit] backdrop-blur-md pt-[env(safe-area-inset-top)] xl:hidden">
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 md:px-8 lg:px-10">
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="Logo Alaluf"
          className="h-9 w-auto object-contain transition hover:opacity-80 sm:h-10 md:h-11"
        />
      </Link>
      <button
        type="button"
        onClick={() => setOpenMenu(!openMenu)}
        aria-label={openMenu ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={openMenu}
        className="flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-xl text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-teal-400/70"
      >
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
          className="absolute left-0 right-0 top-full max-h-[calc(100vh_-_4.5rem_-_env(safe-area-inset-top))] max-h-[calc(100dvh_-_4.5rem_-_env(safe-area-inset-top))] overflow-y-auto overscroll-contain border-t border-white/10 bg-black/90 px-4 pb-[calc(1.5rem_+_env(safe-area-inset-bottom))] backdrop-blur-2xl sm:px-6 md:px-8 lg:px-10"
        >
          <div className="mx-auto mt-3 flex w-full max-w-7xl flex-col gap-2 text-base sm:mt-4 sm:gap-3 md:gap-4">

            <div className="flex flex-col">
              <span 
                onClick={() => setOpenMobileServices(!openMobileServices)}
                className="flex min-h-11 cursor-pointer touch-manipulation items-center justify-between rounded-lg py-2 transition hover:text-teal-400">
                Servicios <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    openMobileServices
                      ? "rotate-180 text-teal-400"
                      : "opacity-70"
                  }`}
                />
              </span>
              <AnimatePresence>
                {openMobileServices && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-1 space-y-1 overflow-hidden border-l border-white/10 pl-4 text-sm font-medium sm:mt-2 sm:space-y-2 md:pl-6"
                  >
                    <Link
                      to="/licitaciones"
                      onClick={() => {
                        setOpenMenu(false);
                        setOpenMobileServices(false);
                      }}
                      className="block min-h-10 rounded-lg py-2 pr-2 transition hover:text-teal-400"
                    >
                      Licitaciones
                    </Link>

                    <Link
                      to="/industrial"
                      onClick={() => {
                        setOpenMenu(false);
                        setOpenMobileServices(false);
                      }}
                      className="block min-h-10 rounded-lg py-2 pr-2 transition hover:text-teal-400"
                    >
                      Industrial
                    </Link>

                    <Link
                      to="/terrenos_proyectos"
                      onClick={() => {
                        setOpenMenu(false);
                        setOpenMobileServices(false);
                      }}
                      className="block min-h-10 rounded-lg py-2 pr-2 transition hover:text-teal-400"
                    >
                      Terrenos para Proyectos
                    </Link>

                    <Link
                      to="/comercial"
                      onClick={() => {
                        setOpenMenu(false);
                        setOpenMobileServices(false);
                      }}
                      className="block min-h-10 rounded-lg py-2 pr-2 transition hover:text-teal-400"
                    >
                      Comercial
                    </Link>

                    <Link
                      to="/residencial"
                      onClick={() => {
                        setOpenMenu(false);
                        setOpenMobileServices(false);
                      }}
                      className="block min-h-10 rounded-lg py-2 pr-2 transition hover:text-teal-400"
                    >
                      Residencial
                    </Link>

                    <Link
                      to="/administracion-activo"
                      onClick={() => {
                        setOpenMenu(false);
                        setOpenMobileServices(false);
                      }}
                      className="block min-h-10 rounded-lg py-2 pr-2 transition hover:text-teal-400"
                    >
                      Administración de Arriendos
                    </Link>

                    <Link
                      to="/tasacion-activo"
                      onClick={() => {
                        setOpenMenu(false);
                        setOpenMobileServices(false);
                      }}
                      className="block min-h-10 rounded-lg py-2 pr-2 transition hover:text-teal-400"
                    >
                      Tasación de Activos
                    </Link>

                    <Link
                      to="/club_deals_inversiones"
                      onClick={() => {
                        setOpenMenu(false);
                        setOpenMobileServices(false);
                      }}
                      className="block min-h-10 rounded-lg py-2 pr-2 transition hover:text-teal-400"
                    >
                      Club Deals e Inversiones
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link
              to="/nosotros"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpenMenu(false)}
              className="flex min-h-11 items-center rounded-lg py-2 transition hover:text-teal-400"
            >
              Nosotros
            </Link>
            <a href="https://alaluf.cl/pressroom2.php" className="flex min-h-11 items-center rounded-lg py-2 transition hover:text-teal-400">Newsletter</a>
            
            <div className="flex flex-col">
              <span 
                onClick={() => setOpenMobileTools(!openMobileTools)} 
                className="flex min-h-11 cursor-pointer touch-manipulation items-center justify-between rounded-lg py-2 transition hover:text-teal-400">
                Herramientas <ChevronDown size={16} className={`transition-transform duration-200 ${openMobileTools ? "rotate-180 text-teal-400" : "opacity-70"}`} />
              </span>
              <AnimatePresence>
                {openMobileTools && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-1 space-y-1 overflow-hidden border-l border-white/10 pl-4 text-sm font-medium sm:mt-2 sm:space-y-2 md:pl-6"
                  >
                    <Link 
                      to="/simulador-hipotecario" 
                      onClick={() => { setOpenMenu(false); setOpenMobileTools(false); }}
                      className="block min-h-10 rounded-lg py-2 pr-2 transition hover:text-teal-400"
                    >
                      Simulador Hipotecario
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 🌟 AQUÍ ESTÁ EL CAMBIO PARA MÓVIL: Navega directamente y cierra el menú */}
            <Link 
              to="/contacto" 
              onClick={() => setOpenMenu(false)} 
              className="flex min-h-11 items-center rounded-lg py-2 transition hover:text-teal-400"
            >
              Contacto
            </Link>
            
            <a
              href="https://alaluf.cl/mialaluf/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpenMenu(false)}
              className="flex min-h-11 items-center rounded-lg py-2 font-semibold transition hover:text-teal-400"
            >
              Mi Alaluf
            </a>

            <div className="mt-3 flex min-w-0 items-center rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 sm:mt-4 md:max-w-md">
              <input
                type="text"
                placeholder="Ingresar código"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                className="min-w-0 w-full bg-transparent text-base outline-none placeholder-gray-300"
              />
              <Search 
                size={18} 
                className="ml-2 shrink-0 cursor-pointer opacity-70 transition hover:text-teal-400" 
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
  const [openMobileServices, setOpenMobileServices] = useState(false);
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
          openMobileServices={openMobileServices}
          setOpenMobileServices={setOpenMobileServices}
          searchCode={searchCode}
          setSearchCode={setSearchCode}
          onSearch={handleSearch}
      />
    </>
  );
};

export default Navbar;