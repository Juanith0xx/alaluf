import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import awardIcon from "../assets/icons/award.png";
import buildingIcon from "../assets/icons/building.png";
import usersIcon from "../assets/icons/users.png";
import trendingIcon from "../assets/icons/trending.png";
import refreshIcon from "../assets/icons/refresh.png"
import fondo from "../assets/Marmol.jpg";

const stats = [
  {
    icon: awardIcon,
    prefix: "+",
    value: 45,
    title: (
        <>
        AÑOS EN GESTIÓN<br></br> 
        INMOBILIARIA
        </>
    ),
    subtitle: <>
    Trayectoria y<br></br>
    criterio experto
    </>
  },
  {
    icon: buildingIcon,
    value: 2000,
    prefix: "+",
    title: (
        <>
        PROPIEDADES EN <br></br>
        CARTERA
        </>),

    subtitle: <>
    Manejo de<br></br>
    Multiactivos
    </>
  },
  {
    icon: usersIcon,
    prefix: "+",
    value: 450,
    
    title: (
        <>
        CLIENTES <br></br> 
        CORPORATIVOS
        </>
    ), 
    subtitle: <>
    Confían en<br></br>
    nosotros
    </>
  },
  {
    icon: trendingIcon,
    value: 1,
    prefix: "#",
    title:(
        <>
       LIDERES EN GESTIÓN <br></br> 
      INDUSTRIAL
        </>
    ),
     subtitle: <>
    Mercado<br></br>
    Nacional
    </>
  }, 
  {
    icon: refreshIcon ,
    value: 360,
    suffix: "°",
    title:(
        <>
       COBERTURA<br></br> 
      INMOBILIARIA
        </>
    ),
     subtitle: <>
    En todo Chile <br></br>
    conocemos el <br></br>
    potencial
    </>
  },
];

const AnimatedNumber = ({ value, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [visible, value]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section
      // 🌟 Ajustado py-12 en móviles, manteniendo py-15 en escritorio
      className="relative w-full py-12 lg:py-15 bg-cover bg-center"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      {/* Overlay elegante */}
      <div className="absolute inset-0" />

      {/* 🌟 AQUÍ ESTÁ LA MAGIA RESPONSIVA: 
          - px-6 para móvil, md:px-12 para tablet, lg:px-46 intacto para desktop.
          - gap-12 en móvil para dar respiro al apilarse, lg:gap-6 intacto. */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-46 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 sm:gap-10 lg:gap-6 text-center text-white">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {/* 🌟 Ícono ajustado: w-16 h-16 en móvil, w-20 h-20 en desktop */}
            <img
              src={stat.icon}
              alt="Icono Estadística"
              className="mx-auto w-16 h-16 lg:w-20 lg:h-20 object-contain"
            />

            <h3 className="text-4xl md:text-5xl font-bold text-[#05FFEA] font-[Outfit]">
              <AnimatedNumber
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </h3>

            {/* 🌟 Textos con ajustes fluidos para que no desborden en pantallas estrechas */}
            <p className="font-medium tracking-wide font-[Outfit] mb-1 text-[15px] lg:text-base leading-snug">
              {stat.title}
            </p>
            <p className="text-sm text-gray-400 font-[Outfit] leading-snug">
              {stat.subtitle}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;