import imagen from "../assets/hero6.jpg";
import img2 from "../assets/imagen_1.png"; // Ya la tenías importada, ahora la usaremos

const InfoSection = () => {
  return (
    <section className="w-full bg-[#f3f3f3] py-12 md:py-15">
      <div className="max-w-7xl mx-auto px-6 space-y-20">

        {/* BLOQUE 1 - Usa "imagen" */}
        <div className="relative flex flex-col md:flex-row items-center gap-10">
          
          <div className="bg-black text-white p-8 md:p-12 rounded-sm shadow-2xl md:absolute md:left-0 md:w-[700px] z-10">
            <h2 className="text-2xl md:text-[36px] font-medium font-[Outfit] mb-4">
              <span>Tienes un activo.</span><br></br>
              <span className="text-[#0091A4]">Alaluf lo gestiona con criterio y
                <br></br> visión a futuro.</span>
            </h2>
            <p className="text-sm md:text-base font-[Outfit] text-white/80 leading-relaxed mb-6">
              Tu propiedad merece más que un aviso en un portal. En Alaluf,
              cada propiedad entra como un activo y sale como una decisión
              bien tomada. Diseñamos contigo la estrategia correcta — para
              vender, arrendar, invertir, licitar o administrar con el resultado que
              mereces.
            </p>
          </div>

          <div className="w-full md:w-[50%] md:ml-auto">
            <img
              src={img2} // PRIMERA IMAGEN
              alt="Gestión de activos"
              className="w-full h-[320px] md:h-[380px] object-cover"
            />
          </div>
        </div>

        {/* BLOQUE 2 - Usa "img2" */}
        <div className="relative flex flex-col md:flex-row items-center gap-10">
          
          <div className="w-full md:w-[56%]">
            <img
              src={imagen} // SEGUNDA IMAGEN (img2)
              alt="Contacto y asesoría"
              className="w-full h-[300px] md:h-[380px] object-cover"
            />
          </div>

          <div className="bg-[#e9e9e9] p-8 md:p-12 rounded-sm shadow-xl md:absolute md:right-0 md:w-[650px] z-10">
            <h2 className="text-2xl md:text-[36px] font-medium mb-4 text-gray-800 font-[Outfit] whitespace-nowrap">
              ¿Tienes alguna pregunta?
            </h2>
            <p className="text-sm md:text-xl text-gray-600 leading-relaxed font-light mb-6 font-[Outfit]">
              <span className="font-bold">Lo primero es entenderte a ti:</span> tus objetivos, tu
              situación y asesorarte en el camino más inteligente para
              llegar donde quieres.
            </p>
            <button className="text-[#24B6C1] font-light font-[Outfit] flex items-center gap-2 hover:gap-3 transition-all">
              INICIAR LA CONVERSACIÓN
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default InfoSection;