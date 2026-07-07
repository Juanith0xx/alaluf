import imagen from "../assets/hero6.jpg";
import img2 from "../assets/imagen_1.png";

const InfoSection = () => {
  return (
    <section className="w-full bg-[#f3f3f3] py-12 md:py-20 overflow-hidden">
      {/* Ajustamos el padding y la separación vertical para distintos tamaños */}
      <div className="max-w-7xl mx-auto px-6 space-y-16 lg:space-y-32">

        {/* BLOQUE 1 */}
        {/* Cambiamos md:flex-row a lg:flex-row para que en tablet siga siendo columna */}
        <div className="relative flex flex-col lg:flex-row items-center">
          
          {/* El recuadro negro. Se posiciona absoluto solo en pantallas grandes (lg) */}
          <div className="bg-black text-white p-8 md:p-10 lg:p-12 rounded-sm shadow-2xl w-full lg:absolute lg:left-0 lg:w-[55%] xl:w-[700px] z-10 order-2 lg:order-1 -mt-10 lg:mt-0 relative">
            <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium font-[Outfit] mb-4">
              <span>Tienes un activo.</span><br />
              <span className="text-[#0091A4]">
                Alaluf lo gestiona con criterio y
                <br className="hidden lg:block" /> visión a futuro.
              </span>
            </h2>
            <p className="text-sm md:text-base lg:text-lg font-[Outfit] text-white/80 leading-relaxed mb-2 lg:mb-6">
              Tu propiedad merece más que un aviso en un portal. En Alaluf,
              cada propiedad entra como un activo y sale como una decisión
              bien tomada. Diseñamos contigo la estrategia correcta — para
              vender, arrendar, invertir, licitar o administrar con el resultado que
              mereces.
            </p>
          </div>

          {/* La imagen ocupa el 100% en móvil/tablet y el 50% en escritorio */}
          <div className="w-full lg:w-[60%] lg:ml-auto order-1 lg:order-2">
            <img
              src={img2}
              alt="Gestión de activos"
              className="w-full h-[300px] md:h-[450px] object-cover rounded-sm shadow-md"
            />
          </div>
        </div>

        {/* BLOQUE 2 */}
        <div className="relative flex flex-col lg:flex-row items-center">
          
          <div className="w-full lg:w-[60%]">
            <img
              src={imagen}
              alt="Contacto y asesoría"
              className="w-full h-[300px] md:h-[450px] object-cover rounded-sm shadow-md"
            />
          </div>

          <div className="bg-[#e9e9e9] p-8 md:p-10 lg:p-12 rounded-sm shadow-xl w-full lg:absolute lg:right-0 lg:w-[55%] xl:w-[650px] z-10 -mt-10 lg:mt-0 relative">
            {/* Quitamos whitespace-nowrap fijo para evitar desbordamientos en móvil */}
            <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium mb-4 text-gray-800 font-[Outfit] whitespace-normal sm:whitespace-nowrap">
              ¿Tienes alguna pregunta?
            </h2>
            <p className="text-sm md:text-lg lg:text-xl text-gray-600 leading-relaxed font-light mb-6 font-[Outfit]">
              <span className="font-bold text-black">Lo primero es entenderte a ti:</span> tus objetivos, tu 
              <br className="hidden md:block" /> situación y asesorarte en el camino más inteligente para
              <br className="hidden md:block" /> llegar donde quieres.
            </p>
            <a
  href="https://wa.me/56947714977?text=Hola,%20me%20gustaría%20más%20información%20sobre%20una%20propiedad."
  target="_blank"
  rel="noopener noreferrer"
  className="text-[#24B6C1] font-light text-lg md:text-xl font-[Outfit] flex items-center gap-2 hover:gap-3 transition-all cursor-pointer"
>
  INICIAR LA CONVERSACIÓN
</a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default InfoSection;