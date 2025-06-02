# Plan de Optimización SEO

## 1. Auditoría SEO y Configuración Inicial

### 1.1 Registro en Google Search Console
- Añadir dominio y verificar propiedad en Google Search Console para enviar sitemaps, monitorizar errores de rastreo y medir la cobertura de índice :contentReference[oaicite:0]{index=0}.

### 1.2 Configuración de Google Analytics y Consentimiento de Cookies
- Crear una propiedad de Google Analytics 4 y obtener el Measurement ID (analytics key) :contentReference[oaicite:1]{index=1}.  
- Implementar un banner de consentimiento que bloquee la carga de GA hasta que el usuario dé su consentimiento, usando Consent Mode V2 y un CMP como Cookiebot o CookieConsent.com :contentReference[oaicite:2]{index=2}.  
- Actualizar la política de privacidad para incluir detalles sobre el uso de cookies y la recolección de datos :contentReference[oaicite:3]{index=3}.

---

## 2. SEO Técnico

### 2.1 Rendimiento y Core Web Vitals
- Optimizar LCP, FID/INP y CLS con Lighthouse y CrUX :contentReference[oaicite:4]{index=4}.  
- Usar `next/image` para servir imágenes responsive en WebP automáticamente :contentReference[oaicite:5]{index=5}.  
- Habilitar prefetching y code splitting con `next/dynamic` y `<Script>` de Next.js para mejorar tiempos de carga :contentReference[oaicite:6]{index=6}.  
- Minimizar scripts de terceros y cargar diferido para reducir bloqueos de renderizado :contentReference[oaicite:7]{index=7}.  

### 2.2 Next.js: Metadata y Sitemaps
- Definir metadata estática en cada página con la API de Metadata de Next.js (`export const metadata`) :contentReference[oaicite:8]{index=8}.  
- Generar metadata dinámica con `generateMetadata` para títulos y descripciones personalizadas :contentReference[oaicite:9]{index=9}.  
- Implementar un sitemap dinámico vía `/api/sitemap.xml` o usando el plugin `next-sitemap`, que se regenere al publicar nuevo contenido :contentReference[oaicite:10]{index=10}.  

### 2.3 Optimización de TailwindCSS
- Configurar el purgado de clases no usadas en producción ajustando `tailwind.config.js` para tree-shaking de CSS innecesario :contentReference[oaicite:11]{index=11}.  
- Aplicar prácticas de CSS atómico: usar variantes responsivas (`sm:`, `md:`) y evitar estilos inline excesivos :contentReference[oaicite:12]{index=12}.  

### 2.4 Seguridad y HTTPS
- Asegurar HTTPS con HSTS configurado mediante el header `Strict-Transport-Security` :contentReference[oaicite:13]{index=13}.  
- Configurar cabeceras de seguridad (`Content-Security-Policy`, `X-Frame-Options`) en `next.config.js` o en Vercel para proteger contra XSS y clickjacking :contentReference[oaicite:14]{index=14}.  

---

## 3. Contenido y Estructura

### 3.1 Investigación de Palabras Clave y E-E-A-T
- Realizar keyword research avanzado con Google Keyword Planner y Ahrefs, enfocándose en long-tail y términos transaccionales :contentReference[oaicite:15]{index=15}.  
- Refuerza E-E-A-T (experience, expertise, authoritativeness, trustworthiness) con biografías de autores, fuentes confiables y actualizaciones periódicas de contenido :contentReference[oaicite:16]{index=16}.  

### 3.2 Datos Estructurados y Rich Snippets
- Implementar JSON-LD para `Product`, `Organization`, `BreadcrumbList` y `FAQPage` en las páginas relevantes :contentReference[oaicite:17]{index=17}.  
- Verificar el marcado con Google Rich Results Test y corregir errores :contentReference[oaicite:18]{index=18}.  
- Usar HTML semántico (`<article>`, `<section>`, `<h1>`–`<h6>`) para mejorar la comprensión de Google :contentReference[oaicite:19]{index=19}.  

### 3.3 Estrategia de Cero-Click
- Redactar fragmentos concisos y directos para capturar posiciones en “answer boxes” y “People Also Ask” .  
- Crear contenido “Ranch-Style”: varias piezas cortas interconectadas que respondan preguntas específicas para aparecer en AI Overviews (AIOs) .  

---

## 4. Optimización On-Page

### 4.1 Meta Tags y Estructura de URL
- Revisar y optimizar títulos de página (50–60 caracteres) y descripciones meta (150–160 caracteres) .  
- Garantizar URLs limpias y descriptivas (por ejemplo, `/servicios/optimizacion-seo`) en lugar de parámetros .  

### 4.2 Imágenes y Accesibilidad
- Añadir atributos `alt` descriptivos en todas las imágenes para mejorar SEO y accesibilidad :contentReference[oaicite:24]{index=24}.  
- Verificar contraste de colores y roles ARIA para asegurar accesibilidad y mejorar el SEO indirecto :contentReference[oaicite:25]{index=25}.  

---

## 5. SEO Local y Link Building

### 5.1 Perfil de Google Business
- Optimizar ficha de Google Business Profile con horarios, fotos y reseñas actualizadas :contentReference[oaicite:26]{index=26}.  
- Asegurar consistencia del NAP (Name, Address, Phone) en la web y directorios locales :contentReference[oaicite:27]{index=27}.  

### 5.2 Estrategia de Backlinks
- Identificar oportunidades de guest blogging y menciones en blogs y medios relevantes :contentReference[oaicite:28]{index=28}.  
- Contactar partners y medios para obtener enlaces contextuales de alta autoridad :contentReference[oaicite:29]{index=29}.  

---

## 6. Monitorización y Reporting

### 6.1 Herramientas Clave
- Configurar alertas en Google Analytics 4 y Search Console para detectar caídas de tráfico o errores de cobertura :contentReference[oaicite:30]{index=30}.  
- Integrar Real User Monitoring (Web Vitals JS) para rastrear métricas en tiempo real :contentReference[oaicite:31]{index=31}.  

### 6.2 Ajustes Continuos
- Revisar mensualmente o trimestralmente informes de Core Web Vitals, cobertura de índice y rendimiento de palabras clave :contentReference[oaicite:32]{index=32}.  
- Actualizar contenido con bajo CTR o altas tasas de rebote para mejorar engagement y posicionamiento :contentReference[oaicite:33]{index=33}.  
