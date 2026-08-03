import { useState, useEffect } from "react";
import { MapPin, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import {
  FaRulerCombined,
  FaBed,
  FaBath,
  FaCar,
  FaBuilding,
  FaTag,
  FaRulerVertical,
  FaCheckCircle,
  FaDoorClosed,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import fondo from "../assets/Marmol.jpg";

// Imagen de respaldo
import propiedadImgFallback from "../assets/hero2.jpg";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const CACHE_TTL_MS = 15 * 60 * 1000;
const CACHE_PREFIX = "alaluf_destacadas_v5";

// La caché vive fuera del componente para conservarse si el componente
// se desmonta y vuelve a montarse durante la navegación.
const memoryCache = new Map();

/*
 * Solo se consultan los tipos que tienen propiedades destacadas.
 * Los tipos indicados como N/A no forman parte de esta configuración.
 */
const featuredConfig = {
  Residencial: [
    {
      label: "Casas",
      tipoId: "1",
      limit: 4,
    },
    {
      label: "Departamentos",
      tipoId: "2",
      limit: 2,
    },
  ],
  Comercial: [
    {
      label: "Locales",
      tipoId: "4",
      limit: 3,
    },
  ],
  Industrial: [
    {
      label: "Terrenos Industriales",
      tipoId: "7",
      limit: 2,
    },
  ],
  Terrenos: [
    {
      label: "Terrenos para Proyectos",
      tipoId: "6",
      limit: 1,
    },
  ],
};

const tabs = Object.keys(featuredConfig);

const getTabLimit = (tab) =>
  (featuredConfig[tab] || []).reduce(
    (total, tipo) => total + tipo.limit,
    0
  );

const getCacheKey = (tab) => {
  const signature = (featuredConfig[tab] || [])
    .map(({ tipoId, limit }) => `${tipoId}-${limit}`)
    .join("_");

  return `${CACHE_PREFIX}:${tab}:${signature}`;
};

const isFreshCache = (entry) => (
  entry &&
  Array.isArray(entry.cards) &&
  Date.now() - entry.savedAt < CACHE_TTL_MS
);

const readSessionCache = (cacheKey) => {
  try {
    const raw = window.sessionStorage.getItem(cacheKey);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!isFreshCache(parsed)) {
      window.sessionStorage.removeItem(cacheKey);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

const saveCache = (cacheKey, cards) => {
  if (!Array.isArray(cards) || cards.length === 0) {
    memoryCache.delete(cacheKey);

    try {
      window.sessionStorage.removeItem(cacheKey);
    } catch {
      // No se pudo acceder a sessionStorage.
    }

    return;
  }

  const entry = {
    cards,
    savedAt: Date.now(),
  };

  memoryCache.set(cacheKey, entry);

  try {
    window.sessionStorage.setItem(
      cacheKey,
      JSON.stringify(entry)
    );
  } catch {
    // Si sessionStorage no está disponible, la caché en memoria sigue activa.
  }
};

const getCachedCards = (cacheKey) => {
  const memoryEntry = memoryCache.get(cacheKey);
  if (isFreshCache(memoryEntry)) return memoryEntry.cards;

  if (memoryEntry) memoryCache.delete(cacheKey);

  const sessionEntry = readSessionCache(cacheKey);
  if (sessionEntry) {
    memoryCache.set(cacheKey, sessionEntry);
    return sessionEntry.cards;
  }

  return null;
};

const formatearMoneda = (valor, moneda) => {
  const numero = Number.parseFloat(valor || 0);
  const monedaNormalizada = String(moneda || "UF").trim().toUpperCase();

  if (!Number.isFinite(numero) || numero <= 0) return "Consultar";

  if (
    monedaNormalizada === "$" ||
    monedaNormalizada === "CLP" ||
    monedaNormalizada === "PESOS"
  ) {
    return `$${numero.toLocaleString("es-CL")}`;
  }

  return `${numero.toLocaleString("es-CL")} ${moneda || "UF"}`;
};

const construirUrlImagen = (item) => {
  const imagenNormalizada =
    item.imagenes?.[0] ||
    item.fotos?.[0];

  if (imagenNormalizada) {
    return imagenNormalizada;
  }

  const fotoPrincipal =
    item.foto_principal ||
    item.imagen ||
    item.image ||
    "";

  if (!fotoPrincipal) {
    return propiedadImgFallback;
  }

  if (/^https?:\/\//i.test(fotoPrincipal)) {
    return fotoPrincipal;
  }

  return `https://sistema.alaluf.com/nuevo/uploads/${fotoPrincipal}`;
};

const convertirNumero = (valor) => {
  if (
    valor === null ||
    valor === undefined ||
    valor === ""
  ) {
    return 0;
  }

  const numero = Number.parseFloat(
    String(valor).replace(",", ".")
  );

  return Number.isFinite(numero) ? numero : 0;
};

const formatearNumero = (valor) => {
  const numero = convertirNumero(valor);

  if (!numero) return "0";

  const esDecimal = numero % 1 !== 0;

  return numero.toLocaleString("es-CL", {
    minimumFractionDigits: esDecimal ? 2 : 0,
    maximumFractionDigits: esDecimal ? 2 : 0,
  });
};

const normalizarEtiqueta = (valor) =>
  String(valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const obtenerCampoExtra = (item, termino) => {
  const campos = [
    ...(Array.isArray(item?.campos_especificos)
      ? item.campos_especificos
      : []),
    ...(Array.isArray(item?.camposEspecificos)
      ? item.camposEspecificos
      : []),
    ...(Array.isArray(item?.caracteristicasExtra)
      ? item.caracteristicasExtra
      : []),
    ...(Array.isArray(item?.detalles?.campos_especificos)
      ? item.detalles.campos_especificos
      : []),
    ...(Array.isArray(item?.detalles?.caracteristicasExtra)
      ? item.detalles.caracteristicasExtra
      : []),
  ];

  const terminoNormalizado =
    normalizarEtiqueta(termino);

  const campo = campos.find((caracteristica) =>
    normalizarEtiqueta(
      caracteristica?.label ||
      caracteristica?.nombre ||
      caracteristica?.campo
    ).includes(terminoNormalizado)
  );

  return (
    campo?.value ??
    campo?.valor ??
    null
  );
};


const obtenerPrimerValor = (...valores) => {
  for (const valor of valores) {
    if (
      valor !== null &&
      valor !== undefined &&
      valor !== ""
    ) {
      return valor;
    }
  }

  return null;
};

const normalizarPrecios = (item) => ({
  venta: {
    valor: obtenerPrimerValor(
      item.precios?.venta?.valor,
      item.valor_venta
    ),
    moneda:
      item.precios?.venta?.moneda ||
      item.moneda_venta ||
      "UF",
  },
  arriendo: {
    valor: obtenerPrimerValor(
      item.precios?.arriendo?.valor,
      item.valor_arriendo
    ),
    moneda:
      item.precios?.arriendo?.moneda ||
      item.moneda_arriendo ||
      "$",
  },
});

const normalizarDetalles = (item) => ({
  superficie: obtenerPrimerValor(
    item.detalles?.superficie,
    item.m2_totales,
    item.m2_construidos,
    item.m2_terreno,
    item.m2_utiles
  ),

  m2Construidos: obtenerPrimerValor(
    obtenerCampoExtra(item, "m² construidos"),
    obtenerCampoExtra(item, "m2 construidos"),
    obtenerCampoExtra(item, "construidos"),
    item.detalles?.m2Construidos,
    item.detalles?.m2_construidos,
    item.m2_construidos
  ),

  m2Terreno: obtenerPrimerValor(
    obtenerCampoExtra(item, "m² terreno"),
    obtenerCampoExtra(item, "m2 terreno"),
    obtenerCampoExtra(item, "terreno"),
    item.detalles?.m2Terreno,
    item.detalles?.m2_terreno,
    item.m2_terreno
  ),

  m2Totales: obtenerPrimerValor(
    obtenerCampoExtra(item, "m² totales"),
    obtenerCampoExtra(item, "m2 totales"),
    obtenerCampoExtra(item, "totales"),
    item.detalles?.m2Totales,
    item.detalles?.m2_totales,
    item.m2_totales
  ),

  m2Utiles: obtenerPrimerValor(
    obtenerCampoExtra(item, "m² útiles"),
    obtenerCampoExtra(item, "m2 utiles"),
    obtenerCampoExtra(item, "útiles"),
    obtenerCampoExtra(item, "utiles"),
    item.detalles?.m2Utiles,
    item.detalles?.m2_utiles,
    item.m2_utiles
  ),

  dormitorios: obtenerPrimerValor(
    obtenerCampoExtra(item, "dormitorios"),
    item.detalles?.dormitorios,
    item.dormitorios
  ),

  banos: obtenerPrimerValor(
    obtenerCampoExtra(item, "baños"),
    obtenerCampoExtra(item, "banos"),
    item.detalles?.banos,
    item.banos
  ),

  estacionamientos: obtenerPrimerValor(
    obtenerCampoExtra(item, "estacionamientos"),
    item.detalles?.estacionamientos,
    item.estacionamientos
  ),

  privados: obtenerPrimerValor(
    obtenerCampoExtra(item, "privados"),
    item.detalles?.privados,
    item.privados
  ),

  caracteristicasExtra: [
    ...(Array.isArray(item?.campos_especificos)
      ? item.campos_especificos
      : []),
    ...(Array.isArray(item?.camposEspecificos)
      ? item.camposEspecificos
      : []),
    ...(Array.isArray(item?.caracteristicasExtra)
      ? item.caracteristicasExtra
      : []),
    ...(Array.isArray(item?.detalles?.caracteristicasExtra)
      ? item.detalles.caracteristicasExtra
      : []),
  ],
});


const mapearDestacadas = (
  propiedades,
  tipoDestacado
) =>
  propiedades
    .slice(0, tipoDestacado.limit)
    .map((item, index) => {
      const codigo =
        item.codigo ||
        item.codigo_interno ||
        item.codigo_propiedad ||
        item.id_propiedad ||
        item.id;

      const ubicacion = {
        sector:
          item.ubicacion?.sector ||
          item.sector_cercano ||
          item.titulo ||
          item.desc_tipo_prop ||
          item.desc_tipo ||
          tipoDestacado.label,
        comuna:
          item.ubicacion?.comuna ||
          item.com_nombre ||
          item.comuna ||
          "Consultar ubicación",
        region:
          item.ubicacion?.region ||
          item.region ||
          "Chile",
      };

      return {
        id:
          item.id ||
          item.id_propiedad ||
          codigo ||
          `${tipoDestacado.tipoId}-${index}`,
        codigo,
        tipo: tipoDestacado.label,
        tipoPropiedad:
          item.tipoPropiedad ||
          item.tipo ||
          item.categoria ||
          item.titulo ||
          item.desc_tipo_prop ||
          item.desc_tipo ||
          tipoDestacado.label,
        titulo: ubicacion.sector,
        ubicacion,
        detalles: normalizarDetalles(item),
        campos_especificos: [
          ...(Array.isArray(item?.campos_especificos)
            ? item.campos_especificos
            : []),
          ...(Array.isArray(item?.camposEspecificos)
            ? item.camposEspecificos
            : []),
        ],
        caracteristicasExtra: [
          ...(Array.isArray(item?.campos_especificos)
            ? item.campos_especificos
            : []),
          ...(Array.isArray(item?.camposEspecificos)
            ? item.camposEspecificos
            : []),
          ...(Array.isArray(item?.caracteristicasExtra)
            ? item.caracteristicasExtra
            : []),
          ...(Array.isArray(item?.detalles?.caracteristicasExtra)
            ? item.detalles.caracteristicasExtra
            : []),
        ],
        precios: normalizarPrecios(item),
        img: construirUrlImagen(item),
      };
    });

const InfoItemDestacada = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-1">
    <Icon className="shrink-0 text-[10px] text-cyan-400 sm:text-xs" />
    <span className="whitespace-nowrap text-[10px] font-medium text-gray-200 sm:text-xs">
      {text}
    </span>
  </div>
);

const renderizarDetallesDestacada = (item) => {
  const tipo = String(
    item.tipoPropiedad ||
      item.tipo ||
      item.titulo ||
      ""
  ).toLowerCase();

  const dorms = convertirNumero(
    item.detalles?.dormitorios
  );

  const banos = convertirNumero(
    item.detalles?.banos
  );

  const estac = convertirNumero(
    item.detalles?.estacionamientos
  );

  const m2Construidos = obtenerPrimerValor(
    item.detalles?.m2Construidos,
    item.detalles?.superficie
  );

  /*
   * No usamos "superficie" como reemplazo automático de terreno.
   * Esa era la causa de mostrar 70 m² construidos y 70 m² terreno.
   */
  const m2Terreno = obtenerPrimerValor(
    item.detalles?.m2Terreno,
    (
      tipo.includes("terreno") ||
      tipo.includes("industrial")
    )
      ? item.detalles?.superficie
      : null
  );

  const m2Totales = obtenerPrimerValor(
    item.detalles?.m2Totales,
    item.detalles?.superficie
  );

  const m2Utiles = obtenerPrimerValor(
    item.detalles?.m2Utiles,
    item.detalles?.superficie
  );

  if (
    tipo.includes("casa") &&
    !tipo.includes("comercial")
  ) {
    return (
      <>
        {convertirNumero(m2Construidos) > 0 && (
          <InfoItemDestacada
            icon={FaRulerCombined}
            text={`${formatearNumero(m2Construidos)} m² Const.`}
          />
        )}

        {convertirNumero(m2Terreno) > 0 && (
          <InfoItemDestacada
            icon={FaRulerCombined}
            text={`${formatearNumero(m2Terreno)} m² Terr.`}
          />
        )}

        {dorms > 0 && (
          <InfoItemDestacada
            icon={FaBed}
            text={`${formatearNumero(dorms)} Dorm`}
          />
        )}

        {banos > 0 && (
          <InfoItemDestacada
            icon={FaBath}
            text={`${formatearNumero(banos)} Baños`}
          />
        )}
      </>
    );
  }

  if (tipo.includes("departamento")) {
    return (
      <>
        {convertirNumero(m2Totales) > 0 && (
          <InfoItemDestacada
            icon={FaRulerCombined}
            text={`${formatearNumero(m2Totales)} m² Totales`}
          />
        )}

        {convertirNumero(m2Utiles) > 0 && (
          <InfoItemDestacada
            icon={FaRulerCombined}
            text={`${formatearNumero(m2Utiles)} m² Útiles`}
          />
        )}

        {dorms > 0 && (
          <InfoItemDestacada
            icon={FaBed}
            text={`${formatearNumero(dorms)} Dorm`}
          />
        )}

        {banos > 0 && (
          <InfoItemDestacada
            icon={FaBath}
            text={`${formatearNumero(banos)} Baños`}
          />
        )}
      </>
    );
  }

  if (tipo.includes("oficina")) {
    const habilitada =
      obtenerCampoExtra(item, "habilitada");

    const tipoEdificio =
      obtenerCampoExtra(item, "tipo edificio");

    const privados = convertirNumero(
      obtenerPrimerValor(
        item.detalles?.privados,
        obtenerCampoExtra(item, "privados")
      )
    );

    return (
      <>
        {convertirNumero(m2Construidos) > 0 && (
          <InfoItemDestacada
            icon={FaRulerCombined}
            text={`${formatearNumero(m2Construidos)} m²`}
          />
        )}

        {habilitada && (
          <InfoItemDestacada
            icon={FaCheckCircle}
            text={`Habilitada: ${habilitada}`}
          />
        )}

        {tipoEdificio && (
          <InfoItemDestacada
            icon={FaBuilding}
            text={`Edificio ${tipoEdificio}`}
          />
        )}

        {privados > 0 && (
          <InfoItemDestacada
            icon={FaDoorClosed}
            text={`${formatearNumero(privados)} Privados`}
          />
        )}
      </>
    );
  }

  if (tipo.includes("local")) {
    const habilitado =
      obtenerCampoExtra(item, "habilitado");

    return (
      <>
        {convertirNumero(m2Construidos) > 0 && (
          <InfoItemDestacada
            icon={FaRulerCombined}
            text={`${formatearNumero(m2Construidos)} m²`}
          />
        )}

        {habilitado && (
          <InfoItemDestacada
            icon={FaCheckCircle}
            text={`Habilitado: ${habilitado}`}
          />
        )}

        {estac > 0 && (
          <InfoItemDestacada
            icon={FaCar}
            text={`${formatearNumero(estac)} Estac.`}
          />
        )}

        {banos > 0 && (
          <InfoItemDestacada
            icon={FaBath}
            text={`${formatearNumero(banos)} Baños`}
          />
        )}
      </>
    );
  }

  if (
    tipo.includes("terreno industrial") ||
    tipo.includes("industrial")
  ) {
    const frente =
      obtenerCampoExtra(item, "frente");

    const fondo =
      obtenerCampoExtra(item, "fondo");

    return (
      <>
        {convertirNumero(m2Terreno) > 0 && (
          <InfoItemDestacada
            icon={FaRulerCombined}
            text={`${formatearNumero(m2Terreno)} m²`}
          />
        )}

        {frente && (
          <InfoItemDestacada
            icon={FaRulerVertical}
            text={`Frente: ${frente} mts`}
          />
        )}

        {fondo && (
          <InfoItemDestacada
            icon={FaRulerVertical}
            text={`Fondo: ${fondo} mts`}
          />
        )}
      </>
    );
  }

  if (tipo.includes("terreno")) {
    const uso =
      obtenerCampoExtra(item, "uso") ||
      obtenerCampoExtra(item, "destino");

    const densidad =
      obtenerCampoExtra(item, "densidad");

    const altura =
      obtenerCampoExtra(item, "altura");

    return (
      <>
        {convertirNumero(m2Terreno) > 0 && (
          <InfoItemDestacada
            icon={FaRulerCombined}
            text={`${formatearNumero(m2Terreno)} m²`}
          />
        )}

        {uso && (
          <InfoItemDestacada
            icon={FaTag}
            text={uso}
          />
        )}

        {densidad && (
          <InfoItemDestacada
            icon={FaBuilding}
            text={`Densidad: ${densidad}`}
          />
        )}

        {altura && (
          <InfoItemDestacada
            icon={FaRulerVertical}
            text={`Altura: ${altura}`}
          />
        )}
      </>
    );
  }

  return (
    <>
      {convertirNumero(
        item.detalles?.superficie
      ) > 0 && (
        <InfoItemDestacada
          icon={FaRulerCombined}
          text={`${formatearNumero(
            item.detalles.superficie
          )} m²`}
        />
      )}
    </>
  );
};


const fetchConTimeout = async (url, externalSignal, timeoutMs = 7000) => {
  const controller = new AbortController();
  const abortFromOutside = () => controller.abort();

  if (externalSignal) {
    if (externalSignal.aborted) controller.abort();
    externalSignal.addEventListener("abort", abortFromOutside, { once: true });
  }

  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
  } finally {
    window.clearTimeout(timeoutId);
    externalSignal?.removeEventListener("abort", abortFromOutside);
  }
};

const extraerListadoPropiedades = (payload) => {
  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.propiedades)) {
    return payload.propiedades;
  }

  if (Array.isArray(payload)) {
    return payload;
  }

  return [];
};

const extraerDetallePropiedad = (payload) => {
  const candidatos = [
    payload?.data?.propiedad,
    payload?.propiedad,
    payload?.data,
    payload,
  ];

  for (const candidato of candidatos) {
    if (
      candidato &&
      typeof candidato === "object" &&
      !Array.isArray(candidato)
    ) {
      return candidato;
    }
  }

  return null;
};

const combinarResumenConDetalle = (
  resumen,
  detalle
) => {
  if (!detalle) return resumen;

  return {
    ...resumen,
    ...detalle,

    ubicacion: {
      ...(resumen?.ubicacion || {}),
      ...(detalle?.ubicacion || {}),
    },

    detalles: {
      ...(resumen?.detalles || {}),
      ...(detalle?.detalles || {}),
    },

    precios: {
      ...(resumen?.precios || {}),
      ...(detalle?.precios || {}),
    },

    imagenes:
      detalle?.imagenes?.length > 0
        ? detalle.imagenes
        : detalle?.fotos?.length > 0
          ? detalle.fotos
          : resumen?.imagenes,

    fotos:
      detalle?.fotos?.length > 0
        ? detalle.fotos
        : resumen?.fotos,

    campos_especificos:
      detalle?.campos_especificos ||
      detalle?.camposEspecificos ||
      resumen?.campos_especificos ||
      resumen?.camposEspecificos ||
      [],

    caracteristicasExtra: [
      ...(Array.isArray(resumen?.caracteristicasExtra)
        ? resumen.caracteristicasExtra
        : []),
      ...(Array.isArray(detalle?.caracteristicasExtra)
        ? detalle.caracteristicasExtra
        : []),
      ...(Array.isArray(detalle?.campos_especificos)
        ? detalle.campos_especificos
        : []),
    ],
  };
};

const enriquecerPropiedadDestacada = async (
  propiedad,
  signal
) => {
  const codigo =
    propiedad.codigo ||
    propiedad.codigo_interno ||
    propiedad.codigo_propiedad ||
    propiedad.id_propiedad ||
    propiedad.id;

  if (!codigo) return propiedad;

  try {
    const response = await fetchConTimeout(
      `${API_URL}/api/propiedades/codigo/${encodeURIComponent(
        codigo
      )}`,
      signal,
      8000
    );

    if (!response.ok) {
      return propiedad;
    }

    const payload = await response.json();
    const detalle =
      extraerDetallePropiedad(payload);

    return combinarResumenConDetalle(
      propiedad,
      detalle
    );
  } catch (error) {
    if (error?.name === "AbortError") {
      throw error;
    }

    console.warn(
      `No fue posible enriquecer la destacada ${codigo}:`,
      error?.message || error
    );

    return propiedad;
  }
};


const solicitarTipoDestacado = async (
  tipoDestacado,
  signal
) => {
  /*
   * Primero intenta usar el endpoint dedicado de destacadas.
   * Toda la consulta pasa por el backend Node para que este agregue
   * las credenciales necesarias al comunicarse con la API Alaluf.
   */
  const paramsDestacadas = new URLSearchParams({
    tipo_prop: tipoDestacado.tipoId,
    limit: String(tipoDestacado.limit),
  });

  const endpointDestacadas =
    `${API_URL}/api/propiedades/destacadas?` +
    paramsDestacadas.toString();

  let response = null;
  let propiedades = [];

  try {
    response = await fetchConTimeout(
      endpointDestacadas,
      signal
    );

    if (response.ok) {
      const payload = await response.json();
      propiedades = extraerListadoPropiedades(payload);
    }
  } catch (error) {
    if (error?.name === "AbortError") {
      throw error;
    }

    response = null;
  }

  /*
   * Compatibilidad con el backend actual:
   * si /destacadas no existe, falla o responde vacío,
   * usa /buscar con destaq=true.
   */
  if (propiedades.length === 0) {
    const paramsBusqueda = new URLSearchParams({
      tipo_prop: tipoDestacado.tipoId,
      destaq: "true",
      page: "1",
      limit: String(tipoDestacado.limit),
    });

    response = await fetchConTimeout(
      `${API_URL}/api/propiedades/buscar?${paramsBusqueda.toString()}`,
      signal,
      12000
    );

    if (!response.ok) {
      let detail = "";

      try {
        const errorBody = await response.json();

        detail =
          errorBody?.error ||
          errorBody?.mensaje ||
          errorBody?.message ||
          "";
      } catch {
        // La respuesta podría no ser JSON.
      }

      throw new Error(
        `No fue posible obtener ${tipoDestacado.label}` +
        (detail ? `: ${detail}` : "")
      );
    }

    const payloadBusqueda = await response.json();
    propiedades =
      extraerListadoPropiedades(payloadBusqueda);
  }

  if (propiedades.length === 0) {
    throw new Error(
      `El backend no entregó propiedades destacadas para ${tipoDestacado.label}.`
    );
  }

  const propiedadesSeleccionadas =
    propiedades.slice(0, tipoDestacado.limit);

  const propiedadesEnriquecidas =
    await Promise.all(
      propiedadesSeleccionadas.map((propiedad) =>
        enriquecerPropiedadDestacada(
          propiedad,
          signal
        )
      )
    );

  return mapearDestacadas(
    propiedadesEnriquecidas,
    tipoDestacado
  );
};


const solicitarDestacadas = async (
  tab,
  signal
) => {
  const cacheKey = getCacheKey(tab);
  const cachedCards = getCachedCards(cacheKey);

  if (cachedCards) {
    return {
      cards: cachedCards,
      source: "frontend-cache",
    };
  }

  const tiposDestacados = featuredConfig[tab] || [];

  const resultados = await Promise.allSettled(
    tiposDestacados.map((tipoDestacado) =>
      solicitarTipoDestacado(
        tipoDestacado,
        signal
      )
    )
  );

  const cards = resultados.flatMap(
    (resultado, index) => {
      if (resultado.status === "fulfilled") {
        return resultado.value;
      }

      console.warn(
        `No fue posible cargar ${
          tiposDestacados[index]?.label || "un tipo destacado"
        }:`,
        resultado.reason?.message ||
          resultado.reason
      );

      return [];
    }
  );

  /*
   * Elimina posibles duplicados sin alterar el orden configurado:
   * Casas, Departamentos, Locales, etc.
   */
  const cardsUnicas = [];
  const identificadores = new Set();

  for (const card of cards) {
    const identificador = String(
      card.codigo || card.id
    );

    if (identificadores.has(identificador)) {
      continue;
    }

    identificadores.add(identificador);
    cardsUnicas.push(card);
  }

  if (cardsUnicas.length > 0) {
    saveCache(cacheKey, cardsUnicas);
  } else {
    memoryCache.delete(cacheKey);

    try {
      window.sessionStorage.removeItem(cacheKey);
    } catch {
      // No se pudo acceder a sessionStorage.
    }
  }

  return {
    cards: cardsUnicas,
    source: "backend",
  };
};


const EspecialPorArea = () => {
  const [activeTab, setActiveTab] = useState("Residencial");
  const [activeIndex, setActiveIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    const fetchDestacadas = async () => {
      setErrorMessage("");

      const cachedCards = getCachedCards(
        getCacheKey(activeTab)
      );

      if (cachedCards) {
        setCards(cachedCards);
        setLoading(false);
      } else {
        setLoading(true);
      }

      const startTime = performance.now();

      try {
        const resultado = await solicitarDestacadas(activeTab, controller.signal);

        if (!mounted || controller.signal.aborted) return;

        setCards(resultado.cards);

        const tiempoEnSegundos = (
          (performance.now() - startTime) / 1000
        ).toFixed(2);

        console.log(
          `🚀 [PERFORMANCE] Destacadas '${activeTab}': ${tiempoEnSegundos}s (${resultado.source})`
        );
      } catch (error) {
        if (error?.name === "AbortError") return;

        console.error(
          "Error obteniendo propiedades destacadas:",
          error
        );

        if (!cachedCards && mounted) {
          setCards([]);
          setErrorMessage(
            error?.message ||
            "No fue posible cargar las propiedades destacadas."
          );
        }
      } finally {
        if (mounted && !controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchDestacadas();
    setActiveIndex(0);

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [activeTab]);

  // Precarga las otras pestañas cuando el navegador queda libre. Esto no
  // bloquea la primera tarjeta y hace instantáneos los cambios posteriores.
  useEffect(() => {
    if (loading) return undefined;

    let cancelled = false;
    let idleId;
    let timeoutId;

    const prefetch = async () => {
      for (const tab of tabs) {
        if (cancelled || tab === activeTab) continue;

        if (
          getCachedCards(getCacheKey(tab))
        ) {
          continue;
        }

        try {
          await solicitarDestacadas(tab);
        } catch (error) {
          if (error?.name !== "AbortError") {
            console.warn(`No fue posible precargar '${tab}':`, error.message);
          }
        }
      }
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(prefetch, { timeout: 2500 });
    } else {
      timeoutId = window.setTimeout(prefetch, 1200);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [activeTab, loading]);

  useEffect(() => {
    if (cards.length <= 1) return undefined;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    }, 8000);

    return () => clearInterval(interval);
  }, [cards.length]);

  const handlePrev = () => {
    if (cards.length > 0) {
      setActiveIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
    }
  };

  const handleNext = () => {
    if (cards.length > 0) {
      setActiveIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    }
  };

  const getIndex = (index) => (index + cards.length) % cards.length;

  const compartirPropiedad = async (card) => {
    const shareUrl = `${window.location.origin}/propiedad/${card.codigo}`;

    const shareData = {
      title: card.titulo || "Propiedad destacada",
      text: `Revisa esta propiedad destacada en Alaluf`,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
    } catch (error) {
      if (error?.name === "AbortError") return;

      console.error(
        "No fue posible compartir la propiedad:",
        error
      );
    }
  };

  return (
    <section className="relative py-12 md:py-20 bg-cover bg-center text-white overflow-hidden" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Barra de Tabs */}
        <div className="relative flex items-center justify-center mb-8 md:mb-12 font-[Outfit] text-sm md:text-base w-full">
          <div className="hidden lg:block absolute -left-50 top-1/2 -translate-y-1/2 h-[1px] bg-[#05FFEA] w-[44%]"></div>
          <div className="relative flex gap-6 md:gap-8 px-2 md:px-6 overflow-x-auto whitespace-nowrap scrollbar-hide w-full lg:w-auto justify-start lg:justify-center pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`transition pb-1 ${
                  activeTab === tab
                    ? "text-cyan-400 font-semibold border-b border-cyan-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {tab}
                <span className="ml-1 text-[10px] opacity-60">
                  ({getTabLimit(tab)})
                </span>
              </button>
            ))}
          </div>
          <div className="hidden lg:block absolute -right-50 top-1/2 -translate-y-1/2 h-[1px] bg-[#05FFEA] w-[44%]"></div>
        </div>

        {/* Título */}
        <div className="text-center mb-8 md:mb-12 font-[Outfit] px-2">
          <h2 className="text-2xl md:text-[36px] font-medium text-[#0091A4] leading-tight mb-2">ESPECIAL POR ÁREA</h2>
          <p className="text-gray-300 text-sm md:text-base">Propiedades seleccionadas por nuestro equipo</p>
        </div>

        {/* Carga / Vacío */}
        {loading && <div className="text-center text-cyan-400 py-20 font-[Outfit] animate-pulse text-lg">Buscando propiedades destacadas...</div>}
        {!loading && cards.length === 0 && (
          <div className="mx-auto max-w-xl py-20 text-center font-[Outfit]">
            <p className="text-lg text-gray-300">
              No hay propiedades destacadas disponibles.
            </p>

            {errorMessage && (
              <p className="mt-3 text-sm text-amber-300/80">
                {errorMessage}
              </p>
            )}
          </div>
        )}

        {/* Carrusel */}
        {!loading && cards.length > 0 && (
          <div className="relative flex items-center justify-center gap-6 pt-10 md:pt-14 pb-8 md:pb-12">
            {cards.length > 1 && (
              <button onClick={handlePrev} className="hidden md:flex absolute -left-12 lg:-left-16 text-cyan-400 hover:scale-110 transition z-30">
                <ArrowLeft size={36} />
              </button>
            )}

            {[-1, 0, 1].map((offset) => {
              if (cards.length === 1 && offset !== 0) return null;
              const index = getIndex(activeIndex + offset);
              const isActive = offset === 0;
              const card = cards[index];

              const tieneVenta =
                convertirNumero(
                  card.precios?.venta?.valor
                ) > 0;

              const tieneArriendo =
                convertirNumero(
                  card.precios?.arriendo?.valor
                ) > 0;

              return (
                <motion.div
                  key={`${index}-${offset}`}
                  initial={{ scale: 0.85, opacity: 0.6 }}
                  animate={{
                    scale: isActive ? 1.18 : 0.85,
                    opacity: isActive ? 1 : 0.6,
                    y: isActive ? -20 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex flex-col overflow-hidden rounded-xl shadow-2xl md:flex-row md:rounded-none ${
                    isActive
                      ? "z-20 flex w-[280px] sm:w-[340px] md:w-[600px]"
                      : "z-10 hidden md:flex md:w-[340px] grayscale"
                  }`}
                >
                  <div className="relative h-[190px] w-full sm:h-[230px] md:h-auto md:min-h-[390px] md:w-[44%]">
                    <img
                      src={card.img}
                      alt={card.titulo || "Propiedad destacada"}
                      className="h-full w-full object-cover"
                      loading={isActive ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={isActive ? "high" : "auto"}
                    />

                    <span className="absolute left-3 top-3 bg-white px-3 py-1 font-[Outfit] text-xs font-medium text-black md:left-4 md:top-4 md:px-4 md:text-sm">
                      {card.tipo}
                    </span>
                  </div>

                  <div className="flex w-full flex-col bg-[#3a3a3a]/95 p-5 font-[Outfit] md:w-[56%] md:p-6">
                    <div className="flex-1">
                      <h3 className="mb-3 line-clamp-2 text-base font-semibold leading-tight sm:text-lg md:text-xl">
                        {card.ubicacion?.sector ||
                          card.titulo ||
                          "Propiedad destacada"}
                      </h3>

                      <div className="mb-3 flex items-start gap-2 text-xs text-gray-300 sm:text-sm">
                        <MapPin
                          size={16}
                          className="mt-0.5 shrink-0 text-cyan-400"
                        />

                        <span className="line-clamp-2">
                          {card.ubicacion?.comuna ||
                            "Consultar ubicación"}
                          {card.ubicacion?.region
                            ? `, ${card.ubicacion.region}`
                            : ""}
                        </span>
                      </div>

                      <div className="mb-4 flex flex-wrap gap-2">
                        {renderizarDetallesDestacada(card)}
                      </div>
                    </div>

                    <div className="mb-4 h-px w-full bg-cyan-400/80" />

                    <div
                      className={`mb-5 grid grid-cols-1 gap-3 ${
                        tieneVenta && tieneArriendo
                          ? "sm:grid-cols-2"
                          : ""
                      }`}
                    >
                      {tieneVenta && (
                        <div className="min-w-0 flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 sm:text-[11px]">
                            Venta
                          </span>

                          <span className="whitespace-nowrap text-[clamp(1.05rem,2vw,1.35rem)] font-black leading-tight text-white">
                            {formatearMoneda(
                              card.precios.venta.valor,
                              card.precios.venta.moneda
                            )}
                          </span>
                        </div>
                      )}

                      {tieneArriendo && (
                        <div className="min-w-0 flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 sm:text-[11px]">
                            Arriendo
                          </span>

                          <span className="whitespace-nowrap text-[clamp(1.05rem,2vw,1.35rem)] font-black leading-tight text-white">
                            {formatearMoneda(
                              card.precios.arriendo.valor,
                              card.precios.arriendo.moneda
                            )}
                          </span>
                        </div>
                      )}

                      {!tieneVenta && !tieneArriendo && (
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 sm:text-[11px]">
                            Precio
                          </span>

                          <span className="whitespace-nowrap text-[clamp(1.05rem,2vw,1.35rem)] font-black leading-tight text-white">
                            Consultar
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-auto flex items-center gap-3 md:gap-4">
                      <Link
                        to={`/propiedad/${card.codigo}`}
                        className="block flex-1 border border-cyan-400 py-2 text-center text-xs text-white transition hover:bg-cyan-400/10 sm:text-sm"
                      >
                        Ver ficha
                      </Link>

                      <button
                        type="button"
                        aria-label="Compartir esta propiedad"
                        title="Compartir propiedad"
                        onClick={() => compartirPropiedad(card)}
                        className="flex items-center justify-center border border-cyan-400 p-2 transition hover:bg-cyan-400/10"
                      >
                        <Share2
                          size={18}
                          className="text-cyan-400 md:h-5 md:w-5"
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {cards.length > 1 && (
              <button onClick={handleNext} className="hidden md:flex absolute -right-12 lg:-right-16 text-cyan-400 hover:scale-110 transition z-30">
                <ArrowRight size={36} />
              </button>
            )}
          </div>
        )}

        {!loading && cards.length > 1 && (
          <div className="flex md:hidden items-center justify-center gap-8 mt-2">
            <button onClick={handlePrev} className="text-cyan-400 bg-white/10 p-2 rounded-full hover:bg-cyan-400/20 transition"><ArrowLeft size={24} /></button>
            <button onClick={handleNext} className="text-cyan-400 bg-white/10 p-2 rounded-full hover:bg-cyan-400/20 transition"><ArrowRight size={24} /></button>
          </div>
        )}
      </div>
    </section>
  );
};

export default EspecialPorArea;