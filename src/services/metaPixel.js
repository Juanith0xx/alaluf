const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;

let isInitialized = false;

/**
 * Verifica si Meta Pixel está disponible en el navegador.
 */
const isMetaPixelAvailable = () => {
  return (
    typeof window !== "undefined" &&
    typeof window.fbq === "function"
  );
};

/**
 * Inicializa Meta Pixel una sola vez.
 */
export const initMetaPixel = () => {
  if (typeof window === "undefined") {
    return false;
  }

  if (!META_PIXEL_ID) {
    console.warn(
      "Meta Pixel no fue inicializado: falta VITE_META_PIXEL_ID"
    );

    return false;
  }

  if (isInitialized && isMetaPixelAvailable()) {
    return true;
  }

  if (isMetaPixelAvailable()) {
    isInitialized = true;
    return true;
  }

  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) {
      return;
    }

    n = f.fbq = function () {
      n.callMethod
        ? n.callMethod.apply(n, arguments)
        : n.queue.push(arguments);
    };

    if (!f._fbq) {
      f._fbq = n;
    }

    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];

    t = b.createElement(e);
    t.async = true;
    t.src = v;

    s = b.getElementsByTagName(e)[0];

    if (s?.parentNode) {
      s.parentNode.insertBefore(t, s);
    } else {
      b.head.appendChild(t);
    }
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
  );

  if (!isMetaPixelAvailable()) {
    console.warn(
      "Meta Pixel no pudo inicializarse correctamente"
    );

    return false;
  }

  window.fbq("init", META_PIXEL_ID);

  isInitialized = true;

  if (import.meta.env.DEV) {
    console.log("✅ Meta Pixel inicializado:", META_PIXEL_ID);
  }

  return true;
};

/**
 * Registra una visita de página.
 */
export const trackPageView = () => {
  if (!isMetaPixelAvailable()) {
    return false;
  }

  window.fbq("track", "PageView");

  if (import.meta.env.DEV) {
    console.log("📊 Meta Pixel PageView enviado");
  }

  return true;
};

/**
 * Registra un evento estándar de Meta.
 *
 * Ejemplos:
 * Search
 * ViewContent
 * Contact
 * Lead
 */
export const trackMetaEvent = (
  eventName,
  parameters = {}
) => {
  if (!eventName || typeof eventName !== "string") {
    console.warn(
      "Meta Pixel: debes indicar un nombre de evento válido"
    );

    return false;
  }

  if (!isMetaPixelAvailable()) {
    return false;
  }

  window.fbq("track", eventName, parameters);

  if (import.meta.env.DEV) {
    console.log(
      `📊 Meta Pixel evento estándar enviado: ${eventName}`,
      parameters
    );
  }

  return true;
};

/**
 * Registra un evento personalizado.
 */
export const trackMetaCustomEvent = (
  eventName,
  parameters = {}
) => {
  if (!eventName || typeof eventName !== "string") {
    console.warn(
      "Meta Pixel: debes indicar un nombre de evento personalizado válido"
    );

    return false;
  }

  if (!isMetaPixelAvailable()) {
    return false;
  }

  window.fbq("trackCustom", eventName, parameters);

  if (import.meta.env.DEV) {
    console.log(
      `📊 Meta Pixel evento personalizado enviado: ${eventName}`,
      parameters
    );
  }

  return true;
};