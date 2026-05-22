# Plan paso a paso: publicar el sitio nuevo

> 10 pasos. **No hay que hacer todo de una vez** — pausamos donde quieras. Te aviso cuándo me toca.

## Leyenda

- 👤 **Vos**: tarea en el navegador (clickear, llenar formularios, etc.)
- 🤖 **Yo**: comandos en la Terminal de tu Mac
- ⏱️ **Espera**: tiempo de propagación o build automático

---

## Paso 1 — Cuenta de GitHub
**👤 vos · 5 min · saltealo si ya tenés**

1. Ir a **[github.com](https://github.com)** → "Sign up"
2. Email tuyo + contraseña
3. Username sugerido: `germanmartinezkomorebi`, `komorebiagency`, o el que prefieras (es público pero podés cambiarlo después)
4. Confirmá el email

✅ Avisame cuando esté listo y me pasás el username.

---

## Paso 2 — Instalar git y GitHub CLI
**🤖 yo · 2 min**

Yo lo verifico y lo instalo si hace falta. Lo más probable es que git ya esté en tu Mac (viene con las Xcode Command Line Tools).

---

## Paso 3 — Conectar tu Mac con GitHub
**👤 vos + 🤖 yo · 3 min**

Yo corro `gh auth login`. Vos vas a tener que:
1. Abrir un navegador
2. Loguearte en GitHub
3. Pegar un código de 8 caracteres que te voy a dar

Una sola vez. Después queda autenticado para siempre.

---

## Paso 4 — Crear el repositorio y subir el sitio
**🤖 yo · 2 min**

Yo creo el repo en GitHub y subo todos los archivos. Vas a poder verlos online en `github.com/TU-USUARIO/komorebi-site` (o como lo nombremos).

---

## Paso 5 — Cuenta en Cloudflare
**👤 vos · 5 min**

1. Ir a **[dash.cloudflare.com](https://dash.cloudflare.com)** → "Sign up"
2. Email + contraseña
3. Confirmá el email
4. Plan: **Free** (no necesitás pagar nada)

✅ Avisame cuando estés dentro del dashboard.

---

## Paso 6 — Crear el sitio en Cloudflare Pages
**👤 vos · 5 min (te voy guiando)**

Acá te voy a ir indicando exactamente qué clickear. A grandes rasgos:

1. En el menú izquierdo del dashboard → **"Workers & Pages"**
2. **"Create application"** → tab **"Pages"** → **"Connect to Git"**
3. Conectá tu cuenta de GitHub (te pide permisos una vez)
4. Seleccioná el repo que creamos
5. Configuración del proyecto:
   - **Project name**: `komorebi-site` (o como quieras)
   - **Production branch**: `main`
   - **Framework preset**: **None**
   - **Build command**: *(dejar vacío)*
   - **Build output directory**: `/`
6. **"Save and Deploy"**

⏱️ En ~1 minuto vas a tener una URL temporal tipo `komorebi-site.pages.dev`.

---

## Paso 7 — Verificar el sitio en la URL temporal
**👤 vos · 5-10 min**

Abrí la URL temporal y revisá:

- [ ] Home se ve bien
- [ ] Navegación funciona (clickeás cada link del menú)
- [ ] El logo del header aparece
- [ ] El logo del footer aparece
- [ ] La foto de Germán en Consultoría se ve bien
- [ ] El form de contacto se ve bien (NO lo envíes todavía — ya está conectado a HubSpot)
- [ ] Las páginas se cargan rápido

Si algo no anda, decime y lo ajustamos antes de cambiar el DNS.

---

## Paso 8 — Backup del WordPress
**👤 vos · 20 min · podés hacerlo en paralelo desde el paso 1**

Seguir las instrucciones de `BACKUP-WORDPRESS.md`.

⚠️ **No saltees este paso** — una vez que cambiemos el DNS, el WordPress queda inaccesible desde el dominio.

---

## Paso 9 — Cambiar el DNS de WordPress → Cloudflare
**👤 vos · 10 min + ⏱️ propagación 5 min - 2 hs**

Este es el paso "crítico". Cuando lo hagas, el sitio nuevo reemplaza al WordPress.

Te voy a dar las instrucciones exactas cuando lleguemos. La idea general:

1. En GoDaddy → **Dominios → komorebiagency.com → DNS**
2. Borrar los registros A que apuntan al servidor de WordPress
3. Agregar los registros que Cloudflare Pages te indique (algo como `CNAME @ komorebi-site.pages.dev`)
4. Guardar

⏱️ Espera entre 5 minutos y 2 horas hasta que se propague (depende del proveedor de internet de cada visitante).

### Importante sobre el email
Si tenés email `@komorebiagency.com`:
- Los registros **MX** (mail exchange) NO se tocan
- Tu email sigue funcionando exactamente igual
- Solo cambiamos los registros A / CNAME del sitio web

Te confirmo esto contigo antes de hacer nada.

---

## Paso 10 — Verificar y cancelar WordPress
**👤 vos · 5 min ahora + esperar 24 hs antes de cancelar**

1. Abrí `komorebiagency.com` desde varios dispositivos (mobile, otra red wifi)
2. Verificá que se ve el sitio nuevo
3. Probá el form de contacto en producción
4. **Esperá 24-48 hs** para asegurar que no hay problemas
5. Recién entonces: GoDaddy → cancelar el plan de WordPress administrado

⚠️ **No canceles antes** — si hay un problema querrás poder revertir.

---

## ¿Y después? — Workflow de cambios futuros

Una vez todo en marcha, cualquier cambio se hace así:

1. Vos: *"Claude, cambiá tal cosa"*
2. 🤖 Yo: edito los archivos
3. 🤖 Yo: `git push` (1 comando)
4. ⏱️ ~30 segundos: el sitio está actualizado en producción

Cada cambio queda registrado. Si algo sale mal: rollback con 1 click.

---

## Cuando estés listo, arrancamos por el Paso 1

Decime cuando tengas tu cuenta de GitHub y empezamos.

Mientras tanto, podés ir avanzando con el Paso 8 (backup de WordPress) en paralelo.
