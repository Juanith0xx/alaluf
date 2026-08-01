import { useState, useRef, useEffect } from "react"; 
import { motion, AnimatePresence } from "framer-motion"; 
import { Search, ChevronDown, Check, ChevronRight, SlidersHorizontal, X } from "lucide-react"; 
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'; 
import comunasDataset from "../data/comunas";

const SearchBar = () => { 
  const [tipoPropiedad, setTipoPropiedad] = useState(null); 
  const [searchQuery, setSearchQuery] = useState("");  
  const [selectedComuna, setSelectedComuna] = useState(null); 
  const [showSuggestions, setShowSuggestions] = useState(false); 
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1); 
  
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
  const suggestionItemRefs = useRef([]); 
  
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


    const propiedades = [ 
    { nombre: "Residencial", sub: [{ label: "Casas", id: 1 }, { label: "Departamentos", id: 2 }] }, 
    { nombre: "Comercial / Oficinas", sub: [{ label: "Oficinas", id: 3 }, { label: "Locales", id: 4 }, { label: "Casa Comercial", id: 5 }, { label: "Hotelería", id: 13 }, { label: "Edificios Corporativos", id: 12 }] }, 
    { nombre: "Industrial", sub: [{ label: "Galpones", id: 8 }, { label: "Bodega Industrial", id: 17 }, { label: "Terreno Industrial", id: 7 }] },
    { nombre: "Terrenos para proyectos", sub: [{ label: "Terrenos para Proyectos", id: 6 }, { label: "Parcela / Sitio", id: 10 }, { label: "Campos", id: 15 }] }, 
  ]; 

  const filteredComunas = searchQuery.length > 1  
    ? comunasDataset.filter(c => c.label.toLowerCase().includes(searchQuery.toLowerCase())) 
    : [];

  const seleccionarComuna = (comuna) => {
    setSearchQuery(comuna.label);
    setSelectedComuna(comuna);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
  };

  const handleComunaKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (!showSuggestions) {
        setShowSuggestions(true);
      }

      if (filteredComunas.length === 0) return;

      setActiveSuggestionIndex((current) =>
        current < filteredComunas.length - 1 ? current + 1 : 0
      );

      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (!showSuggestions) {
        setShowSuggestions(true);
      }

      if (filteredComunas.length === 0) return;

      setActiveSuggestionIndex((current) =>
        current > 0 ? current - 1 : filteredComunas.length - 1
      );

      return;
    }

    if (event.key === "Enter") {
      if (
        showSuggestions &&
        activeSuggestionIndex >= 0 &&
        filteredComunas[activeSuggestionIndex]
      ) {
        event.preventDefault();
        seleccionarComuna(filteredComunas[activeSuggestionIndex]);
        return;
      }

      handleSearch();
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    }
  };

  useEffect(() => {
    if (
      activeSuggestionIndex < 0 ||
      !showSuggestions ||
      !suggestionItemRefs.current[activeSuggestionIndex]
    ) {
      return;
    }

    suggestionItemRefs.current[activeSuggestionIndex].scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [activeSuggestionIndex, showSuggestions]);


  useEffect(() => {
    suggestionItemRefs.current = suggestionItemRefs.current.slice(
      0,
      filteredComunas.length
    );

    if (
      activeSuggestionIndex >= filteredComunas.length &&
      filteredComunas.length > 0
    ) {
      setActiveSuggestionIndex(filteredComunas.length - 1);
    }

    if (filteredComunas.length === 0) {
      setActiveSuggestionIndex(-1);
    }
  }, [filteredComunas.length, activeSuggestionIndex]);

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

    const objID = accionActiva === "Comprar" ? 1 : 2; 
    const tipoPropID = tipoPropiedad?.id || searchParams.get('tipo_prop');

    const queryParams = {
      tipo_prop: tipoPropID,
      obj: objID 
    };

    if (selectedComuna?.id) {
      queryParams.comuna = selectedComuna.id;
      queryParams.comuna_nombre = selectedComuna.label;
    }

    queryParams.page = 1;

    const params = new URLSearchParams(queryParams); 
    navigate(`/buscar?${params.toString()}`); 
  };

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
      if (suggestionRef.current && !suggestionRef.current.contains(e.target)) {
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
      } 
    }; 
    document.addEventListener("mousedown", handleClickOutside); 
    return () => document.removeEventListener("mousedown", handleClickOutside); 
  }, []); 

  const togglePropertyDropdown = () => {
    setOpenDropdown((current) => {
      const next = !current;
      if (!next) setActiveCategory(null);
      return next;
    });
  };

  const handleSelectProperty = (sub) => {
    setTipoPropiedad(sub);
    setOpenDropdown(false);
    setActiveCategory(null);
  };

  return ( 
    <div className="relative z-30 w-full px-3 pt-4 font-[Outfit] sm:px-4 xl:pt-22"> 

      {/* --- BARRA DE BÚSQUEDA PRINCIPAL --- */}
      <div className="relative z-40 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-3 rounded-3xl border border-white/20 bg-gray-200/20 p-3 shadow-2xl backdrop-blur-md sm:p-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-4 xl:grid-cols-[auto_14rem_minmax(260px,1fr)_auto] xl:gap-3 xl:rounded-[40px]"> 
         
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
              className={`min-h-11 w-full touch-manipulation whitespace-nowrap rounded-lg px-2 py-3 text-[11px] font-medium transition-all duration-300 sm:min-h-12 sm:px-4 sm:text-xs md:text-sm xl:min-h-0 ${ 
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
            className="flex min-h-12 w-full touch-manipulation items-center justify-between rounded-xl border border-white/10 bg-gray-600/60 px-4 py-3.5 text-white transition-colors hover:bg-gray-600/75 focus:outline-none focus:ring-2 focus:ring-[#24B6C1]/60 sm:px-5 sm:py-4" 
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
                className="absolute left-0 right-0 top-full z-50 mt-3 max-h-[min(52svh,28rem)] origin-top overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a]/95 p-3 shadow-2xl backdrop-blur-2xl md:max-h-[min(48svh,28rem)] xl:right-auto xl:w-72 xl:max-h-none xl:overflow-visible"
              > 
                {/* MÓVIL + TABLET: navegación dentro del mismo panel */} 
                <div className="max-h-[min(47svh,25rem)] overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] md:max-h-[min(43svh,25rem)] xl:hidden"> 
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
                              className="flex min-h-12 w-full touch-manipulation items-center justify-between rounded-xl px-4 py-3 text-left text-white/80 transition hover:bg-[#24B6C1]/10 hover:text-[#24B6C1]"
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
                          className="mb-3 flex min-h-11 touch-manipulation items-center gap-2 rounded-lg px-2 py-2 text-xs font-bold uppercase tracking-wider text-[#24B6C1] transition hover:bg-white/5"
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
                                className="flex min-h-12 w-full touch-manipulation items-center justify-between rounded-lg px-4 py-3 text-left text-sm text-gray-300 transition hover:bg-[#24B6C1]/10 hover:text-[#24B6C1]"
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
              setActiveSuggestionIndex(-1); 
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
            onKeyDown={handleComunaKeyDown}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={showSuggestions && filteredComunas.length > 0}
            aria-controls="comuna-suggestions"
            aria-activedescendant={
              activeSuggestionIndex >= 0
                ? `comuna-suggestion-${activeSuggestionIndex}`
                : undefined
            }
            placeholder={searchParams.get('comuna_nombre') || (searchParams.get('comuna') ? comunasDataset.find((c) => c.id === searchParams.get('comuna'))?.label || searchParams.get('comuna') : "Comuna, ciudad o código...")} 
            className="min-h-12 w-full rounded-xl bg-gray-400/90 px-4 py-3.5 text-sm text-white placeholder-white/90 focus:outline-none focus:ring-2 focus:ring-[#24B6C1]/60 sm:px-5 sm:py-4" 
          /> 

          <AnimatePresence> 
            {showSuggestions && filteredComunas.length > 0 && ( 
              <motion.div
                id="comuna-suggestions"
                role="listbox"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="absolute left-0 top-full z-50 mt-2 max-h-[min(38svh,18rem)] w-full overflow-y-auto overscroll-contain rounded-xl border border-white/10 bg-[#1a1a1a] shadow-2xl [-webkit-overflow-scrolling:touch] sm:max-h-60"
              > 
                {filteredComunas.map((c, index) => ( 
                  <button
                    type="button"
                    id={`comuna-suggestion-${index}`}
                    role="option"
                    aria-selected={activeSuggestionIndex === index}
                    ref={(element) => {
                      suggestionItemRefs.current[index] = element;
                    }}
                    key={`${c.id}-${index}`}
                    onMouseEnter={() => setActiveSuggestionIndex(index)}
                    onClick={() => seleccionarComuna(c)}
                    className={`flex min-h-12 w-full touch-manipulation items-center justify-between px-4 py-3 text-left text-sm transition sm:px-5 xl:min-h-0 ${
                      activeSuggestionIndex === index
                        ? "bg-[#24B6C1]/20 text-[#24B6C1]"
                        : "text-gray-300 hover:bg-[#24B6C1]/20"
                    }`}
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
            className="group flex min-h-12 flex-1 touch-manipulation items-center justify-center gap-2 rounded-xl bg-[#24B6C1] px-6 py-3.5 text-white shadow-lg transition-all hover:bg-cyan-600 sm:py-4 xl:min-h-0 xl:flex-none"
          > 
            <span className="text-sm font-bold">Buscar</span> 
            <Search size={18} className="transition-transform group-hover:scale-110" /> 
          </button>
          
          {location.pathname.includes('/buscar') && (
            <button 
              type="button"
              onClick={() => setMostrarAvanzado(!mostrarAvanzado)}
              aria-label={mostrarAvanzado ? "Ocultar filtros avanzados" : "Mostrar filtros avanzados"}
              className={`flex min-h-12 shrink-0 touch-manipulation items-center justify-center rounded-xl px-4 py-3.5 shadow-lg transition-all sm:py-4 xl:min-h-0 ${
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
            className="relative z-30 mx-auto mt-4 w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a]/95 p-4 shadow-2xl backdrop-blur-2xl sm:p-6 md:rounded-[30px] md:p-8"
          >
            <button 
              onClick={() => setMostrarAvanzado(false)}
              className="absolute right-3 top-3 flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-white/5 hover:text-white sm:right-4 sm:top-4 xl:min-h-0 xl:min-w-0 xl:rounded-none xl:hover:bg-transparent"
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
                className="group flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-xl bg-[#24B6C1] px-6 py-3 font-bold tracking-wide text-white shadow-[0_0_15px_rgba(36,182,193,0.3)] transition-all hover:bg-cyan-600 sm:w-auto sm:px-10"
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