import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
// import { UploadCloud } from "lucide-react"; // Descomentar si se vuelve a usar el Paso 3
import bgMarmol from '../assets/Marmol.jpg';

// 🌟 FUNCIÓN DE VALIDACIÓN DE RUT CHILENO
const validateRut = (rut) => {
  if (!rut) return false;
  const cleanRut = rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase();
  if (cleanRut.length < 2) return false;
  
  const result = cleanRut.slice(-1);
  const body = cleanRut.slice(0, -1);
  
  let suma = 0;
  let multiplo = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    suma += multiplo * parseInt(body.charAt(i), 10);
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }
  
  let dv = 11 - (suma % 11);
  if (dv === 11) dv = 0;
  if (dv === 10) dv = 'K';
  
  return dv.toString() === result;
};

// 🌟 FUNCIÓN PARA FORMATEAR EL RUT CON PUNTOS Y GUION
const formatRut = (rut) => {
  let clean = rut.replace(/[^0-9kK]/ig, '').toUpperCase();
  if (clean.length === 0) return '';
  if (clean.length === 1) return clean;
  let body = clean.slice(0, -1);
  let dv = clean.slice(-1);
  body = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${body}-${dv}`;
};

const PublishPropertyForm = () => {
  const [step, setStep] = useState(1);
  const [rutError, setRutError] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    email: '',
    telefono: '',
    comentarios: '',
    direccion: '',
    ciudad: '',
    tipoPropiedad: '',
    superficie: '',
    precio: ''
    // fotos: [] // Descomentar si se usa el Paso 3
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'rut') {
      const formattedRut = formatRut(value);
      setFormData(prev => ({ ...prev, rut: formattedRut }));
      
      if (rutError && validateRut(formattedRut)) {
        setRutError(false);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleRutBlur = () => {
    if (formData.rut.length > 0 && !validateRut(formData.rut)) {
      setRutError(true);
    } else {
      setRutError(false);
    }
  };

  /* // 🌟 FUNCIONES PARA EL PASO 3 (COMENTADAS HASTA QUE SE DESCOMENTE EL PASO)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, fotos: [...prev.fotos, ...files] }));
  };

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      fotos: prev.fotos.filter((_, i) => i !== index)
    }));
  }; */

  const nextStep = () => {
    if (step === 1) {
      if (!formData.nombre.trim() || !formData.rut || !formData.email.trim()) {
        alert("Por favor, completa los campos obligatorios del cliente.");
        return;
      }
      if (!validateRut(formData.rut)) {
        setRutError(true);
        alert("El RUT ingresado no es válido.");
        return;
      }
    }

    if (step === 2) {
      const { direccion, ciudad, tipoPropiedad, superficie, precio } = formData;
      const superficieValida = String(superficie).trim() !== '' && Number(superficie) > 0;

      if (
        !direccion.trim() ||
        !ciudad.trim() ||
        !tipoPropiedad ||
        !superficieValida ||
        !precio.trim()
      ) {
        alert("Por favor, completa todos los datos de la propiedad.");
        return;
      }
    }
    
    // NOTA: Si descomentas el paso 3, cambia el Math.min(prev + 1, 2) a Math.min(prev + 1, 3)
    setStep(prev => Math.min(prev + 1, 2));
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  // 🌟 BLOQUEO DEL ENTER PREMATURO
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      // Cambiar a step < 3 si descomentas el paso de fotos
      if (step < 2) {
        nextStep();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cambiar a step !== 3 si descomentas el paso de fotos
    if (step !== 2) return;

    try {
      // 🌟 INTEGRACIÓN HACIA TU BACKEND / CRM
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      const response = await fetch(`${API_URL}/api/propiedades/publicar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("¡Propiedad enviada al CRM con éxito!");
        setStep(1);
        setFormData({ 
          nombre: '', rut: '', email: '', telefono: '', 
          comentarios: '', direccion: '', ciudad: '', 
          tipoPropiedad: '', superficie: '', precio: '' 
          // fotos: [] // Descomentar si se usa el Paso 3
        });
      } else {
        const errorData = await response.json();
        alert("Ocurrió un error al subir la propiedad: " + (errorData.mensaje || errorData.error));
      }

    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Error de conexión con el servidor. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <div 
      className="w-full min-h-screen flex items-center justify-center py-6 sm:py-12 px-2 sm:px-4"
      style={{ 
        backgroundImage: `url(${bgMarmol})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="w-full max-w-4xl mx-auto bg-white p-4 sm:p-8 md:p-12 my-4 sm:my-10 rounded-[40px] sm:rounded-[80px] border border-gray-200 shadow-2xl font-[Outfit] text-gray-800">
        
        {/* ENCABEZADO */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide uppercase text-gray-800">
            ¿Quieres vender o arrendar?
          </h2>
          <p className="text-base sm:text-xl md:text-2xl font-bold text-gray-700 mt-2">
            Publica hoy tu propiedad en Alaluf
          </p>
          <p className="text-gray-400 font-medium text-xs sm:text-sm md:text-base mt-3 sm:mt-4 max-w-2xl mx-auto leading-relaxed">
            Es simple y seguro, completa tus datos y los de tu propiedad. Nos pondremos en contacto contigo a la brevedad.
          </p>
        </div>

        {/* NAVEGACIÓN DE PASOS (TABS) - INCLUYE EL PASO 3 PERO ESTÁ VISUALMENTE PINTADO DE GRIS OMITIENDO LA CONDICIÓN */}
        <div className="flex flex-col sm:flex-row w-full mb-6 sm:mb-10 border border-gray-300 rounded-3xl sm:rounded-full overflow-hidden bg-white">
          {['1. DATOS CLIENTE', '2. DATOS PROPIEDAD'].map((label, index) => {
            const stepIndex = index + 1;
            const isActive = step === stepIndex;
            return (
              <div 
                key={index} 
                className={`flex-1 text-center py-3 text-xs sm:text-sm font-bold transition-colors ${
                  isActive 
                    ? 'bg-[#4a4a4a] text-white' 
                    : 'bg-white text-gray-500 border-b last:border-b-0 sm:border-b-0 sm:border-r border-gray-300 last:border-r-0'
                }`}
              >
                {label}
              </div>
            );
          })}
        </div>

        {/* CUERPO DEL FORMULARIO */}
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} noValidate className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            
            {/* PASO 1 */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 sm:space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="text-sm sm:text-[15px] font-bold text-black block mb-1 sm:mb-2">Nombre completo*</label>
                    <input 
                      type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} 
                      className="w-full bg-white border border-gray-200 rounded-lg p-3 sm:p-3.5 text-sm sm:text-[15px] text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                    />
                  </div>

                  <div>
                    <label className="text-sm sm:text-[15px] font-bold text-black block mb-1 sm:mb-2">Rut*</label>
                    <input 
                      type="text" name="rut" value={formData.rut} onChange={handleInputChange} onBlur={handleRutBlur} maxLength="12"
                      className={`w-full bg-white border rounded-lg p-3 sm:p-3.5 text-sm sm:text-[15px] text-gray-800 placeholder-gray-300 focus:outline-none transition ${
                        rutError ? 'border-red-500 ring-2 ring-red-500/20' : 'border-gray-200 focus:ring-2 focus:ring-gray-300'
                      }`}
                    />
                    {rutError && <p className="text-xs text-red-500 mt-1.5 font-medium">RUT inválido. Revisa el formato.</p>}
                  </div>

                  <div>
                    <label className="text-sm sm:text-[15px] font-bold text-black block mb-1 sm:mb-2">Correo electrónico *</label>
                    <input 
                      type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="tu@email.com" 
                      className="w-full bg-white border border-gray-200 rounded-lg p-3 sm:p-3.5 text-sm sm:text-[15px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                    />
                  </div>

                  <div>
                    <label className="text-sm sm:text-[15px] font-bold text-black block mb-1 sm:mb-2">Teléfono*</label>
                    <input 
                      type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} placeholder="+56 9 1234 5678" 
                      className="w-full bg-white border border-gray-200 rounded-lg p-3 sm:p-3.5 text-sm sm:text-[15px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                    />
                  </div>
                </div>

                <div className="pt-1 sm:pt-2">
                  <textarea 
                    name="comentarios" value={formData.comentarios} onChange={handleInputChange}
                    placeholder="Cuéntanos qué tienes en mente..."
                    className="w-full bg-white border border-gray-200 rounded-lg p-3 sm:p-4 text-sm sm:text-[15px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition min-h-[80px] sm:min-h-[100px] resize-none"
                  />
                </div>
              </motion.div>
            )}

            {/* PASO 2 */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 sm:space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="sm:col-span-2">
                    <label className="text-sm sm:text-[15px] font-bold text-black block mb-1 sm:mb-2">Dirección de la Propiedad *</label>
                    <input 
                      type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} placeholder="Calle, número, depto..." 
                      className="w-full bg-white border border-gray-200 rounded-lg p-3 sm:p-3.5 text-sm sm:text-[15px] text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                    />
                  </div>

                  <div>
                    <label className="text-sm sm:text-[15px] font-bold text-black block mb-1 sm:mb-2">Ciudad *</label>
                    <input 
                      type="text" name="ciudad" value={formData.ciudad} onChange={handleInputChange} placeholder="Ej. Santiago, La Serena..." 
                      className="w-full bg-white border border-gray-200 rounded-lg p-3 sm:p-3.5 text-sm sm:text-[15px] text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                    />
                  </div>

                  <div>
                    <label className="text-sm sm:text-[15px] font-bold text-black block mb-1 sm:mb-2">Tipo de Propiedad *</label>
                    <select 
                      name="tipoPropiedad" value={formData.tipoPropiedad} onChange={handleInputChange}
                      className="w-full bg-white border border-gray-200 rounded-lg p-3 sm:p-3.5 text-sm sm:text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 transition cursor-pointer"
                    >
                      <option value="">Seleccionar opción</option>
                      <option value="Oficina">Oficina</option>
                      <option value="Local Comercial">Local Comercial</option>
                      <option value="Casa Comercial">Casa Comercial</option>
                      <option value="Galpon / Bodega">Galpón | Bodegas</option>
                      <option value="Terrenos Industriales">Terrenos Industriales</option>
                      <option value="Terrenos Proyecto">Terrenos para Proyectos</option>
                      <option value="Departamento">Departamento</option>
                      <option value="Casa">Casa</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm sm:text-[15px] font-bold text-black block mb-1 sm:mb-2">Superficie M2 *</label>
                    <input 
                      type="text"
                      inputMode="numeric"
                      name="superficie" value={formData.superficie} onChange={handleInputChange} placeholder="0.00" 
                      className="w-full bg-white border border-gray-200 rounded-lg p-3 sm:p-3.5 text-sm sm:text-[15px] text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                    />
                  </div>

                  <div>
                    <label className="text-sm sm:text-[15px] font-bold text-black block mb-1 sm:mb-2">Precio *</label>
                    <input 
                      type="text" name="precio" value={formData.precio} onChange={handleInputChange} placeholder="Ej: 5000 UF / $150.000.000" 
                      className="w-full bg-white border border-gray-200 rounded-lg p-3 sm:p-3.5 text-sm sm:text-[15px] text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* 🌟 PASO 3 (FOTOS) - COMENTADO PARA DESHABILITARLO VISUAL Y FUNCIONALMENTE */}
            {/* {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 sm:space-y-6 text-center"
              >
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 sm:p-10 bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer relative group">
                  <input 
                    type="file" multiple onChange={handleFileChange} 
                    className="absolute inset-0 opacity-0 cursor-pointer z-20" 
                  />
                  <UploadCloud className="mx-auto text-gray-400 mb-2 sm:mb-4 group-hover:scale-110 transition-transform" size={40} />
                  <p className="text-sm sm:text-base font-bold text-gray-700 mb-1">Seleccionar archivo</p>
                  <p className="text-xs sm:text-sm text-gray-400">o arrastra y suelta fotos/videos aquí</p>
                </div>

                {formData.fotos.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6 max-h-40 overflow-y-auto pr-2">
                    {formData.fotos.map((file, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm">
                        <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          type="button" onClick={() => removePhoto(index)}
                          className="absolute top-1 right-1 bg-red-500/90 hover:bg-red-500 text-white p-1 rounded-md text-xs font-bold transition-opacity shadow-sm"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 sm:mt-8 bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5 text-start">
                  <p className="text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wide mb-2">Consejos para destacar tu propiedad</p>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    Fotografías luminosas, espacios ordenados y videos verticales pueden marcar la diferencia en tu publicación. 
                    <a href="#" className="text-[#24B6C1] font-bold underline ms-1">Ver recomendaciones</a>
                  </p>
                </div>
              </motion.div>
            )} 
            */}
          </AnimatePresence>

          {/* BOTONES DE NAVEGACIÓN */}
          <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 sm:gap-0 mt-8 sm:mt-10">
            {step > 1 ? (
              <button 
                type="button" 
                onClick={(e) => { e.preventDefault(); prevStep(); }}
                className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-lg font-bold text-xs sm:text-[15px] transition border border-gray-200"
              >
                <ArrowLeft size={18} /> Atrás
              </button>
            ) : (
              <div></div> 
            )}

            {/* Cambiar a step < 3 si descomentas el paso 3 */}
            {step < 2 && (
              <button 
                type="button" 
                onClick={(e) => { e.preventDefault(); nextStep(); }}
                className="flex items-center justify-center gap-2 bg-[#24B6C1] hover:bg-[#1f9fa8] text-white w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-bold text-xs sm:text-[15px] transition shadow-md"
              >
                Siguiente <ArrowRight size={18} />
              </button>
            )}

            {/* Cambiar a step === 3 si descomentas el paso 3 */}
            {step === 2 && (
              <button 
                type="submit" 
                className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-3.5 rounded-lg font-bold text-xs sm:text-[15px] transition shadow-md"
              >
                PUBLICAR PROPIEDAD
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};

export default PublishPropertyForm;