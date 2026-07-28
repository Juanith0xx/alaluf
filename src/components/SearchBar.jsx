import { useState, useRef, useEffect } from "react"; 
import { motion, AnimatePresence } from "framer-motion"; 
import { Search, ChevronDown, Check, ChevronRight, SlidersHorizontal, X } from "lucide-react"; 
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'; 

const SearchBar = () => { 
  const [tipoPropiedad, setTipoPropiedad] = useState(null); 
  const [searchQuery, setSearchQuery] = useState("");  
  const [selectedComuna, setSelectedComuna] = useState(null); 
  const [showSuggestions, setShowSuggestions] = useState(false); 
  const [openDropdown, setOpenDropdown] = useState(false); 
  
  // Sincronizar estado inicial con la URL si existe (1 = Comprar, 2 = Arrendar)
  const [searchParams] = useSearchParams();
  const [accionActiva, setAccionActiva] = useState(searchParams.get("obj") === "1" ? "Comprar" : "Arrendar"); 
   
  // Estado para subcategorías en móvil
  const [activeCategory, setActiveCategory] = useState(null); 
  
  // Estados para Filtros Avanzados
  const [mostrarAvanzado, setMostrarAvanzado] = useState(false);
  const [supDesde, setSupDesde] = useState("");
  const [supHasta, setSupHasta] = useState("");
  const [precioDesde, setPrecioDesde] = useState("");
  const [precioHasta, setPrecioHasta] = useState("");
   
  const dropdownRef = useRef(null); 
  const suggestionRef = useRef(null); 
  
  const navigate = useNavigate(); 
  const location = useLocation();

  // --- LÓGICA AUTOMÁTICA PARA FILTROS AVANZADOS ---
  useEffect(() => {
    const isBuscarRoute = location.pathname.includes('/buscar');
    const tienePropiedad = searchParams.has('tipo_prop');
    const tieneComuna = searchParams.has('comuna');

    // Si estamos en resultados, hay propiedad pero NO hay comuna, abrimos los filtros
    if (isBuscarRoute && tienePropiedad && !tieneComuna) {
      setMostrarAvanzado(true);
    } else if (!isBuscarRoute) {
      // Si volvemos al inicio, los cerramos
      setMostrarAvanzado(false);
    }

    // Sincronizar los inputs con los valores de la URL si existen
    setSupDesde(searchParams.get("sup_desde") || "");
    setSupHasta(searchParams.get("sup_hasta") || "");
    setPrecioDesde(searchParams.get("precio_desde") || "");
    setPrecioHasta(searchParams.get("precio_hasta") || "");

    // Sincronizar accion activa con URL (Por si el usuario recarga la página)
    if (searchParams.has("obj")) {
      setAccionActiva(searchParams.get("obj") === "1" ? "Comprar" : "Arrendar");
    }
  }, [location.pathname, searchParams]);


  const comunasDataset = [ 
    { label: "Iquique", id: "1101" }, { label: "Alto Hospicio", id: "1211" }, { label: "Pozo Almonte", id: "1401" }, 
    { label: "Antofagasta", id: "2101" }, { label: "Calama", id: "2301" }, { label: "Copiapó", id: "3101" }, 
    { label: "Freirina", id: "3302" }, { label: "La Serena", id: "4101" }, { label: "Coquimbo", id: "4102" }, 
    { label: "Paihuano", id: "4106" }, { label: "Los Vilos", id: "4203" }, { label: "Punitaqui", id: "4204" }, 
    { label: "Ovalle", id: "4301" }, { label: "Valparaiso", id: "5101" }, { label: "Casablanca", id: "5102" }, 
    { label: "Concón", id: "5103" }, { label: "Quilpué", id: "5106" }, { label: "Quintero", id: "5107" }, 
    { label: "Viña del Mar", id: "5109" }, { label: "Los Andes", id: "5301" }, { label: "Rinconada", id: "5303" }, 
    { label: "Quillota", id: "5501" }, { label: "Hijuelas", id: "5503" }, { label: "Limache", id: "5505" }, 
    { label: "Olmue", id: "5507" }, { label: "San Antonio", id: "5601" }, { label: "Algarrobo", id: "5602" }, 
    { label: "Cartagena", id: "5603" }, { label: "El Quisco", id: "5604" }, { label: "Santo Domingo", id: "5606" }, 
    { label: "El Tabo", id: "5607" }, { label: "San Felipe", id: "5701" }, { label: "Catemu", id: "5702" }, 
    { label: "Putaendo", id: "5705" }, { label: "Rancagua", id: "6101" }, { label: "Codegua", id: "6102" }, 
    { label: "Las Cabras", id: "6107" }, { label: "Machalí", id: "6108" }, { label: "La Estrella", id: "6202" }, 
    { label: "Litueche", id: "6203" }, { label: "San Fernando", id: "6301" }, { label: "Chimbarongo", id: "6303" }, 
    { label: "Santa Cruz", id: "6310" }, { label: "Talca", id: "7101" }, { label: "Constitución", id: "7102" }, 
    { label: "Romeral", id: "7103" }, { label: "Cauquenes", id: "7201" }, { label: "Maule", id: "7206" }, 
    { label: "Curicó", id: "7301" }, { label: "Linares", id: "7401" }, { label: "Longaví", id: "7403" }, 
    { label: "Parral", id: "7404" }, { label: "Concepción", id: "8101" }, { label: "San Carlos", id: "8109" }, 
    { label: "Hualpén", id: "8212" }, { label: "Los Angeles", id: "8301" }, { label: "Chillán", id: "8401" }, 
    { label: "Temuco", id: "9101" }, { label: "Pucón", id: "9115" }, { label: "Villarrica", id: "9120" }, 
    { label: "Puerto Montt", id: "10101" }, { label: "Futrono", id: "10105" }, { label: "Panguipulli", id: "10108" }, 
    { label: "Puerto Varas", id: "10109" }, { label: "Río Bueno", id: "10111" }, { label: "Castro", id: "10201" }, 
    { label: "Puerto Octay", id: "10203" }, { label: "Osorno", id: "10301" }, { label: "Llanquihue", id: "10306" }, 
    { label: "Chonchi", id: "10402" }, { label: "Ancud", id: "10406" }, { label: "Valdivia", id: "10501" }, 
    { label: "Chile Chico", id: "11101" }, { label: "Aysén", id: "11201" }, { label: "Natales", id: "12101" }, 
    { label: "Punta Arenas", id: "12205" }, { label: "Santiago", id: "13101" }, { label: "Cerrillos", id: "13102" }, 
    { label: "Cerro Navia", id: "13103" }, { label: "Conchalí", id: "13104" }, { label: "El Bosque", id: "13105" }, 
    { label: "Estación Central", id: "13106" }, { label: "Huechuraba", id: "13107" }, { label: "Independencia", id: "13108" }, 
    { label: "La Cisterna", id: "13109" }, { label: "La Florida", id: "13110" }, { label: "La Granja", id: "13111" }, 
    { label: "La Pintana", id: "13112" }, { label: "La Reina", id: "13113" }, { label: "Las Condes", id: "13114" }, 
    { label: "Lo Barnechea", id: "13115" }, { label: "Lo Espejo", id: "13116" }, { label: "Lo Prado", id: "13117" }, 
    { label: "Macul", id: "13118" }, { label: "Maipú", id: "13119" }, { label: "Ñuñoa", id: "13120" }, 
    { label: "Pedro Aguirre Cerda", id: "13121" }, { label: "Peñalolén", id: "13122" }, { label: "Providencia", id: "13123" }, 
    { label: "Pudahuel", id: "13124" }, { label: "Quilicura", id: "13125" }, { label: "Quinta Normal", id: "13126" }, 
    { label: "Recoleta", id: "13127" }, { label: "Renca", id: "13128" }, { label: "San Joaquín", id: "13129" }, 
    { label: "San Miguel", id: "13130" }, { label: "San Ramón", id: "13131" }, { label: "Vitacura", id: "13132" }, 
    { label: "Laguna de Aculeo", id: "13134" }, { label: "Puente Alto", id: "13201" }, { label: "Pirque", id: "13202" }, 
    { label: "San José de Maipo", id: "13203" }, { label: "Colina", id: "13301" }, { label: "Lampa", id: "13302" }, 
    { label: "Tiltil", id: "13303" }, { label: "San Bernardo", id: "13401" }, { label: "Buin", id: "13402" }, 
    { label: "Calera de Tango", id: "13403" }, { label: "Paine", id: "13404" }, { label: "Melipilla", id: "13501" }, 
    { label: "Alhué", id: "13502" }, { label: "Curacaví", id: "13503" }, { label: "María Pinto", id: "13504" }, 
    { label: "San Pedro", id: "13505" }, { label: "Talagante", id: "13601" }, { label: "El Monte", id: "13602" }, 
    { label: "Isla de Maipo", id: "13603" }, { label: "Padre Hurtado", id: "13604" }, { label: "Peñaflor", id: "13605" }, 
    { label: "Llay-Llay", id: "13608" }, { label: "La Ligua", id: "13609" }, { label: "Requinoa", id: "13612" }, 
    { label: "Frutillar", id: "13617" }, { label: "Isla de Pascua", id: "13619" }, { label: "Puchuncavi", id: "13620" }, 
    { label: "Placilla", id: "13621" }, { label: "Vallenar", id: "13622" }, { label: "Illapel", id: "13623" }, 
    { label: "Salamanca", id: "13624" }, { label: "La Ligua", id: "13625" }, { label: "Pichilemu", id: "13626" }, 
    { label: "Zapallar", id: "13627" }, { label: "Tome", id: "13628" }, { label: "Villa Alemana", id: "13629" }, 
    { label: "Arauco", id: "13630" }, { label: "Papudo", id: "13631" }, { label: "Cochamo", id: "13632" }, 
    { label: "Los Muermos", id: "13633" }, { label: "San Juan de la Costa", id: "13634" }, { label: "Santa Maria", id: "13635" }, 
    { label: "Coronel", id: "13636" }, { label: "San Pedro de la Paz", id: "13637" }, { label: "Navidad", id: "13638" }, 
    { label: "Arica", id: "13639" }, { label: "Vicuña", id: "13670" }, { label: "Talcahuano", id: "13671" }, 
    { label: "La Cruz", id: "13672" }, { label: "La Unión", id: "14201" }, { label: "Nuble", id: "16101" }, 
    { label: "San Francisco de Mostazal", id: "16103" } 
  ]; 

  const propiedades = [ 
    { nombre: "Residencial", sub: [{ label: "Casas", id: 1 }, { label: "Departamentos", id: 2 }] }, 
    { nombre: "Comercial / Oficinas", sub: [{ label: "Oficinas", id: 3 }, { label: "Locales", id: 4 }, { label: "Casa Comercial", id: 5 }, { label: "Hotelería", id: 13 }, { label: "Edificios Corporativos", id: 12 }] }, 
    { nombre: "Industrial", sub: [{ label: "Galpones", id: 8 }, { label: "Bodega Industrial", id: 17 }, { label: "Terreno Industrial", id: 7 }] },
    { nombre: "Terrenos para proyectos", sub: [{ label: "Terrenos para Proyectos", id: 6 }, { label: "Parcela / Sitio", id: 10 }, { label: "Campos", id: 15 }] }, 
  ]; 

  const filteredComunas = searchQuery.length > 1  
    ? comunasDataset.filter(c => c.label.toLowerCase().includes(searchQuery.toLowerCase())) 
    : []; 

  const handleSearch = () => { 
    if (accionActiva === "Vender") { 
      navigate('/vender'); 
      return; 
    } 

    const textInput = searchQuery.trim(); 
    const numericCode = textInput.replace(/\D/g, ""); 
      
    if (numericCode !== "" && (textInput.toLowerCase().startsWith("id") || !isNaN(textInput))) { 
      navigate(`/buscar?q=${numericCode}`); 
      return; 
    } 

    if (!tipoPropiedad && !searchParams.has('tipo_prop')) { 
      alert("Por favor, selecciona un tipo de propiedad."); 
      return; 
    } 

    // Lógica principal: 1 = Comprar (Venta), 2 = Arrendar (Arriendo)
    const objID = accionActiva === "Comprar" ? 1 : 2; 
    const tipoPropID = tipoPropiedad?.id || searchParams.get('tipo_prop');

    const queryParams = {
      tipo_prop: tipoPropID,
      obj: objID // Aplicamos el filtro de Venta(1) o Arriendo(2)
    };

    // La API de Alaluf espera el código de comuna, no su nombre.
    // Si el usuario no selecciona una sugerencia, se ejecuta búsqueda general.
    if (selectedComuna?.id) {
      queryParams.comuna = selectedComuna.id;
      queryParams.comuna_nombre = selectedComuna.label;
    }

    queryParams.page = 1;

    const params = new URLSearchParams(queryParams); 
    navigate(`/buscar?${params.toString()}`); 
  };

  // Función para aplicar los filtros avanzados a la URL
  const aplicarFiltrosAvanzados = () => {
    const params = new URLSearchParams(searchParams);
    
    if (supDesde) params.set("sup_desde", supDesde); else params.delete("sup_desde");
    if (supHasta) params.set("sup_hasta", supHasta); else params.delete("sup_hasta");
    if (precioDesde) params.set("precio_desde", precioDesde); else params.delete("precio_desde");
    if (precioHasta) params.set("precio_hasta", precioHasta); else params.delete("precio_hasta");
    params.set("page", "1");
    
    navigate(`/buscar?${params.toString()}`);
  };

  useEffect(() => { 
    const handleClickOutside = (e) => { 
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) { 
        setOpenDropdown(false); 
        setActiveCategory(null); 
      } 
      if (suggestionRef.current && !suggestionRef.current.contains(e.target)) setShowSuggestions(false); 
    }; 
    document.addEventListener("mousedown", handleClickOutside); 
    return () => document.removeEventListener("mousedown", handleClickOutside); 
  }, []); 

  const togglePropertyDropdown = () => {
    setOpenDropdown((current) => {
      const next = !current;

      if (!next) {
        setActiveCategory(null);
      }

      return next;
    });
  };

  const handleSelectProperty = (sub) => {
    setTipoPropiedad(sub);
    setOpenDropdown(false);
    setActiveCategory(null);
  };

  return ( 
    <div className="relative z-30 px-3 pt-4 sm:px-4 xl:pt-22 font-[Outfit]"> 

      {/* --- BARRA DE BÚSQUEDA PRINCIPAL --- */}
      <div className="relative z-40 mx-auto grid max-w-6xl grid-cols-1 items-center gap-3 rounded-3xl border border-white/20 bg-gray-200/20 p-3 shadow-2xl backdrop-blur-md sm:p-4 md:grid-cols-2 xl:grid-cols-[auto_14rem_minmax(260px,1fr)_auto] xl:rounded-[40px]"> 
         
        {/* Selector de Acción */} 
        <div className="grid w-full grid-cols-3 gap-1 rounded-xl border border-white/5 bg-black/60 p-1 md:col-span-2 xl:col-span-1 xl:w-auto"> 
          {["Comprar", "Arrendar", "Vender"].map((accion) => ( 
            <button 
              type="button"
              key={accion} 
              onClick={() => { 
                setAccionActiva(accion); 
                setOpenDropdown(false);
                setActiveCategory(null);
                setShowSuggestions(false);
                
                if (accion === "Vender") {
                  navigate('/vender'); 
                } else if (location.pathname.includes('/buscar')) {
                  const params = new URLSearchParams(searchParams);
                  params.set("obj", accion === "Comprar" ? "1" : "2");
                  params.set("page", "1");
                  navigate(`/buscar?${params.toString()}`);
                }
              }} 
              className={`w-full whitespace-nowrap rounded-lg px-2 py-3 text-xs font-medium transition-all duration-300 sm:px-5 sm:text-sm ${ 
                accionActiva === accion
                  ? "bg-[#24B6C1] text-white shadow-lg"
                  : "text-white/60 hover:text-white" 
              }`} 
            > 
              {accion} 
            </button> 
          ))} 
        </div> 

        {/* Dropdown de Propiedad */} 
        <div className="relative min-w-0 md:col-span-1" ref={dropdownRef}> 
          <button 
            type="button"
            onClick={togglePropertyDropdown}
            aria-haspopup="menu"
            aria-expanded={openDropdown}
            className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-gray-600/60 px-5 py-4 text-white transition-colors hover:bg-gray-600/75 focus:outline-none focus:ring-2 focus:ring-[#24B6C1]/60" 
          > 
            <span className="truncate text-sm">
              {tipoPropiedad?.label || 
               propiedades.flatMap((p) => p.sub).find((s) => s.id.toString() === searchParams.get('tipo_prop'))?.label || 
               "Tipo de propiedad"}
            </span> 
            <ChevronDown 
              size={16} 
              className={`shrink-0 text-[#24B6C1] transition-transform ${openDropdown ? "rotate-180" : ""}`} 
            /> 
          </button> 

          <AnimatePresence> 
            {openDropdown && ( 
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="absolute left-0 right-0 top-full z-50 mt-3 max-h-[min(65vh,28rem)] overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a]/95 p-3 shadow-2xl backdrop-blur-2xl xl:right-auto xl:w-72 xl:max-h-none xl:overflow-visible"
              > 
                {/* MÓVIL + TABLET: navegación dentro del mismo panel */} 
                <div className="max-h-[min(60vh,25rem)] overflow-y-auto overscroll-contain xl:hidden"> 
                  <AnimatePresence mode="wait" initial={false}>
                    {!activeCategory ? ( 
                      <motion.ul
                        key="categorias"
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        className="space-y-1"
                      > 
                        {propiedades.map((prop) => ( 
                          <li key={prop.nombre}> 
                            <button
                              type="button"
                              onClick={() => setActiveCategory(prop)}
                              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-white/80 transition hover:bg-[#24B6C1]/10 hover:text-[#24B6C1]"
                            > 
                              <span className="text-sm font-semibold">{prop.nombre}</span> 
                              <ChevronRight size={16} className="shrink-0 text-gray-400" /> 
                            </button> 
                          </li> 
                        ))} 
                      </motion.ul> 
                    ) : ( 
                      <motion.div
                        key={activeCategory.nombre}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 12 }}
                      > 
                        <button
                          type="button"
                          onClick={() => setActiveCategory(null)}
                          className="mb-3 flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-bold uppercase tracking-wider text-[#24B6C1] transition hover:bg-white/5"
                        > 
                          <ChevronRight size={14} className="rotate-180" />
                          Volver a categorías
                        </button> 

                        <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                          {activeCategory.nombre}
                        </p>

                        <ul className="space-y-0.5"> 
                          {activeCategory.sub.map((sub) => ( 
                            <li key={sub.id}> 
                              <button
                                type="button"
                                onClick={() => handleSelectProperty(sub)}
                                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm text-gray-300 transition hover:bg-[#24B6C1]/10 hover:text-[#24B6C1]"
                              > 
                                <span>{sub.label}</span>
                                {tipoPropiedad?.id === sub.id && <Check size={14} className="shrink-0 text-[#24B6C1]" />} 
                              </button>
                            </li> 
                          ))} 
                        </ul> 
                      </motion.div> 
                    )}
                  </AnimatePresence> 
                </div> 

                {/* DESKTOP: la subcategoría se abre a la derecha mediante click */} 
                <div className="relative hidden xl:block"> 
                  <ul className="space-y-1"> 
                    {propiedades.map((prop) => {
                      const isActive = activeCategory?.nombre === prop.nombre;

                      return (
                        <li key={prop.nombre} className="relative"> 
                          <button
                            type="button"
                            onClick={() => setActiveCategory(isActive ? null : prop)}
                            aria-expanded={isActive}
                            className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition ${
                              isActive
                                ? "bg-[#24B6C1]/15 text-[#24B6C1]"
                                : "text-white/80 hover:bg-[#24B6C1]/10 hover:text-[#24B6C1]"
                            }`}
                          > 
                            <span className="text-sm font-semibold">{prop.nombre}</span> 
                            <ChevronRight
                              size={16}
                              className={`shrink-0 transition-transform ${isActive ? "translate-x-1 text-[#24B6C1]" : "text-gray-400"}`}
                            /> 
                          </button> 

                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0, x: -8, scale: 0.98 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -8, scale: 0.98 }}
                                transition={{ duration: 0.16 }}
                                className="absolute left-full top-0 z-[60] ml-3 w-64 rounded-2xl border border-white/10 bg-[#1a1a1a]/98 p-2 shadow-2xl backdrop-blur-2xl"
                              >
                                <p className="px-4 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-white/40">
                                  {prop.nombre}
                                </p>
                                <ul className="space-y-0.5"> 
                                  {prop.sub.map((sub) => ( 
                                    <li key={sub.id}> 
                                      <button
                                        type="button"
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          handleSelectProperty(sub);
                                        }}
                                        className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm text-gray-300 transition-all duration-200 hover:translate-x-1 hover:bg-[#24B6C1]/10 hover:text-[#24B6C1]"
                                      > 
                                        <span>{sub.label}</span>
                                        {tipoPropiedad?.id === sub.id && <Check size={14} className="shrink-0 text-[#24B6C1]" />} 
                                      </button>
                                    </li> 
                                  ))} 
                                </ul> 
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </li> 
                      );
                    })} 
                  </ul> 
                </div> 
              </motion.div> 
            )} 
          </AnimatePresence> 
        </div> 

        {/* Input Comuna */} 
        <div className="relative min-w-0 md:col-span-1" ref={suggestionRef}> 
          <input 
            type="text" 
            value={searchQuery} 
            onChange={(e) => { 
              setSearchQuery(e.target.value); 
              setShowSuggestions(true); 
              setOpenDropdown(false);
              setActiveCategory(null);
              if (selectedComuna) setSelectedComuna(null); 
            }} 
            onFocus={() => {
              setShowSuggestions(true);
              setOpenDropdown(false);
              setActiveCategory(null);
            }} 
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} 
            placeholder={searchParams.get('comuna_nombre') || (searchParams.get('comuna') ? comunasDataset.find((c) => c.id === searchParams.get('comuna'))?.label || searchParams.get('comuna') : "Comuna, ciudad o código...")} 
            className="w-full rounded-xl bg-gray-400/90 px-5 py-4 text-sm text-white placeholder-white/90 focus:outline-none focus:ring-2 focus:ring-[#24B6C1]/60 sm:px-6" 
          /> 

          <AnimatePresence> 
            {showSuggestions && filteredComunas.length > 0 && ( 
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="absolute left-0 top-full z-50 mt-2 max-h-60 w-full overflow-y-auto overscroll-contain rounded-xl border border-white/10 bg-[#1a1a1a] shadow-2xl"
              > 
                {filteredComunas.map((c, index) => ( 
                  <button
                    type="button"
                    key={`${c.id}-${index}`}
                    onClick={() => {
                      setSearchQuery(c.label);
                      setSelectedComuna(c);
                      setShowSuggestions(false);
                    }}
                    className="flex w-full items-center justify-between px-5 py-3 text-left text-sm text-gray-300 transition hover:bg-[#24B6C1]/20 sm:px-6"
                  > 
                    <span>{c.label}</span>
                    <span className="text-[10px] text-gray-500">ID: {c.id}</span> 
                  </button> 
                ))} 
              </motion.div> 
            )} 
          </AnimatePresence> 
        </div> 

        {/* Botón Buscar / Filtros */} 
        <div className="flex w-full gap-2 md:col-span-2 xl:col-span-1 xl:w-auto">
          <button
            type="button"
            onClick={handleSearch}
            className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#24B6C1] px-8 py-4 text-white shadow-lg transition-all hover:bg-cyan-600 xl:flex-none"
          > 
            <span className="text-sm font-bold">Buscar</span> 
            <Search size={18} className="transition-transform group-hover:scale-110" /> 
          </button>
          
          {location.pathname.includes('/buscar') && (
            <button 
              type="button"
              onClick={() => setMostrarAvanzado(!mostrarAvanzado)}
              aria-label={mostrarAvanzado ? "Ocultar filtros avanzados" : "Mostrar filtros avanzados"}
              className={`flex shrink-0 items-center justify-center rounded-xl px-4 py-4 shadow-lg transition-all ${
                mostrarAvanzado
                  ? 'border border-white/10 bg-[#1a1a1a] text-[#24B6C1]'
                  : 'bg-gray-600/60 text-white hover:bg-gray-500'
              }`}
            >
              <SlidersHorizontal size={18} />
            </button>
          )}
        </div>
      </div> 

      {/* --- PANEL DE FILTROS AVANZADOS (Aparece dinámicamente) --- */}
      <AnimatePresence>
        {mostrarAvanzado && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="relative z-30 mx-auto mt-4 max-w-5xl rounded-2xl border border-white/10 bg-[#1a1a1a]/95 p-4 shadow-2xl backdrop-blur-2xl sm:p-6 md:rounded-[30px] md:p-8"
          >
            <button 
              onClick={() => setMostrarAvanzado(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-white font-bold text-lg mb-6 border-b border-white/10 pb-3 flex items-center gap-2">
               Filtros Avanzados
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              
              {/* Filtro: Superficie */}
              <div>
                <label className="text-white/80 text-sm font-semibold mb-3 flex items-center gap-2">
                  <ChevronRight size={16} className="text-[#24B6C1]" /> Superficie (m²)
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <div className="flex-1 relative">
                    <input 
                      type="number" 
                      placeholder="Desde" 
                      value={supDesde} 
                      onChange={(e) => setSupDesde(e.target.value)} 
                      className="w-full bg-gray-600/60 text-white px-4 py-3 rounded-xl border border-white/5 focus:outline-none focus:border-[#24B6C1] transition-colors text-sm placeholder-white/50" 
                    />
                  </div>
                  <div className="flex-1 relative">
                    <input 
                      type="number" 
                      placeholder="Hasta" 
                      value={supHasta} 
                      onChange={(e) => setSupHasta(e.target.value)} 
                      className="w-full bg-gray-600/60 text-white px-4 py-3 rounded-xl border border-white/5 focus:outline-none focus:border-[#24B6C1] transition-colors text-sm placeholder-white/50" 
                    />
                  </div>
                </div>
              </div>

              {/* Filtro: Precio */}
              <div>
                <label className="text-white/80 text-sm font-semibold mb-3 flex items-center gap-2">
                  <ChevronRight size={16} className="text-[#24B6C1]" /> Precio | Moneda
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <div className="flex-1 relative">
                    <input 
                      type="number" 
                      placeholder="Desde" 
                      value={precioDesde} 
                      onChange={(e) => setPrecioDesde(e.target.value)} 
                      className="w-full bg-gray-600/60 text-white px-4 py-3 rounded-xl border border-white/5 focus:outline-none focus:border-[#24B6C1] transition-colors text-sm placeholder-white/50" 
                    />
                  </div>
                  <div className="flex-1 relative">
                    <input 
                      type="number" 
                      placeholder="Hasta" 
                      value={precioHasta} 
                      onChange={(e) => setPrecioHasta(e.target.value)} 
                      className="w-full bg-gray-600/60 text-white px-4 py-3 rounded-xl border border-white/5 focus:outline-none focus:border-[#24B6C1] transition-colors text-sm placeholder-white/50" 
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={aplicarFiltrosAvanzados} 
                className="w-full sm:w-auto px-10 py-3 bg-[#24B6C1] hover:bg-cyan-600 text-white rounded-xl flex items-center justify-center gap-2 transition-all group shadow-[0_0_15px_rgba(36,182,193,0.3)] font-bold tracking-wide"
              >
                APLICAR FILTROS
                <Search size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div> 
  ); 
}; 

export default SearchBar;