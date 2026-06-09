# Coronados Tech-Hardware

Tienda online de componentes de PC desarrollada como Trabajo Práctico de **Construcción de Interfaces de Usuario (CIU)**.

**Estado:** proyecto completado · **Deploy:** [coronados.vercel.app](https://coronados.vercel.app/)

## Descripción

**Coronados Tech-Hardware** es una SPA que simula una tienda especializada en hardware de computadoras. Los usuarios pueden explorar un catálogo de componentes, filtrar y buscar productos, ver el detalle de cada uno, marcar favoritos, armar un carrito con descuentos y completar una compra simulada con checkout y confirmación dedicados.

## Tecnologías utilizadas

| Tecnología | Uso |
| --- | --- |
| **React 19** | Componentes funcionales + hooks |
| **React Router DOM 7** | Navegación y rutas dinámicas |
| **React Bootstrap** + **Bootstrap 5** | Layout y diseño responsive |
| **Vite 8** | Bundler y entorno de desarrollo |
| **localStorage** | Persistencia del carrito, favoritos y tema |

## Funcionalidades implementadas

### Catálogo y productos

- Página de inicio con identidad visual, banner slider y productos destacados
- Catálogo con **15 productos** de hardware (array de objetos) en **9 categorías**
- Rutas por categoría (`/productos/categoria/:categoriaSlug`)
- Detalle de producto con galería de imágenes, zoom, breadcrumbs y características técnicas
- Búsqueda por nombre, filtro por categoría, filtro por precio máximo, orden por precio y filtro de stock
- Etiquetas visuales: **Nuevo**, **Oferta**, **Más vendido**
- Compartir producto (WhatsApp, X/Twitter, copiar enlace)

### Carrito y compra

- Carrito con cantidades, subtotales, control de stock y persistencia en `localStorage`
- Descuento automático del **15%** en compras mayores a **$300.000** (con barra de progreso)
- Cupón de descuento (**`NEW`** → 10% adicional, acumulable con el descuento por volumen)
- Checkout en página dedicada (`/carrito/finalizar`) con formulario de envío validado
- Confirmación de compra con código de pedido, resumen y datos del cliente (`/carrito/confirmacion`)

### Extras

- **Favoritos** con persistencia en `localStorage` (`/favoritos`)
- **Modo claro / oscuro** con preferencia guardada y detección del sistema
- Página **Nosotros** con integrantes del grupo
- Página **Contacto** con formulario validado y datos de la sucursal
- Animaciones de feedback al agregar al carrito o marcar favoritos

## Rutas principales

| Ruta | Descripción |
| --- | --- |
| `/` | Inicio |
| `/productos` | Catálogo completo |
| `/productos/categoria/:categoriaSlug` | Catálogo filtrado por categoría |
| `/producto/:id` | Detalle de producto |
| `/carrito` | Carrito de compras |
| `/carrito/finalizar` | Checkout (formulario + resumen) |
| `/carrito/confirmacion` | Confirmación de compra |
| `/favoritos` | Productos favoritos |
| `/nosotros` | Sobre el equipo |
| `/contacto` | Formulario de contacto |

## Patrones de diseño

| Patrón | Dónde se aplica |
| --- | --- |
| **Strategy** | Filtros y ordenamiento del catálogo (`src/patterns/strategy/productFilters.js`) y reglas de descuento del carrito (`src/patterns/strategy/discountStrategies.js`) |
| **Decorator** | Badges sobre la imagen del producto — Nuevo, Oferta, sin stock (`src/components/ProductImageFrame.jsx`) |
| **Template Method** | Validación del formulario de compra (`src/utils/validacionCompra.js`) |
| **Context API** | Estado global del carrito, favoritos y tema (`src/context/`) |

## Estructura del proyecto

```
src/
├── components/     # UI reutilizable (Navbar, ProductCard, FormularioCompra, ResumenCompra, etc.)
├── context/        # CartContext, FavoritesContext, ThemeContext
├── data/           # products.js, integrantes.js
├── hooks/          # useCoupon, useActionAnimation, useBumpOnIncrease
├── pages/          # Vistas por ruta (Home, Products, Cart, Checkout, PurchaseConfirmation, etc.)
├── patterns/       # Strategy (filtros y descuentos)
└── utils/          # Imágenes, categorías, etiquetas, compartir producto
```

## Instalación y ejecución

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd tienda

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

La app estará disponible en `http://localhost:5173`.

## Integrantes del grupo

| Nombre          | Apellido           | DNI         |
| --------------- | ------------------ | ----------- |
| Malena Celeste  | Fernandez Mansilla | 34.101.003  |
| Rafael Alberto  | Barberi Salcedo    | 95.151.120  |
| Micaela Natalia | Signorello         | 38.624.940  |
| Carla Andrea    | Perez              | 34.259.069  |

## Deploy

Producción: **https://coronados.vercel.app/**

---

Universidad Nacional de Hurlingham — Construcción de Interfaces de Usuario
