import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 🚩 FUNCIÓN DE SCROLL PERSONALIZADA
    const smoothScroll = (duration) => {
      const start = window.pageYOffset; // Posición actual
      const startTime = performance.now();

      // Función de "Easing" para que sea suave (Ease-in-out)
      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      const animateScroll = (currentTime) => {
        const timeElapsed = currentTime - startTime;
        const nextScroll = easeInOutQuad(timeElapsed, start, -start, duration);

        window.scrollTo(0, nextScroll);

        if (timeElapsed < duration) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    };

    // Puedes ajustar el número (800) para controlar la velocidad
    // 800ms = 0.8 segundos de duración total del trayecto.
    smoothScroll(800); 

  }, [pathname]);

  return null;
};

export default ScrollToTop;