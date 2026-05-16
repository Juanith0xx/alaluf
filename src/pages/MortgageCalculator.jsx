import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCalculator, FaCoins, FaPercent, FaCalendarAlt, FaBriefcase } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// IMPORTACIÓN DEL ASSET LOCAL
import fondoMarmol from '../assets/Marmol.jpg';

const VALOR_UF_REFERENCIAL = 38500; // Valor aproximado para la conversión en vivo
const VALOR_USD_REFERENCIAL = 950;   // Valor aproximado del dólars

const MortgageCalculator = () => {
  const navigate = useNavigate();

  // --- ESTADOS DE ENTRADA ---
  const [monedaActiva, setMonedaActiva] = useState("UF"); // UF, CLP, USD
  const [valorPropiedad, setValorPropiedad] = useState(5000); // Guardado interno siempre en UF
  const [inputValue, setInputValue] = useState(5000); // Lo que el usuario ve/escribe en el campo activo
  const [porcentajePie, setPorcentajePie] = useState(20); // %
  const [plazoAnios, setPlazoAnios] = useState(20); // Estado inicial en 20 años
  const [tasaInteres, setTasaInteres] = useState(4.5); // % anual

  // --- ESTADOS DE SALIDA ---
  const [montoCredito, setMontoCredito] = useState(0);
  const [montoPie, setMontoPie] = useState(0);
  const [dividendoUF, setDividendoUF] = useState(0);
  const [dividendoCLP, setDividendoCLP] = useState(0);
  const [rentaMinima, setRentaMinima] = useState(0);

  // Sincroniza el valor numérico del input cuando cambia la pestaña de moneda
  useEffect(() => {
    if (monedaActiva === "UF") {
      setInputValue(Math.round(valorPropiedad));
    } else if (monedaActiva === "CLP") {
      setInputValue(Math.round(valorPropiedad * VALOR_UF_REFERENCIAL));
    } else if (monedaActiva === "USD") {
      setInputValue(Math.round((valorPropiedad * VALOR_UF_REFERENCIAL) / VALOR_USD_REFERENCIAL));
    }
  }, [monedaActiva]);

  // Maneja el ingreso manual del usuario en el input único
  const handleInputChange = (val) => {
    setInputValue(val);
    if (monedaActiva === "UF") {
      setValorPropiedad(val);
    } else if (monedaActiva === "CLP") {
      setValorPropiedad(val / VALOR_UF_REFERENCIAL);
    } else if (monedaActiva === "USD") {
      setValorPropiedad((val * VALOR_USD_REFERENCIAL) / VALOR_USD_REFERENCIAL);
    }
  };

  // Sincroniza el input cuando el usuario mueve el control deslizante (Slider trabaja en UF)
  const handleSliderChange = (val) => {
    setValorPropiedad(val);
    if (monedaActiva === "UF") {
      setInputValue(Math.round(val));
    } else if (monedaActiva === "CLP") {
      setInputValue(Math.round(val * VALOR_UF_REFERENCIAL));
    } else if (monedaActiva === "USD") {
      setInputValue(Math.round((val * VALOR_UF_REFERENCIAL) / VALOR_USD_REFERENCIAL));
    }
  };

  // --- LÓGICA MATEMÁTICA FINANCIERA ---
  useEffect(() => {
    const pieCalculado = (valorPropiedad * porcentajePie) / 100;
    const creditoCalculado = valorPropiedad - pieCalculado;
    setMontoPie(pieCalculado);
    setMontoCredito(creditoCalculado);

    const tasaMensual = (tasaInteres / 100) / 12;
    const numeroMeses = plazoAnios * 12;

    if (tasaMensual === 0) {
      const divPure = creditoCalculado / numeroMeses;
      setDividendoUF(divPure);
      setDividendoCLP(divPure * VALOR_UF_REFERENCIAL);
      setRentaMinima(divPure * VALOR_UF_REFERENCIAL * 4);
    } else {
      const dividendoCalculado = 
        (creditoCalculado * tasaMensual * Math.pow(1 + tasaMensual, numeroMeses)) / 
        (Math.pow(1 + tasaMensual, numeroMeses) - 1);

      setDividendoUF(dividendoCalculado);
      const dividendoEnPesos = dividendoCalculado * VALOR_UF_REFERENCIAL;
      setDividendoCLP(dividendoEnPesos);
      setRentaMinima(dividendoEnPesos * 4);
    }
  }, [valorPropiedad, porcentajePie, plazoAnios, tasaInteres]);

  const formatCLP = (value) => {
    return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(value);
  };

  const formatUF = (value) => {
    return new Intl.NumberFormat("es-CL", { minimumFractionDigits: 0, maximumFractionDigits: 1 }).format(value);
  };

  const formatUSD = (value) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  };

  const fullSectionStyle = {
    backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.15), rgba(10, 10, 10, 0.15)), url(${fondoMarmol})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed' 
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-[Outfit]">
      <Navbar />

      {/* HEADER DE LA PÁGINA RESPONSIVO */}
      <div className="bg-[#111111] border-b border-white/5 pt-28 md:pt-32 pb-6 shadow-xl relative z-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 flex items-center gap-4 md:gap-8">
          <button onClick={() => navigate(-1)} className="p-3 md:p-4 border border-white/10 rounded-2xl hover:bg-[#24B6C1] transition-all flex-shrink-0">
            <FaArrowLeft className="text-sm md:text-base" />
          </button>
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black tracking-tighter uppercase italic truncate">
            Simulador Hipotecario Alaluf
          </h1>
        </div>
      </div>

      {/* ENVOLTORIO CON IMAGEN DE FONDO MÁRMOL */}
      <div style={fullSectionStyle} className="relative py-6 md:py-12 min-h-screen">
        
        {/* CONTENIDO CENTRAL: Grid responsivo de 1 columna en móvil y tablet, y 12 en desktop */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 relative z-10">
          
          {/* COLUMNA IZQUIERDA: CONTROLES / SLIDERS */}
          <div className="col-span-1 lg:col-span-7 space-y-6 md:space-y-8 bg-black/70 backdrop-blur-xl p-5 sm:p-6 md:p-8 rounded-3xl md:rounded-[40px] border border-white/10 shadow-2xl">
            
            {/* CONTROL 1: PRECIO DE LA PROPIEDAD */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <label className="text-xs uppercase font-bold tracking-widest text-gray-400 flex items-center gap-2">
                  <FaCoins className="text-[#24B6C1]" /> Precio de la Propiedad
                </label>
                
                {/* Selector de Monedas en formato de Pestañas Slim */}
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 self-start sm:self-auto">
                  {["UF", "CLP", "USD"].map((moneda) => (
                    <button
                      key={moneda}
                      onClick={() => setMonedaActiva(moneda)}
                      className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        monedaActiva === moneda 
                          ? "bg-[#24B6C1] text-white shadow-lg" 
                          : "text-white/40 hover:text-white"
                      }`}
                    >
                      {moneda}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Contenedor del Input Principal Único */}
              <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col focus-within:border-[#24B6C1] focus-within:ring-1 focus-within:ring-[#24B6C1] transition-all relative">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-center w-full">
                    {monedaActiva === "CLP" && <span className="text-2xl sm:text-3xl font-black text-[#24B6C1] mr-1">$</span>}
                    {monedaActiva === "USD" && <span className="text-2xl sm:text-3xl font-black text-[#24B6C1] mr-1">US$</span>}
                    <input 
                      type="number"
                      value={inputValue || ""}
                      onChange={(e) => handleInputChange(Number(e.target.value))}
                      placeholder="0"
                      className="bg-transparent text-2xl sm:text-3xl md:text-4xl font-black text-white w-full outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    {monedaActiva === "UF" && <span className="text-xl sm:text-2xl font-black text-[#24B6C1] ml-2">UF</span>}
                  </div>
                </div>

                {/* Equivalencias secundarias responsivas */}
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 pt-3 border-t border-white/5 text-[11px] sm:text-xs text-gray-400 font-medium">
                  {monedaActiva !== "UF" && <span>{formatUF(valorPropiedad)} UF</span>}
                  {monedaActiva !== "CLP" && <span>{formatCLP(valorPropiedad * VALOR_UF_REFERENCIAL)}</span>}
                  {monedaActiva !== "USD" && <span>{formatUSD((valorPropiedad * VALOR_UF_REFERENCIAL) / VALOR_USD_REFERENCIAL)}</span>}
                </div>
              </div>

              {/* Control deslizante (Slider) */}
              <input 
                type="range" min="1000" max="40000" step="100"
                value={valorPropiedad || 0} 
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#24B6C1]"
              />
              <div className="flex justify-between text-[9px] sm:text-[10px] text-gray-600 font-bold">
                <span>1.000 UF</span>
                <span className="hidden sm:inline">Rango de simulación flexible</span>
                <span>40.000 UF</span>
              </div>
            </div>

            {/* CONTROL 2: PORCENTAJE PIE */}
            <div className="space-y-4">
              <div className="flex justify-between items-end gap-2">
                <label className="text-xs uppercase font-bold tracking-widest text-gray-400 flex items-center gap-2">
                  <FaPercent className="text-[#24B6C1]" /> Pie inicial
                </label>
                <span className="text-xl sm:text-2xl font-black text-[#24B6C1] italic text-right whitespace-nowrap">
                  {porcentajePie}% <span className="text-xs sm:text-sm font-normal text-white/60">({formatUF(montoPie)} UF)</span>
                </span>
              </div>
              <input 
                type="range" min="10" max="50" step="5"
                value={porcentajePie} 
                onChange={(e) => setPorcentajePie(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#24B6C1]"
              />
              <div className="flex justify-between text-[9px] sm:text-[10px] text-gray-600 font-bold">
                <span>10% Mínimo</span>
                <span className="truncate">Monto Pie: {formatCLP(montoPie * VALOR_UF_REFERENCIAL)}</span>
                <span>50% Máximo</span>
              </div>
            </div>

            {/* CONTROL 3: PLAZO DE 5 A 40 AÑOS (Ajustado para tablets y móviles de forma compacta) */}
            <div className="space-y-4">
              <label className="text-xs uppercase font-bold tracking-widest text-gray-400 flex items-center gap-2 mb-2">
                <FaCalendarAlt className="text-[#24B6C1]" /> Plazo del Crédito (Años)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-4">
                {[5, 10, 15, 20, 25, 30, 35, 40].map((anios) => (
                  <button
                    key={anios}
                    onClick={() => setPlazoAnios(anios)}
                    className={`py-2.5 sm:py-3.5 rounded-xl font-bold transition-all text-xs ${
                      plazoAnios === anios 
                        ? "bg-[#24B6C1] text-white shadow-lg shadow-[#24B6C1]/20" 
                        : "bg-white/5 text-white/60 border border-white/5 hover:bg-white/10"
                    }`}
                  >
                    {anios} <span className="hidden xs:inline">Años</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CONTROL 4: TASA DE INTERÉS */}
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-end">
                <label className="text-xs uppercase font-bold tracking-widest text-gray-400 flex items-center gap-2">
                  <FaBriefcase className="text-[#24B6C1]" /> Tasa de Interés Estimada
                </label>
                <span className="text-xl sm:text-2xl font-black text-[#24B6C1] italic">
                  {tasaInteres}% <span className="text-xs sm:text-sm font-normal text-white/60">Anual</span>
                </span>
              </div>
              <input 
                type="range" min="2.0" max="7.0" step="0.1"
                value={tasaInteres} 
                onChange={(e) => setTasaInteres(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#24B6C1]"
              />
              <div className="flex justify-between text-[9px] sm:text-[10px] text-gray-600 font-bold">
                <span>2.0%</span>
                <span className="hidden sm:inline">Promedio de mercado actual</span>
                <span>7.0%</span>
              </div>
            </div>

          </div>

          {/* COLUMNA DERECHA: RESULTADOS EN TIEMPO REAL */}
          <div className="col-span-1 lg:col-span-5 space-y-6">
            
            {/* CUADRO DE DIVIDENDO ESTIMADO */}
            <div className="bg-gradient-to-br from-[#111111] to-[#1a1a1a] rounded-3xl md:rounded-[40px] p-6 sm:p-8 border border-white/10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-white hidden sm:block">
                <FaCalculator size={120} />
              </div>

              <span className="text-[10px] uppercase font-bold tracking-widest text-[#24B6C1] block mb-2">Dividendo Mensual Estimado</span>
              
              <div className="space-y-1">
                {/* text-3xl en móviles escala de forma segura a text-5xl en computadoras */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white italic break-words">
                  {formatCLP(dividendoCLP)}
                </h2>
                <span className="text-base sm:text-lg font-bold text-gray-400 block">
                  {formatUF(dividendoUF)} UF / mes
                </span>
              </div>

              <p className="text-[11px] text-gray-500 mt-4 leading-relaxed">
                * El valor en pesos es referencial calculado con una UF estimada a {formatCLP(VALOR_UF_REFERENCIAL)}. No incluye seguros obligatorios de desgravamen e incendio.
              </p>

              <div className="border-t border-white/10 mt-6 pt-6 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Monto a Financiar</span>
                  <span className="text-base sm:text-lg font-black text-white italic">{formatUF(montoCredito)} UF</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Financiamiento Neto</span>
                  <span className="text-base sm:text-lg font-black text-white italic">{100 - porcentajePie}%</span>
                </div>
              </div>
            </div>

            {/* CUADRO DE REQUISITO DE RENTA MÍNIMA */}
            <div className="bg-white text-black rounded-3xl md:rounded-[40px] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">Renta Mínima Sugerida</span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tighter text-gray-900 italic break-words">
                {formatCLP(rentaMinima)}
              </h3>
              <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                Los bancos e instituciones financieras exigen que el dividendo mensual no represente más del **25% de tus ingresos líquidos** mensuales totales.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default MortgageCalculator;