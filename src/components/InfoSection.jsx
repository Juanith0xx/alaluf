import imagen from "../assets/hero6.jpg";
const InfoSection = () => {
  return (
    <section className="w-full bg-[#f3f3f3] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 space-y-20">

        {/* BLOQUE 1 */}
        <div className="relative flex flex-col md:flex-row items-center gap-10">
          
          {/* Card */}
          <div className="bg-black text-white p-8 md:p-12 rounded-sm shadow-2xl md:absolute md:left-0 md:w-[700px] z-10">
            <h2 className="text-2xl md:text-[36px] font-medium font-[Outfit] mb-4">
              Comercialice su propiedad
            </h2>
            <p className="text-sm md:text-base font-[Outfit] text-white/80 leading-relaxed mb-6">
              Desde casas rurales hasta oficinas en la ciudad, terrenos agrícolas y promociones de obra nueva,
              le ayudamos a encontrar el comprador ideal para su propiedad.
              Ya sea para vender, alquilar o simplemente averiguar el valor de su propiedad,
              actuaremos como su asesor.
            </p>
            <button className="text-[#05FFEA] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              MÁS INFORMACIÓN →
            </button>
          </div>

          {/* Imagen */}
          <div className="w-full md:w-[70%] md:ml-auto">
            <img
              src={imagen}
              alt="Propiedad"
              className="w-full h-[300px] md:h-[380px] object-cover"
            />
          </div>
        </div>
        {/* BLOQUE 2 */}
        <div className="relative flex flex-col md:flex-row items-center gap-10">
          
          {/* Imagen */}
          <div className="w-full md:w-[56%]">
            <img
              src={imagen}
              alt="Contacto"
              className="w-full h-[300px] md:h-[380px] object-cover"
            />
          </div>

          {/* Card */}
          <div className="bg-[#e9e9e9] p-8 md:p-12 rounded-sm shadow-xl md:absolute md:right-0 md:w-[650px] z-10">
            <h2 className="text-2xl md:text-[36px] font-medium mb-4 text-gray-800 font-[Outfit] whitespace-nowrap">
              ¿Tienes alguna pregunta?
            </h2>
            <p className="text-sm md:text-xl text-gray-600 leading-relaxed font-light mb-6 font-[Outfit]">
              Te escuchamos. Sean cuales sean tus ambiciones inmobiliarias,
              estamos aquí para ayudarte.
            </p>
            <button className="text-[#24B6C1] font-semibold font-[Outfit] flex items-center gap-2 hover:gap-3 transition-all">
              PONTE EN CONTACTO CON NOSOTROS →
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default InfoSection;
