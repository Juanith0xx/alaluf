import bg from "../assets/marmol.jpg"
import logo from "../assets/Logo_A.png"

const Footer = () => {
  return (
    <footer
      className="w-full bg-cover bg-center text-white font-[Outfit]"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-4 gap-12">

          {/* LOGO */}
          <div>
            <img src={logo} alt="Alaluf" className="h-10 mb-6" />

            <p className="text-white/70 leading-relaxed text-sm">
              Especialistas en propiedades industriales, comerciales y
              residenciales de alto valor desde 1994.
            </p>
          </div>

          {/* PROPIEDADES */}
          <div>
            <h4 className="font-semibold mb-6">
              Tipo de propiedades
            </h4>

            <ul className="space-y-3 text-white/60 text-sm">
              {[
                "Propiedades Industriales",
                "Bodegas y Galpones",
                "Locales Comerciales",
                "Oficinas Corporativas",
                "Residencial Alto Valor",
                "Terrenos y Licitaciones"
              ].map((item, i) => (
                <li key={i} className="hover:text-white transition cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* COBERTURA */}
          <div>
            <h4 className="font-semibold mb-6">
              Zonas de cobertura
            </h4>

            <ul className="space-y-3 text-white/60 text-sm">
              {[
                "Santiago Centro",
                "Las Condes",
                "Vitacura",
                "Quilicura",
                "Lampa",
                "Pudahuel",
                "Colina",
                "Región de Valparaíso",
                "Concepción",
                "La Serena"
              ].map((item, i) => (
                <li key={i} className="hover:text-white transition cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACTO */}
          <div>
            <h4 className="font-semibold mb-6">
              Contacto
            </h4>

            <div className="space-y-6 text-sm text-white/70">

              {/* Teléfono */}
              <div className="flex items-start gap-4">
                <div className="border border-[#24B6C1] p-2 rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#24B6C1"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M22 16.92V21a1 1 0 0 1-1.09 1A19.72 19.72 0 0 1 3 5.09 1 1 0 0 1 4 4h4.09a1 1 0 0 1 1 .75l.7 3.11a1 1 0 0 1-.27.95L8.09 10.91a16 16 0 0 0 6 6l2.1-1.43a1 1 0 0 1 .95-.27l3.11.7a1 1 0 0 1 .75 1z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-xs">Teléfono</p>
                  <p>+56 2 2345 6789</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="border border-[#24B6C1] p-2 rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#24B6C1"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-xs">E-mail</p>
                  <p>contacto@alaluf.cl</p>
                </div>
              </div>

              {/* Dirección */}
              <div className="flex items-start gap-4">
                <div className="border border-[#24B6C1] p-2 rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#24B6C1"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-xs">Oficina</p>
                  <p>
                    Av. Apoquindo 4775,<br />
                    Las Condes, Santiago
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Línea inferior */}
        <div className="border-t border-white/10 mt-16 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Alaluf. Todos los derechos reservados.
        </div>

      </div>
    </footer>
  )
}

export default Footer
