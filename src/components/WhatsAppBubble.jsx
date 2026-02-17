import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppBubble = () => {
  const phoneNumber = "569xxxxxxxx";

  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      setBounce(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setBounce(false), 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        fixed bottom-6 right-6 z-50 
        bg-[#25d366] hover:bg-green-600 
        text-white 
        rounded-full shadow-lg transition duration-500
        p-3 sm:p-4 md:p-4
        ${bounce ? "animate-bounce" : ""}
      `}
    >
      <FaWhatsapp className="text-xl sm:text-xl md:text-3xl" />
    </a>
  );
};

export default WhatsAppBubble;
