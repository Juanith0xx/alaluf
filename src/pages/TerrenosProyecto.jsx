import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

// Importación de imágenes
import fondoterreno from '../assets/terreno_proyecto.png'; 
import fondoMarmol from '../assets/Marmol.jpg'; 

const TerrenoProyecto = () => {
  const navigate = useNavigate();
  
  // Estado para manejar la operación seleccionada ('arrendar' o 'comprar')
  const [operacion, setOperacion] = useState('arrendar');

  const handleVerPropiedades = () => {
    // Mapeamos el código de objetivo (obj=1 Comprar/Venta, obj=2 Arrendar)
    const objCodigo = operacion === 'comprar' ? '1' : '2';
    
    // 🛠️ Se cambia '7A' por '6' para que coincida con el ID de "Terreno Proyectos" de tu dataset original
    navigate(`/buscar?tipo_prop=6A&obj=${objCodigo}`);
  };

  return (
    // 🌟 SE APLICÓ 'font-[Outfit]' COMO TIPOGRAFÍA GLOBAL
    <main 
      className="w-full min-h-screen bg-cover bg-center bg-fixed font-[Outfit]"
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      
      {/* SECCIÓN HERO */}
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden border-b border-white/10">
        {/* Imagen de fondo principal */}
        <img 
          src={fondoterreno} 
          alt="Fondo Terreno Proyecto" 
          className="absolute inset-0 w-full h-full object-cover z-0" 
        />
        
        {/* Gradiente oscuro inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
        
        {/* Contenedor del Título posicionado por PORCENTAJE */}
        <div 
          className="absolute z-20 w-auto"
          style={{ 
            left: '8%',    
            bottom: '38%',  
          }}
        >
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase drop-shadow-lg">
            TERRENO PARA PROYECTO
          </h1>
        </div>
      </section>

      {/* SECCIÓN TEXTO INTRODUCTORIO */}
      <section className="container mx-auto px-6 py-16 md:py-24 max-w-7xl text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
          Inteligencia en Terrenos
        </h2>
        <p className="text-[#0091A4] text-xl font-semibold mb-10 max-w-5xl mx-auto leading-relaxed">
          Un terreno no vale por lo que es hoy, sino por lo que puede llegar a ser. Te ayudamos a ver su potencial y sus restricciones urbanísticas, porque ni lo más grande ni lo más barato define la verdadera oportunidad para tu proyecto.
        </p>
      </section>

      {/* BANNER CTA */}
      <section className="py-16 px-6 md:px-20">
        <div className="container mx-auto max-w-7xl mb-4">
          <div className="bg-[#0091A4] text-center text-white rounded-2xl p-10 md:p-14 flex flex-col items-center shadow-2xl transition-transform hover:scale-[1.01]">
            <h4 className="text-3xl md:text-4xl font-extrabold mb-4">
              No busques solo metros cuadrados. Busca potencial de desarrollo.
            </h4>
            <p className="text-lg md:text-xl font-medium max-w-4xl mb-8 leading-relaxed">
              Analizamos normativas, CIP, constructibilidad y plusvalía para que tu próximo terreno no sea solo un trozo de tierra — sea la base sólida de un gran proyecto.
            </p>
            
            {/* SELECTOR DE PESTAÑAS (COMPRAR / ARRENDAR) */}
            <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-xl flex items-center mb-8 border border-white/10 w-full max-w-[280px]">
              <button
                type="button"
                onClick={() => setOperacion('comprar')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${
                  operacion === 'comprar'
                    ? "bg-white text-[#0091A4] shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                Comprar
              </button>
              <button
                type="button"
                onClick={() => setOperacion('arrendar')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${
                  operacion === 'arrendar'
                    ? "bg-white text-[#0091A4] shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                Arrendar
              </button>
            </div>
            
            {/* Botón Principal de Acción */}
            <button 
              type="button"
              onClick={handleVerPropiedades}
              className="bg-white text-[#0091A4] hover:bg-gray-100 font-bold text-lg px-12 py-4 rounded-xl shadow-md transition duration-300 active:scale-95 cursor-pointer uppercase tracking-wider"
            >
              Ver terrenos para proyecto
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TerrenoProyecto;