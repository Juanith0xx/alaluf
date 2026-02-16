import { useState, useEffect } from "react";
import { MapPin, Move, ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import fondo from "../assets/Marmol.jpg";
import propiedadImg from "../assets/hero2.jpg";
import propiedadImg2 from "../assets/hero3.jpg";
import propiedadImg3 from "../assets/hero4.jpg";

const EspecialPorArea = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Residencial");

  const tabs = ["Residencial", "Terrenos", "Industrial", "Comercial", "Licitaciones"];

  const cards = [
    {
      tipo: "Comercial",
      titulo: "Local Comercial Premium",
      ubicacion: "Vitacura, Santiago",
      size: "420 m2",
      precio: "18.000 UF",
      img: propiedadImg,
    },
    {
      tipo: "Residencial",
      titulo: "Departamento Alto Estándar",
      ubicacion: "Las Condes, Santiago",
      size: "180 m2",
      precio: "12.500 UF",
      img: propiedadImg3,
    },
    {
      tipo: "Terreno",
      titulo: "Terreno Estratégico",
      ubicacion: "Peñalolén, Santiago",
      size: "2.000 m2",
      precio: "25.000 UF",
      img: propiedadImg2,
    },
  ];

  // Auto-play cada 8 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(interval);
  }, [cards.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  const getIndex = (index) => (index + cards.length) % cards.length;

  return (
    <section
      className="relative py-20 bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Barra de Tabs con líneas */}
        <div className="relative flex items-center justify-center mb-8 font-[Outfit] text-sm md:text-base">
          {/* Línea izquierda */}
          <div className="absolute -left-50 top-1/2 -translate-y-1/2 h-[1px] bg-[#05FFEA] w-[44%]"></div>

          {/* Tabs */}
          <div className="relative flex gap-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`transition pb-1 ${
                  activeTab === tab
                    ? "text-cyan-400 font-semibold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Línea derecha */}
          <div className="absolute -right-50 top-1/2 -translate-y-1/2 h-[1px] bg-[#05FFEA] w-[44%]"></div>
        </div>

        {/* Título principal */}
        <div className="text-center mb-12 font-[Outfit]">
          <h2 className="text-2xl md:text-3xl font-light text-[#0091A4]">
            ESPECIAL POR ÁREA
          </h2>
          <p className="text-gray-300">
            Propiedades seleccionadas por nuestro equipo
          </p>
        </div>

        {/* Carrusel */}
        <div className="relative flex items-center justify-center gap-6">
          {/* Flecha izquierda */}
          <button
            onClick={handlePrev}
            className="hidden md:flex absolute -left-16 text-cyan-400 hover:scale-110 transition"
          >
            <ArrowLeft size={36} />
          </button>

          {[-1, 0, 1].map((offset) => {
            const index = getIndex(activeIndex + offset);
            const isActive = offset === 0;

            return (
              <motion.div
                key={index}
                initial={{ scale: 0.85, opacity: 0.6 }}
                animate={{
                  scale: isActive ? 1.25 : 0.85,
                  opacity: isActive ? 1 : 0.6,
                  y: isActive ? -20 : 0,
                }}
                transition={{ duration: 0.5 }}
                className={`flex flex-col md:flex-row shadow-2xl overflow-hidden relative ${
                  isActive
                    ? "z-20 md:w-[480px]"
                    : "z-10 md:w-[300px] grayscale"
                }`}
              >
                {/* Imagen */}
                <div className="relative w-full md:w-1/2">
                  <img
                    src={cards[index].img}
                    alt="Propiedad"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 left-4 bg-white text-black text-sm px-4 py-1 font-medium font-[Outfit]">
                    {cards[index].tipo}
                  </span>
                </div>

                {/* Panel derecho */}
                <div className="md:w-1/2 bg-[#3a3a3a]/95 p-6 flex flex-col justify-center font-[Outfit]">
                  <h3 className="text-lg md:text-xl font-semibold mb-4">
                    {cards[index].titulo}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-300 mb-2">
                    <MapPin size={18} className="text-cyan-400" />
                    {cards[index].ubicacion}
                  </div>

                  <div className="flex items-center gap-2 text-gray-300 mb-6">
                    <Move size={18} className="text-cyan-400" />
                    {cards[index].size}
                  </div>

                  <div className="w-full h-[1px] bg-cyan-400 mb-6"></div>

                  <div className="mb-6">
                    <p className="text-gray-300">Precio</p>
                    <p className="text-cyan-400 text-xl font-semibold">
                      {cards[index].precio}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <button className="flex-1 border border-cyan-400 text-white py-2 hover:bg-cyan-400/10 transition">
                      Ver ficha
                    </button>
                    <button className="p-2 border border-cyan-400 hover:bg-cyan-400/10 transition">
                      <Phone size={20} className="text-cyan-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Flecha derecha */}
          <button
            onClick={handleNext}
            className="hidden md:flex absolute -right-16 text-cyan-400 hover:scale-110 transition"
          >
            <ArrowRight size={36} />
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-3 mt-6">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === activeIndex ? "bg-[#05FFEA]" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EspecialPorArea;
