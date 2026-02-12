import { useState } from "react";
import { MapPin, Move, ArrowLeft, ArrowRight, Phone } from "lucide-react";
import fondo from "../assets/Marmol.jpg";
import propiedadImg from "../assets/hero2.jpg";

const EspecialPorArea = () => {
  const [activeTab, setActiveTab] = useState("Comercial");

  const tabs = [
    "Residencial",
    "Terrenos",
    "Industrial",
    "Comercial",
    "Licitaciones",
  ];

  return (
    <section
      className="relative py-20 bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ================= TABS CON LÍNEAS ================= */}
        <div className="relative flex items-center justify-center mb-12">

          {/* Línea izquierda */}
          <div className="absolute -left-38 top-1/2 -translate-y-1/2 h-[1px] bg-cyan-400 w-[42%]"></div>

          {/* Tabs */}
          <div className="relative flex gap-8 text-sm md:text-base font-medium font-[Outfit] px-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-2 transition ${
                  activeTab === tab
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {tab}

                {/* Línea debajo del activo */}
                
              </button>
            ))}
          </div>

          {/* Línea derecha */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] bg-cyan-400 w-[35%]"></div>
        </div>

        {/* ================= TÍTULO ================= */}
        <div className="text-center mb-12 font-[Outfit]">
          <h2 className="text-2xl md:text-3xl font-semibold text-cyan-400">
            ESPECIAL POR ÁREA
          </h2>
          <p className="text-gray-300 mt-2">
            Propiedades seleccionadas por nuestro equipo
          </p>
        </div>

        {/* ================= CARD ================= */}
        <div className="relative flex flex-col md:flex-row items-center justify-center">

          {/* Flecha izquierda */}
          <button className="hidden md:flex absolute -left-16 text-cyan-400 hover:scale-110 transition">
            <ArrowLeft size={36} />
          </button>

          <div className="flex flex-col md:flex-row max-w-4xl w-full shadow-2xl">

            {/* Imagen */}
            <div className="relative md:w-1/2">
              <img
                src={propiedadImg}
                alt="Propiedad"
                className="w-full h-full object-cover"
              />

              <span className="absolute top-4 left-4 bg-white text-black text-sm px-4 py-1 rounded-full font-medium font-[Outfit]">
                Comercial
              </span>
            </div>

            {/* Panel derecho */}
            <div className="md:w-1/2 bg-[#3a3a3a]/95 p-8 flex flex-col justify-center font-[Outfit]">

              <h3 className="text-xl md:text-2xl font-semibold mb-4">
                Local Comercial Premium
              </h3>

              <div className="flex items-center gap-2 text-gray-300 mb-2">
                <MapPin size={18} className="text-cyan-400" />
                Vitacura, Santiago
              </div>

              <div className="flex items-center gap-2 text-gray-300 mb-6">
                <Move size={18} className="text-cyan-400" />
                420 m2
              </div>

              <div className="w-full h-[1px] bg-cyan-400 mb-6"></div>

              <div className="mb-6">
                <p className="text-gray-300">Precio</p>
                <p className="text-cyan-400 text-xl font-semibold">
                  18.000 UF
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button className="flex-1 border border-cyan-400 text-white py-3 rounded-lg hover:bg-cyan-400/10 transition">
                  Ver ficha
                </button>

                <button className="p-3 border border-cyan-400 rounded-lg hover:bg-cyan-400/10 transition">
                  <Phone size={20} className="text-cyan-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Flecha derecha */}
          <button className="hidden md:flex absolute -right-16 text-cyan-400 hover:scale-110 transition">
            <ArrowRight size={36} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default EspecialPorArea;
