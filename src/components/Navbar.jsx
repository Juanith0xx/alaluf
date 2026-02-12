import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import logo from "../assets/Logo_A.png";

const NavbarDesktop = ({ openDropdown, setOpenDropdown }) => (
  <nav className="fixed w-full z-50 bg-black/50 text-white font-[Outfit] pt-8 hidden lg:block">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-start lg:items-center justify-between">
      {/* LEFT SIDE */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center flex-1">
        {/* Logo */}
        <a href="/" className="flex items-center -ml-3">
          <img
            src={logo}
            alt="Logo Alaluf"
            className="h-11 w-auto object-contain hover:opacity-80 transition"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-12 text-[15px] tracking-wide ml-auto">
          {/* Servicios Dropdown */}
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
                      Asesoría Inmobiliaria
                    </li>
                    <li className="relative cursor-pointer transition hover:text-teal-400 before:content-['>'] before:absolute before:-left-4 before:opacity-0 hover:before:opacity-100">
                      Gestión de Licitaciones
                    </li>
                    <li className="relative cursor-pointer transition hover:text-teal-400 before:content-['>'] before:absolute before:-left-4 before:opacity-0 hover:before:opacity-100">
                      Administración de Arriendos
                    </li>
                    <li className="relative cursor-pointer transition hover:text-teal-400 before:content-['>'] before:absolute before:-left-4 before:opacity-0 hover:before:opacity-100">
                      Tasación y Evaluación de Activos
                    </li>
                    <li className="relative cursor-pointer transition hover:text-teal-400 before:content-['>'] before:absolute before:-left-4 before:opacity-0 hover:before:opacity-100">
                      Inversiones Inmobiliarias
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="#" className="hover:text-teal-400 transition duration-300 font-medium">
            Nosotros
          </a>
          <a href="#" className="hover:text-teal-400 transition duration-300 font-medium">
            Newsletter
          </a>
          <a href="#" className="hover:text-teal-400 transition duration-300 font-medium">
            Contacto
          </a>
          <a
            href="https://alaluf.cl/mialaluf/"
            className="hover:text-teal-400 transition duration-300 font-medium"
          >
            Mi Alaluf
          </a>
        </div>
      </div>

      {/* Search */}
      <div className="hidden lg:flex items-center bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10 hover:border-teal-400/50 transition ml-20">
        <input
          type="text"
          placeholder="Ingresar código"
          className="bg-transparent outline-none text-sm placeholder-white w-32"
        />
        <Search size={18} className="ml-2 opacity-70" />
      </div>
    </div>
    <div className="border-b-1 border-white/70"></div>
  </nav>
);

const NavbarMobile = ({ openMenu, setOpenMenu }) => (
  <nav className="fixed w-full z-50 bg-black/60 text-white font-[Outfit] pt-6 lg:hidden">
    <div className="flex items-center justify-between px-6 py-4">
      {/* Logo */}
      <a href="/" className="flex items-center">
        <img
          src={logo}
          alt="Logo Alaluf"
          className="h-10 w-auto object-contain hover:opacity-80 transition"
        />
      </a>

      {/* Mobile Menu Button */}
      <button onClick={() => setOpenMenu(!openMenu)} className="text-white">
        {openMenu ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>

    {/* Mobile Menu */}
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
            <span className="cursor-pointer hover:text-teal-400 transition">
              Servicios
            </span>
            <a href="#" className="hover:text-teal-400 transition">Nosotros</a>
            <a href="#" className="hover:text-teal-400 transition">Newsletter</a>
            <a href="#" className="hover:text-teal-400 transition">Contacto</a>
            <a href="#" className="hover:text-teal-400 transition font-semibold">Mi Alaluf</a>

            {/* Mobile Search */}
            <div className="flex items-center bg-white/10 px-4 py-2 rounded-xl mt-4">
              <input
                type="text"
                placeholder="Ingresar código"
                className="bg-transparent outline-none text-sm placeholder-gray-300 w-full"
              />
              <Search size={18} className="ml-2 opacity-70" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </nav>
);

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <>
      <NavbarDesktop openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
      <NavbarMobile openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </>
  );
};

export default Navbar;
