import { useState, useEffect } from "react";
import bg from "../assets/Marmol.jpg";
import logo from "../assets/Logo_A.png";
import { FaLinkedin, FaInstagram, FaYoutube, FaChartLine } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";

const Footer = () => {
  const [ufValue, setUfValue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUF = async () => {
      try {
        // Usamos api.gael.cloud para evitar problemas de CORS en local
        const response = await fetch("https://api.gael.cloud/general/public/monedas/UF");
        const data = await response.json();
        
        // La API gael devuelve el valor con coma, lo preparamos para el formateador
        const valor = parseFloat(data.Valor.replace('.', '').replace(',', '.'));
        
        const formatter = new Intl.NumberFormat("es-CL", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        
        setUfValue(formatter.format(valor));
      } catch (error) {
        console.error("Error consultando la UF:", error);
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
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Rejilla de 3 columnas */}
        <div className="grid md:grid-cols-3 gap-12">

          {/* COLUMNA 1: LOGO, REDES Y UF */}
          <div className="flex flex-col items-start">
            <img src={logo} alt="Alaluf" className="h-10 mb-8" />
            
            <div className="flex items-start gap-8">
              {/* Contenedor vertical para redes sociales */}
              <div className="flex flex-col gap-5">
                <a href="#" target="_blank" className="text-[#05FFEA] hover:text-white transition text-3xl">
                  <FaLinkedin />
                </a>
                <a href="#" target="_blank" className="text-[#05FFEA] hover:text-white transition text-3xl">
                  <FaInstagram />
                </a>
                <a href="#" target="_blank" className="text-[#05FFEA] hover:text-white transition text-3xl">
                  <FaYoutube />
                </a>
                <a href="#" target="_blank" className="text-[#05FFEA] hover:text-white transition text-3xl">
                  <FaSquareFacebook />
                </a>
              </div>

              {/* INDICADOR UF AL LADO DERECHO */}
              <div className="flex flex-col gap-2 mt-1">
                <div className="bg-[#24B6C1]/10 border border-[#24B6C1]/30 p-4 rounded-xl backdrop-blur-sm flex flex-col items-center justify-center min-w-[110px]">
                  <FaChartLine className="text-[#05FFEA] text-xl mb-2" />
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#05FFEA] font-bold text-center">
                    UF HOY
                  </span>
                  <span className="text-white font-bold text-sm mt-1 text-center">
                    {loading ? "..." : (ufValue ? `$${ufValue}` : "N/A")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA 2: PROPIEDADES */}
          <div>
            <h4 className="font-semibold mb-6 uppercase tracking-wider text-sm text-white">
              Tipo de propiedades
            </h4>
            <ul className="space-y-3 text-white/60 text-sm">
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
            <h4 className="font-semibold mb-6 uppercase tracking-wider text-sm text-white">
              Contacto
            </h4>
            <div className="space-y-6 text-sm text-white/70">
              <div className="flex items-start gap-4">
                <div className="border border-[#24B6C1] p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#24B6C1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M22 16.92V21a1 1 0 0 1-1.09 1A19.72 19.72 0 0 1 3 5.09 1 1 0 0 1 4 4h4.09a1 1 0 0 1 1 .75l.7 3.11a1 1 0 0 1-.27.95L8.09 10.91a16 16 0 0 0 6 6l2.1-1.43a1 1 0 0 1 .95-.27l3.11.7a1 1 0 0 1 .75 1z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-[10px] uppercase">Teléfono</p>
                  <p className="text-white/90">+56 2 2345 6789</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="border border-[#24B6C1] p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#24B6C1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-[10px] uppercase">E-mail</p>
                  <p className="text-white/90">contacto@alaluf.cl</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="border border-[#24B6C1] p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#24B6C1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-[10px] uppercase">Oficina</p>
                  <p className="text-white/90">Av. Apoquindo 4775,<br />Las Condes, Santiago</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Línea inferior: Copyright */}
        <div className="border-t border-white/10 mt-16 pt-8 text-center">
          <p className="text-xs text-white/40 tracking-wide">
            © {new Date().getFullYear()} Alaluf. Todos los derechos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;