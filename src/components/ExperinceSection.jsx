import bg from "../assets/Marmol.jpg"
import imgThree from "../assets/ciudad.jpg"
import imgTwo from "../assets/Volcan.jpg"
import mapImage from "../assets/mapa.jpg"
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
                  fontSize: "clamp(140px, 18vw, 360px)",
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
                  3
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
                  2
                </span>
              </h1>
            </div>

            {/* Texto */}
            <div className="text-center md:text-left">
              <p className="text-xs md:text-sm tracking-[0.25em] text-[#24B6C1] font-bold mt-41">
                AÑOS DE TRAYECTORIA COMPROBADA
              </p>
              <p className="text-xs md:text-sm tracking-[0.25em] text-white mt-1 font-bold">
                EN EL MERCADO CHILENO
              </p>
            </div>

          </div>

          {/* CLIENTES */}
          <div className="mt-24 text-center">
            <h3 className="text-lg tracking-widest font-bold">
              NUESTROS <span className="text-[#24B6C1]">CLIENTES</span>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-10 text-white/60 tracking-wider place-items-center">
              {[
                "Grupo Falabella",
                "Cencosud",
                "SMU",
                "Ripley",
                "Sodimac",
                "Parque Arauco"
              ].map((cliente, i) => (
                <span
                  key={i}
                  className="text-lg hover:text-white transition duration-300 cursor-pointer"
                >
                  {cliente}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ========================= */}
      {/* BLOQUE 2 — COBERTURA */}
      {/* ========================= */}
      <div className="bg-[#0f0f0f] py-28 px-6">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-center text-2xl  mb-20 tracking-widest font-bold">
            ESTAMOS <span className="text-[#24B6C1] font-bold">EN TODO CHILE</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-20 items-start">

            {/* IZQUIERDA — Imagen + Regiones */}
            <div className="grid md:grid-cols-2 gap-10 items-start">

              {/* Imagen */}
              <div>
                <img
                  src={mapImage}
                  alt="Mapa de cobertura en Chile"
                  className="w-full h-full object-cover rounded-3xl shadow-2xl -mt-20 "
                />
              </div>

              {/* Regiones */}
              <div className="text-white/60 space-y-4">
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
<div className="bg-white text-gray-800 rounded-[60px] p-14 shadow-2xl">

  <form className="space-y-8 font-[Outfit]">

    <div className="grid md:grid-cols-2 gap-4">

      {/* Tipo de propiedad */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">
          Tipo de propiedad
        </label>
        <select className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2">
          <option>Selecciona
          </option>
          <option value="residencial">Residencial</option>
          <option value="oficina">Oficina</option>
          <option value="retail">Retail</option>
          <option value="industrial">Industrial</option>
          <option value="terreno-proyecto">Terreno para Proyecto</option>
          <option value="administracion-arriendos">Administración de Arriendos</option>
        </select>
      </div>

      {/* Rango precio */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">
          Rango de precio (UF)
        </label>
        <input
          type="text"
          placeholder="Ej: 10.000 - 50.000"
          className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2"
        />
      </div>

      {/* Superficie */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">
          Superficie (m2)
        </label>
        <input
          type="text"
          placeholder="Ej: Mínimo 2.000 m2"
          className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2"
        />
      </div>

      {/* Nombre */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">
          Nombre completo*
        </label>
        <input
          type="text"
          placeholder="Tu nombre"
          className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2"
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
          className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2"
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
          className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2"
        />
      </div>

      {/* Textarea */}
      <div className="md:col-span-2 space-y-2">
        <label className="text-sm font-semibold">
          Cuéntanos tus requerimientos
        </label>
        <textarea
          rows="5"
          placeholder="Describe la propiedad que buscas, ubicación preferida, uso previsto, etc."
          className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2"
        />
      </div>

    </div>

    {/* Botón */}
    <button
  type="submit"
  className="group bg-[#158F9B] hover:bg-[#127C86] text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
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

  Enviar requerimiento
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
