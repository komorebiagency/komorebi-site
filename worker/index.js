// Komorebi — Worker de routing/SEO delante de los assets estáticos.
// Solo lógica de redirects/410. No modifica contenido.

// 5) Migración 301 + 410 del WordPress viejo
const REDIRECTS_301 = {
  "/digital-marketing-strategy": "/servicios",
  "/servicios-de-marketing-y-customer-experience": "/servicios",
  "/sobre-komorebi": "/sobre",
  "/blog/ab-testing-y-cro/como-definir-una-hipotesis-solida-de-ab-testing": "/hipotesis-ab-testing",
  "/blog/ab-testing-y-cro/primeros-pasos-en-el-a-b-testing": "/primeros-pasos-ab-testing",
  "/blog/estrategia-digital/como-crear-una-estrategia-de-marketing-digital": "/como-crear-estrategia-marketing-digital",
  "/blog/estrategia-digital/estrategias-de-marketing-digital": "/estrategia-marketing-digital-exitosa",
  "/blog/seo/como-asegurar-el-rastreo-e-indexado-de-paginas-para-seo": "/rastreo-indexado-seo",
  "/blog/seo/seo-y-motores-de-busqueda-primeros-conceptos": "/seo-primeros-conceptos",
  "/blog/ab-testing-y-cro": "/blog",
  "/blog/estrategia-digital": "/blog",
  "/blog/seo": "/blog",
  "/privacy": "/",
  "/terms": "/"
};
const GONE_PREFIXES = ["/project/", "/dt_testimonials/", "/products/"];
const GONE_EXACT = new Set(["/cart", "/checkout", "/my-account", "/shop"]);

function handleLegacy(url) {
  let p = url.pathname;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  if (GONE_EXACT.has(p) || GONE_PREFIXES.some(pre => (p + "/").startsWith(pre)))
    return new Response("Gone", { status: 410 });
  if (REDIRECTS_301[p])
    return Response.redirect("https://komorebiagency.com" + REDIRECTS_301[p], 301);
  return null;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 5) Legacy WordPress: 301 a la URL nueva o 410 Gone
    const legacy = handleLegacy(url);
    if (legacy) return legacy;

    // 1) www -> no-www (301 permanente, mismo path + query)
    if (url.hostname === "www.komorebiagency.com") {
      url.hostname = "komorebiagency.com";
      return Response.redirect(url.toString(), 301);
    }

    // 2) /pagina.html -> /pagina (301 permanente). index.html -> /
    if (url.pathname.endsWith(".html")) {
      let p = url.pathname.slice(0, -5);
      if (p === "/index") p = "/";
      url.pathname = p;
      return Response.redirect(url.toString(), 301);
    }

    // Servir el asset estático tal cual
    return env.ASSETS.fetch(request);
  }
};
