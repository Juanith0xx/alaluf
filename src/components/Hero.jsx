import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Industrial from "../assets/Industrial.jpg";
import Comercial from "../assets/Comercial.jpg";
import Recidencial from "../assets/Residencial.jpg";
import Inversion from "../assets/Inversion.jpg";

const slides = [
  {
    image: Industrial,
    titulo: (
      <>
        <span className="text-[#0091A4] font-bold">ESPACIOS</span> INDUSTRIALES QUE <span className="text-[#0091A4] font-bold">IMPULSAN</span> TU OPERACION
      </>
    ),
    descripcion: "Más de 40 años conectando empresas con bodegas, centros logísticos y terrenos estratégicos en Chile.",
  },
  {
    image: Comercial,
    titulo: (
      <>
        <span className="text-[#0091A4]">UBICACIONES</span> COMERCIALES QUE POTENCIAN TU <span className="text-[#0091A4]">NEGOCIO</span>
      </>
    ),
    descripcion: "Asesoramos decisiones en oficinas, locales y activos comerciales de alto impacto.",
  },
  {
    image: Recidencial,
    titulo: (
      <>
        ENCUENTRA <span className="text-[#0091A4]">RESIDENCIALES</span> SEGURAS
      </>
    ),
    descripcion: "Hogares y apartamentos con excelente plusvalía.",
  },
  {
    image: Inversion,
    titulo: (
      <>
        MAXIMIZA TU <span className="text-[#0091A4]">INVERSION</span>
      </>
    ),
    descripcion: "Asesoría completa para inversiones inteligentes.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // Cambio automático cada 8 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  // Variantes para animación de texto
  const textVariants = {
    hidden: { x: -50, opacity: 0 },   // empieza desde la izquierda
    visible: { x: 0, opacity: 1, transition: { duration: 1 } },
    exit: { x: 50, opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Imágenes */}
      <AnimatePresence>
        <motion.img
          key={current}
          src={slides[current].image}
          alt="Hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Overlay de color oscuro para texto */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>

      {/* Texto sobre hero con animación */}
      <motion.div
        className="absolute z-20 top-1/3 left-18 max-w-lg text-white"
        key={current}
        variants={textVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className="text-2xl mb-4 font-[Outfit]">{slides[current].titulo}</h1>
        <p className="mb-6 font-medium font-[Outfit] text-2xl">{slides[current].descripcion}</p>
        <button className="px-6 py-2 border-[1px] border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors duration-300 font-[Outfit]">
          Ver Proyectos
        </button>
      </motion.div>

      {/* Indicadores laterales */}
      <div className="absolute left-5 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === current ? "bg-cyan-400" : "bg-white/50"}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
