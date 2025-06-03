# 🌟 Tu Personaje Favorito

Una galería interactiva en React para agregar, editar, eliminar y marcar a tus personajes favoritos del universo de **Steven Universe** (¡u otros que tú mismo crees!).

## 🧩 Funcionalidades

- 📌 Mostrar una galería de personajes con imágenes, nombres y descripciones.
- ➕ Agregar nuevos personajes personalizados.
- 📝 Editar los datos de un personaje existente.
- ❌ Eliminar personajes y restaurarlos luego.
- ❤️ Marcar tus personajes favoritos.
- 💾 Persistencia en `localStorage`.

## 🚀 Tecnologías utilizadas

- **React** (con Hooks)
- **JavaScript**
- **HTML / CSS inline**
- **localStorage** para persistencia
- Sin dependencias externas (sin Redux, sin backend)

## 📂 Estructura del proyecto

```

tu-personaje-favorito/
├── src/
│   ├── App.jsx               # Componente principal con toda la lógica de negocio
│   ├── main.jsx              # Punto de entrada para renderizar React
│   ├── components/
│   │   └── Personaje.jsx     # Componente visual y funcional para mostrar cada personaje
│   └── assets/               # Imágenes de personajes por defecto
│       ├── RoseQuartz.jpg
│       ├── garnet.jpg
│       ├── amatista.jpg
│       └── perla.jpg

```

## 🧪 Cómo ejecutar el proyecto

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-personaje-favorito.git
   cd tu-personaje-favorito
   ```

2. Instala las dependencias (si aplica):

   ```bash
   npm install
   ```

3. Ejecuta la aplicación:

   ```bash
   npm run dev
   ```

> ⚠️ Asegúrate de tener instalado **Node.js** y **Vite** para desarrollo local.

## 🛠️ Personalización

Puedes agregar nuevos personajes incluyendo:

* Nombre
* Descripción
* URL de la imagen (también se aceptan rutas locales)
* Color de fondo del personaje

Además, puedes editar o restaurar personajes eliminados.

## 📦 Posibles mejoras futuras

* Conexión a base de datos o backend
* Subida de imágenes personalizadas
* Filtrado o búsqueda por nombre
* Animaciones con CSS

## 👨‍💻 Autor
> Bianka Kelly

Desarrollado como proyecto de práctica para React y manejo de estados locales.

---

¡Explora, crea y comparte tu galería de personajes favoritos! 💖
