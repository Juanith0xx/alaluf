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
    visión experta
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
    Manejo de,<br></br>
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
      className="relative w-full py-15 bg-cover bg-center"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      {/* Overlay elegante */}
      <div className="absolute inset-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-46 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center text-white">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {/* Ícono en PNG */}
            <img
              src={stat.icon}
              alt={stat.title}
              className="mx-auto w-20 h-20 object-contain"
            />

            <h3 className="text-4xl md:text-5xl font-bold text-[#05FFEA] font-[Outfit]">
              <AnimatedNumber
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </h3>

            <p className="font-medium tracking-wide font-[Outfit] mb-1">{stat.title}</p>
            <p className="text-sm text-gray-400 font-[Outfit] ">{stat.subtitle}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
