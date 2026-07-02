import React, { useState, useEffect } from "react";
import bg from "../assets/Marmol.jpg";
import logo from "../assets/Logo_A.png";
import { 
  FaLinkedin, FaInstagram, FaYoutube, FaChartLine, 
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt 
} from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";

const Footer = () => {
  const [ufValue, setUfValue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUF = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        
        const response = await fetch(`${API_URL}/api/indicadores/uf`);
        const data = await response.json();
        
        if (data.success && data.valor) {
          const formatter = new Intl.NumberFormat("es-CL", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          
          setUfValue(formatter.format(data.valor));
        } else {
          setUfValue("N/A");
        }
      } catch (error) {
        console.error("Error consultando la UF interna:", error);
        setUfValue("N/A");
      } finally {
        setLoading(false);
      }
    };

    fetchUF();
  }, []);

  return (
    <footer
      className="w-full bg-cover bg-center text-white font-[Outfit]"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Ajuste de padding vertical: menor en móvil (py-12), estándar en desktop (py-20) */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 lg:py-20">

        {/* Rejilla: 1 columna en móvil, 2 en tablet (sm), 3 en desktop (lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">

          {/* COLUMNA 1: LOGO, REDES Y UF */}
          {/* En tablet, permitimos que esta columna ocupe el ancho completo arriba si se requiere, 
              pero con sm:col-span-1 mantendrá 2 columnas. */}
          <div className="flex flex-col items-start sm:col-span-2 lg:col-span-1 mb-4 lg:mb-0">
            <img src={logo} alt="Alaluf" className="h-8 md:h-10 mb-6 lg:mb-8" />
            
            {/* Contenedor flexible para alinear redes y UF. En móvil/tablet se envuelven (wrap) */}
            <div className="flex flex-wrap items-center lg:items-start gap-6 lg:gap-8">
              
              {/* Redes sociales: horizontales en móvil/tablet, verticales en escritorio */}
              <div className="flex flex-row lg:flex-col gap-4 lg:gap-5">
                <a href="https://www.linkedin.com/company/alaluf-propiedades/" target="_blank" rel="noopener noreferrer" className="text-[#05FFEA] hover:text-white transition text-2xl md:text-3xl">
                  <FaLinkedin />
                </a>
                <a href="https://www.instagram.com/alaluf.cl?igsh=MWxkd2N4djYxanZlNQ==" target="_blank" rel="noopener noreferrer" className="text-[#05FFEA] hover:text-white transition text-2xl md:text-3xl">
                  <FaInstagram />
                </a>
                <a href="https://www.youtube.com/channel/UCT0IvZYM3AaoSodAFkWM87w" target="_blank" rel="noopener noreferrer" className="text-[#05FFEA] hover:text-white transition text-2xl md:text-3xl">
                  <FaYoutube />
                </a>
                <a href="https://www.facebook.com/AlalufPropiedades/" target="_blank" rel="noopener noreferrer" className="text-[#05FFEA] hover:text-white transition text-2xl md:text-3xl">
                  <FaSquareFacebook />
                </a>
              </div>

              {/* INDICADOR UF */}
              <div className="flex flex-col gap-2">
                <div className="bg-[#24B6C1]/10 border border-[#24B6C1]/30 p-3 lg:p-4 rounded-xl backdrop-blur-sm flex flex-col items-center justify-center min-w-[110px]">
                  <FaChartLine className="text-[#05FFEA] text-lg lg:text-xl mb-1 lg:mb-2" />
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#05FFEA] font-bold text-center">
                    UF HOY
                  </span>
                  <span className="text-white font-bold text-xs lg:text-sm mt-1 text-center">
                    {loading ? "..." : (ufValue !== "N/A" ? `$${ufValue}` : "N/A")}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* COLUMNA 2: PROPIEDADES */}
          <div>
            <h4 className="font-semibold mb-4 lg:mb-6 uppercase tracking-wider text-sm text-white">
              Tipo de propiedades
            </h4>
            <ul className="space-y-2 lg:space-y-3 text-white/60 text-sm">
              {[
                "Licitaciones", "Industrial", "Comercial", "Residencial",
                "Administracion de Arriendo", "Tasación de Activos", "Club de Deals e Inversiones"
              ].map((item, i) => (
                <li key={i} className="hover:text-[#05FFEA] transition cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA 3: CONTACTO */}
          <div>
            <h4 className="font-semibold mb-4 lg:mb-6 uppercase tracking-wider text-sm text-white">
              Contacto
            </h4>
            <div className="space-y-5 lg:space-y-6 text-sm text-white/70">
              
              {/* Teléfono */}
              <div className="flex items-start gap-4">
                <div className="border border-[#24B6C1] p-2 rounded-lg text-[#24B6C1] shrink-0">
                  <FaPhoneAlt className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white/50 text-[10px] uppercase">Teléfono</p>
                  <p className="text-white/90">+56 2 2211 7800</p>
                  <p className="text-white/90">+56 9 4771 4977</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="border border-[#24B6C1] p-2 rounded-lg text-[#24B6C1] shrink-0">
                  <FaEnvelope className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white/50 text-[10px] uppercase">E-mail</p>
                  <p className="text-white/90 break-all">contacto@alaluf.cl</p>
                </div>
              </div>

              {/* Oficina */}
              <div className="flex items-start gap-4">
                <div className="border border-[#24B6C1] p-2 rounded-lg text-[#24B6C1] shrink-0">
                  <FaMapMarkerAlt className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white/50 text-[10px] uppercase">Oficina</p>
                  <p className="text-white/90">Av. Apoquindo 4499 - Piso 4,<br />Las Condes, Santiago</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-12 lg:mt-16 pt-6 lg:pt-8 text-center">
          <p className="text-xs text-white/40 tracking-wide">
            © {new Date().getFullYear()} Alaluf. Todos los derechos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;