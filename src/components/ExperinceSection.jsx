import bg from "../assets/Marmol.jpg"
import imgThree from "../assets/ciudad.jpg"
import imgTwo from "../assets/Volcan.jpg"
import mapImage from "../assets/mapa.jpg"

// =========================================================================
// 1. IMPORTANTE: Reemplaza estas rutas con las rutas reales de tus archivos de logo.
// Asumimos que tienes una carpeta 'assets/logos/' dentro de 'src/'.
// Si no tienes los logos, puedes usar placeholders temporales como comento abajo.
// =========================================================================
import logoFalabella from "../assets/logos/falabella.png"
import logoCencosud from "../assets/logos/cencosud.png"
import logoSmu from "../assets/logos/smu.png"
import logoRipley from "../assets/logos/ripley.png"
import logoSodimac from "../assets/logos/sodimac.png"
import logoParqueArauco from "../assets/logos/parque.png"
// =========================================================================

const ExperienceSection = () => {
  return (
    <section className="w-full text-white overflow-hidden font-[Outfit]">

      {/* ========================= */}
      {/* BLOQUE 1 — EXPERIENCIA */}
      {/* ========================= */}
      <div
        className="relative py-28 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">

            {/* Número 32 */}
            <div className="flex-shrink-0 leading-none">
              <h1
                className="font-extrabold flex -space-x-1"
                style={{
                  fontSize: "clamp(160px, 25vw, 550px)",
                  lineHeight: "0.85",
                }}
              >
                <span
                  style={{
                    backgroundImage: `url(${imgThree})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  4
                </span>

                <span
                  style={{
                    backgroundImage: `url(${imgTwo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  5
                </span>
              </h1>
            </div>

            {/* Texto */}
            <div className="text-center md:text-left">
              <p className="text-xs md:text-sm tracking-[0.25em] text-[#24B6C1] font-bold mt-41">
                AÑOS JUNTO A LAS EMPRESAS MÁS <br></br>IMPORTANTES DE CHILE.
              </p>
              <p className="text-xs md:text-sm  text-white mt-2">
                Las empresas más importantes de Chile confían en<br></br>nuestro criterio.
              </p>
            </div>

          </div>

          {/* CLIENTES */}
          <div className="mt-24 text-center">
            <h3 className="text-[36px] font-medium tracking-widest">
              NUESTROS <span className="text-[#24B6C1]">CLIENTES</span>
            </h3>

            {/* IMPORTANTE: He actualizado la cuadrícula. 
              Usamos flexbox para centrar mejor logos de diferentes anchos. 
            */}
            <div className="flex flex-wrap justify-center items-center gap-12 mt-16 px-4">
              {[
                { name: "Grupo Falabella", logo: logoFalabella },
                { name: "Cencosud", logo: logoCencosud },
                { name: "SMU", logo: logoSmu },
                { name: "Ripley", logo: logoRipley },
                { name: "Sodimac", logo: logoSodimac },
                { name: "Parque Arauco", logo: logoParqueArauco }
              ].map((cliente, i) => (
                // El contenedor controla el tamaño máximo del logo y el efecto hover
                <div 
                  key={i} 
                  className="w-40 h-20 flex items-center justify-center opacity-60 hover:opacity-100 transition duration-300 cursor-pointer p-2"
                  title={cliente.name} // Muestra el nombre al pasar el mouse
                >
                  <img 
                    src={cliente.logo} 
                    alt={`Logo de ${cliente.name}`}
                    className="max-w-full max-h-full object-contain filter brightness-0 invert" 
                    // brightness-0 invert hace que el logo se vuelva blanco, ideal para fondos oscuros. 
                    // Quita estas clases si tus logos ya tienen color y quieres mantenerlo.
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ========================= */}
      {/* BLOQUE 2 — COBERTURA */}
      {/* ========================= */}
      <div className="bg-[#0f0f0f] py-10 px-6">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-center text-[36px] mb-32 tracking-widest font-medium">
            ESTAMOS <span className="text-[#24B6C1]">EN TODO CHILE</span>
          </h2>

          <div className="md:col-span-1 grid md:grid-cols-2 -mr-30 items-start">

            {/* IZQUIERDA — Imagen + Regiones */}
            <div className="grid md:grid-cols-2 gap-1 items-start">

              {/* Imagen */}
              <div>
                <img
                  src={mapImage}
                  alt="Mapa de cobertura en Chile"
                  className="w-[68%] object-cover rounded-3xl shadow-2xl -mt-28 "
                />
              </div>

              {/* Regiones */}
              <div className="text-white/60 space-y-4 -ml-14">
                <p className="font-semibold text-white mb-6">
                  Zonas de cobertura
                </p>

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
                ].map((zona, i) => (
                  <p key={i} className="text-sm hover:text-white transition">
                    {zona}
                  </p>
                ))}
              </div>

            </div>

           {/* DERECHA — Formulario */}
<div className="bg-white text-gray-800 rounded-tl-[80px] rounded-b-none p-12 shadow-2xl -mt-23 -ml-34">

  {/* Título */}
  <h2 className="text-2xl md:text-3xl font-medium mb-10 text-start font-[Outfit]">
    Lo primero es entenderte.
  </h2>

  <form className="space-y-8 font-[Outfit]">

    <div className="grid md:grid-cols-2 gap-4">

      {/* Tipo de propiedad */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">
          ¿Qué estás buscando?
        </label>
        <select className="w-full bg-white border border-gray-200 px-6 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2">
          <option>Selecciona</option>
          <option value="propiedad">Comprar una propiedad</option>
          <option value="licitar">Arrendar una propiedad</option>
          <option value="arriendo">Vender o arrendar lo que tengo</option>
          <option value="tasar">Asesoría de inversión</option>
          <option value="inversiones">Licitación o terreno </option>
          <option value="arriendo">Administración de arriendos</option>
          <option value="contacto">No sé por dónde empezar</option>
        </select>
      </div>

      {/* Nombre */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">
          Nombre completo*
        </label>
        <input
          type="text"
          placeholder="Tu nombre"
          className="w-full bg-white border border-gray-200 px-6 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">
          Correo electrónico *
        </label>
        <input
          type="email"
          placeholder="tu@email.com"
          className="w-full bg-white border border-gray-200 px-6 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2"
        />
      </div>

      {/* Teléfono */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">
          Teléfono
        </label>
        <input
          type="text"
          placeholder="+56 9 1234 5678"
          className="w-full bg-white border border-gray-200 px-6 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2"
        />
      </div>

      {/* Textarea */}
      <div className="md:col-span-2 space-y-2">
        <label className="text-sm font-semibold">
          Hablemos de lo que necesitas.
        </label>
        <textarea
          rows="5"
          placeholder="Cuéntanos qué tienes en mente — una propiedad, una inversión o simplemente una duda que quieres resolver."
          className="w-full bg-white border border-gray-200 px-4 py-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2"
        />
      </div>

    </div>

    {/* Botón */}
    <button
  type="submit"
  className="group bg-[#158F9B] hover:bg-[#127C86] text-white px-41 py-2.5 rounded-lg  text-sm font-light transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
  >
    <path d="M22 2L11 13" />
    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
  </svg>

  Iniciar Conversación
</button>


  </form>
</div>


          </div>

        </div>
      </div>

    </section>
  )
}

export default ExperienceSection