# Backup del WordPress actual

> **Importante**: hacé esto ANTES de tocar el DNS. Si algo sale mal, te asegurás de no perder nada.

Vamos a sacar **3 copias** distintas porque cada una protege algo diferente.

---

## (A) Exportar el contenido del blog — 5 min

Esto es lo más importante: te da todas las entradas en un archivo XML que después podemos migrar al sitio nuevo.

1. Entrá al admin de WordPress: **`komorebiagency.com/wp-admin`**
2. En el menú lateral izquierdo: **Herramientas → Exportar**
3. Seleccioná **"Todo el contenido"**
4. Click en **"Descargar archivo de exportación"**
5. Te baja un archivo `.xml` (algo como `komorebi.WordPress.2026-MM-DD.xml`)
6. Guardalo en: `/Users/germanmartinez/Documents/Sitio Web Komorebi/backup-wordpress/`

Adentro del XML hay: entradas, páginas, categorías, etiquetas, comentarios, autores, todo.

---

## (B) Descargar las imágenes y archivos del blog — 10 min

El XML del paso A NO incluye las imágenes — solo los links a las imágenes. Hay que bajarlas aparte.

### Opción rápida: con un plugin
1. En el admin: **Plugins → Añadir nuevo**
2. Buscá: **"Export Media Library"**
3. Instalar → Activar
4. Ir a **Medios → Export**
5. Configurá:
   - Folder structure: *Single folder with all files*
   - Compress: *Yes*
6. Descargá el ZIP

### Opción manual: una por una
**Medios → Biblioteca** → click en cada imagen → "Descargar archivo". Solo si son pocas.

Guardá todo en `/backup-wordpress/imagenes/`.

---

## (C) Backup completo desde GoDaddy — 5 min

GoDaddy hace backups automáticos diarios, pero para tener uno **manual de este momento exacto**:

1. Entrá a tu cuenta GoDaddy: **godaddy.com → Iniciar sesión**
2. **Mis productos → WordPress administrado → tu sitio → Administrar**
3. En el panel del sitio, buscá la sección **"Copias de seguridad"** (o "Backups" si está en inglés)
4. Click en **"Crear copia de seguridad ahora"** (o "Create backup now")
5. Esperá a que termine (5-10 minutos)
6. Cuando esté listo, vas a tener la opción de **descargar** el archivo (suele ser un .zip grande)
7. Guardalo en `/backup-wordpress/godaddy-full-backup/`

Si no encontrás la opción de descarga, la copia queda en los servidores de GoDaddy y se puede restaurar desde ahí.

---

## Cuando termines los 3 backups

Avisame y revisamos juntos:
- **Cuántas entradas hay en el blog actual**
- **Si las imágenes están en buen tamaño o necesitan optimización**
- **Cómo las migramos al sitio nuevo** (probablemente convirtiéndolas a HTML estático, o sumando un mini-sistema de blog tipo Markdown)

---

## ¿Por qué 3 backups distintos?

| Backup | Protege contra | Sirve para |
|---|---|---|
| (A) XML | Perder el contenido de las entradas | Migrar al sitio nuevo |
| (B) Imágenes | Perder los archivos visuales | Migrar al sitio nuevo |
| (C) GoDaddy full | Cualquier desastre | Restaurar el WordPress completo si hace falta |

Con los 3, tenés todo lo necesario para reconstruir el sitio actual desde cero, incluso si GoDaddy desapareciera mañana.
