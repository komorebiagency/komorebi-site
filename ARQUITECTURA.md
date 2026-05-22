# Arquitectura del nuevo sitio Komorebi

> Documento de referencia. No es necesario que entiendas todo de una — leélo de a poco.

---

## En una imagen

```
┌──────────────────────┐
│   Tu Mac             │   acá editás los archivos
│   /Sitio Web Komorebi│   (lo que ya tenés hoy)
└─────────┬────────────┘
          │
          │   git push   (lo hago yo desde la Terminal)
          ▼
┌──────────────────────┐
│   GitHub             │   acá viven los archivos
│   (repositorio)      │   versionados — gratis
└─────────┬────────────┘
          │
          │   deploy automático (~30 segundos)
          ▼
┌──────────────────────┐
│   Cloudflare Pages   │   acá se hospeda el sitio
│   (hosting + CDN)    │   gratis, con SSL y CDN mundial
└─────────┬────────────┘
          │
          │   los visitantes acceden a través del dominio
          ▼
┌──────────────────────┐
│   komorebiagency.com │   tu dominio (sigue en GoDaddy)
└──────────────────────┘
```

---

## Las piezas, una por una

### 1. Tu Mac
Lo de siempre. Acá están los archivos `index.html`, `servicios.html`, etc. Cuando hagamos cambios, los hacemos acá primero.

### 2. GitHub — *gratis*
Pensalo como **Google Drive para código**. Tres ventajas:
- **Historial completo**: cada cambio queda guardado. Si rompemos algo, volvemos atrás en un click.
- **Backup automático**: los archivos viven en GitHub Y en tu Mac. Si tu disco falla, no perdés nada.
- **Disparador del deploy**: cuando subo cambios a GitHub, automáticamente se publican.

### 3. Cloudflare Pages — *gratis*
Es **el hosting**: la computadora siempre prendida que sirve tu sitio a los visitantes. Tres cosas importantes:
- **CDN mundial**: tiene servidores en todo el planeta. Cuando alguien en Buenos Aires entra al sitio, lo baja del servidor de Buenos Aires (rápido). Cuando alguien en Madrid entra, lo baja del servidor de Madrid.
- **HTTPS automático**: el candadito verde del navegador, sin que tengamos que configurar nada.
- **Deploys atómicos**: cada cambio crea una "versión". Podés ver versiones anteriores y volver a una con 1 click.

### 4. GoDaddy
Lo único que vas a seguir teniendo en GoDaddy es **el dominio** (`komorebiagency.com`). Es como tu dirección postal — apunta a donde vos quieras. Hoy apunta a WordPress; lo vamos a redireccionar a Cloudflare Pages.

### 5. DNS
Es la "guía telefónica de internet". Cuando alguien escribe `komorebiagency.com`, el DNS le dice al navegador: *"el sitio está en tal servidor"*. Acá vamos a cambiar la dirección de WordPress → Cloudflare Pages.

---

## ¿Qué pasa cuando editamos algo?

1. Vos me decís: *"cambiá tal cosa en la home"*
2. Yo edito el archivo en tu Mac
3. Yo corro `git push` (subo el cambio a GitHub)
4. GitHub avisa a Cloudflare: *"hay cambios"*
5. Cloudflare publica la nueva versión
6. **En ~30 segundos** los visitantes ven el cambio

Todo el flujo lo manejo yo desde la Terminal. **Vos no necesitás aprender git, ni HTML, ni nada técnico** — solo decirme qué cambiar.

---

## Costos

| Componente | Costo mensual |
|---|---|
| Dominio (GoDaddy) | Lo que ya pagás (~USD 1-2/mes) |
| GitHub (repo) | **$0** |
| Cloudflare Pages | **$0** (free tier: builds ilimitados, CDN, SSL) |
| Email en el dominio (si tenés) | Lo que ya pagás |
| **WordPress administrado** | **Lo cancelás** → ahorro de USD 10-25/mes |

Net: **vas a pagar menos de lo que pagás hoy**, con mejor performance y más control.

---

## Comparación con lo que tenés hoy

| Cosa | WordPress hoy | Sitio nuevo |
|---|---|---|
| Velocidad | Variable (depende del plan) | Muy rápida (CDN global) |
| Updates de seguridad | Hay que estar arriba | No aplica (no hay backend) |
| Plugins que se rompen | Pasa | No aplica |
| Editar contenido | Desde wp-admin | Decime a mí, yo lo hago |
| Backup | Automático en GoDaddy | Automático en GitHub (cada cambio) |
| Costo | USD 10-25/mes | USD 0/mes (excepto dominio) |
| Posibilidad de migrar a otro host | Difícil | Trivial — los archivos son tuyos |

---

## Glosario

- **Repo / repositorio**: carpeta de archivos versionada en GitHub
- **Commit**: una "foto" de los archivos en un momento dado. Cada cambio queda como un commit.
- **Push**: subir los commits locales a GitHub
- **Deploy**: publicar la versión nueva del sitio
- **DNS**: el sistema que traduce `komorebiagency.com` en una dirección de servidor
- **CDN**: red de servidores distribuidos por el mundo para entregar contenido rápido
- **SSL/HTTPS**: el candadito verde — encripta la conexión entre el visitante y tu sitio
- **CLI**: línea de comandos (Terminal). Lo que yo uso para hacer cambios.
