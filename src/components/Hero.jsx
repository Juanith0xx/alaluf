import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";


const images = [hero1, hero2, hero3];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // Cambio automático cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Imágenes */}
      <AnimatePresence>
        <motion.img
          key={current}
          src={images[current]}
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

      {/* Texto sobre hero */}
      <div className="absolute z-20 top-1/3 left-18  max-w-lg text-white">
        <h1 className="text-2xl mb-4 font-[Outfit]">
          <span className="text-[#0091A4]">INVERTIR</span> CON SEGURIDAD EMPIEZA CON UNA BUENA <span className="text-[#0091A4]">ASESORIA</span>
        </h1>
        <p className="mb-6 font-medium font-[Outfit] text-2xl">
          Experiencia sólida en el mercado <br></br>inmobiliario industrial.
        </p>
        <button className="px-6 py-2 border-[1px] border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors duration-300 font-[Outfit]">
  Ver Proyectos
</button>

      </div>

      {/* Indicadores laterales */}
      <div className="absolute left-5 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-cyan-400" : "bg-white/50"
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
