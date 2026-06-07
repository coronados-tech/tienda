# Coronados Tech-Hardware

Tienda online de componentes de PC desarrollada como Trabajo Práctico de **Construcción de Interfaces de Usuario (CIU)**.

## Descripción

**Coronados Tech-Hardware** es una aplicación web que simula una tienda especializada en hardware de computadoras. Los usuarios pueden explorar un catálogo de procesadores, placas de video, memorias RAM, almacenamiento, periféricos y más; filtrar y buscar productos; ver el detalle de cada componente; armar un carrito de compras y completar una compra simulada mediante un formulario controlado.

## Tecnologías utilizadas

- **React** (componentes funcionales + hooks)
- **React Router DOM** (navegación y rutas dinámicas)
- **React Bootstrap** + **Bootstrap 5** (diseño responsive)
- **Vite** (bundler y entorno de desarrollo)
- **localStorage** (persistencia del carrito — extra opcional)

## Funcionalidades implementadas

- Página de inicio con identidad visual, banner slider y productos destacados
- Catálogo con 15 productos de hardware (array de objetos)
- Detalle de producto con rutas dinámicas (`/producto/:id`)
- Carrito con cantidades, subtotales, total y confirmación simulada (modal)
- Búsqueda por nombre, filtro por categoría, filtro por precio máximo, orden por precio y filtro de stock
- Formulario controlado con validaciones
- Página Nosotros (extra opcional)
- Etiquetas: Nuevo, Oferta, Más vendido (extra opcional)

## Instalación y ejecución

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd coronados-tech-hardware

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

## Estructura del proyecto

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductoCard.jsx
│   ├── CarritoItem.jsx
│   ├── FormularioCompra.jsx
│   └── BannerSlider.jsx
├── pages/
│   ├── Inicio.jsx
│   ├── Productos.jsx
│   ├── DetalleProducto.jsx
│   ├── Carrito.jsx
│   ├── Contacto.jsx
│   └── Nosotros.jsx
├── context/
│   └── CarritoContext.jsx
├── data/
│   └── productos.js
├── App.jsx
└── main.jsx
```

## Integrantes del grupo

| Nombre          | Apellido           |
| --------------- | ------------------ |
| Malena Celeste  | Fernandez Mansilla |
| Rafael Alberto  | Barberi Salcedo    |
| Micaela Natalia | Signorello         |
| Carla Andrea    | Perez              |

## Entrega

- Repositorio público en GitHub
- Enviar link a: **\*\*\***
- Incluir datos de los integrantes en el mail

## Deploy (opcional)

El proyecto puede desplegarse en **Vercel**, **Netlify** o **GitHub Pages**.

---

Universidad Nacional de Hurlingham — Construcción de Interfaces de Usuario
