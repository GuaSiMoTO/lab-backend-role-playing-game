# React + Frontend - RPG Battle Arena

## Descripción General

Este es el frontend de la aplicación RPG Battle Arena, una Single Page Application (SPA) construida con React 19 y Vite. La aplicación permite a los usuarios gestionar personajes, crear nuevos héroes (manuales o aleatorios), y simular combates entre ellos.

**Stack tecnológico:** React 19, Vite, JavaScript

---

## Características Principales

- **Gestión de Personajes:** Visualización de todos los personajes con sus estadísticas
- **Creación de Héroes:** Formulario para crear personajes manuales o aleatorios
- **Arena de Combate:** Selección de dos personajes y simulación de combate en tiempo real
- **Sistema de Imágenes:** Imágenes dinámicas según categoría y especie del personaje
- **Navegación Intuitiva:** Sistema de pestañas para fácil navegación
- **Diseño Responsivo:** Interfaz adaptable a diferentes tamaños de pantalla

---

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/              # Componentes React
│   │   ├── layout/              # Componentes de layout
│   │   │   ├── Header.jsx       # Cabecera de la aplicación
│   │   │   └── Footer.jsx       # Pie de página
│   │   ├── Navigation.jsx       # Navegación principal
│   │   ├── HeroesSection.jsx    # Sección de lista de personajes
│   │   ├── HeroCard.jsx         # Tarjeta individual de personaje
│   │   ├── InscriptionForm.jsx  # Formulario de inscripción
│   │   ├── DuelArena.jsx        # Arena de combate
│   │   ├── CombatantSlot.jsx    # Slot de combatiente
│   │   └── RPGCard.jsx          # Componente de tarjeta RPG
│   ├── services/                # Servicios de API
│   │   └── api.js               # Cliente HTTP para comunicación con backend
│   ├── utils/                   # Utilidades
│   │   └── characterImages.js    # Mapeo de imágenes por categoría/especie
│   ├── assets/                  # Imágenes estáticas
│   │   ├── guerrero-humano.png
│   │   ├── guerrero-enan.png
│   │   ├── guerrero-elfo.png
│   │   ├── explorador-humano.png
│   │   ├── explorador-enano.png
│   │   ├── explorador-elfo.png
│   │   ├── mago-humano.png
│   │   ├── mago-enano.png
│   │   └── mago-elfo.png
│   ├── App.jsx                  # Componente principal
│   ├── App.css                  # Estilos globales
│   ├── main.jsx                 # Punto de entrada
│   └── index.css                # Estilos base
├── public/                      # Archivos públicos
│   ├── favicon.svg
│   └── icons.svg
├── index.html                   # HTML principal
├── vite.config.js               # Configuración de Vite
├── eslint.config.js             # Configuración de ESLint
└── package.json                 # Dependencias del proyecto
```

---

## Componentes Principales

### App.jsx
Componente principal que gestiona el estado de la aplicación y la navegación entre secciones.

**Estado:**
- `tab`: Pestaña activa (heroes, inscribir, duelo)
- `sel1`: Personaje seleccionado para el slot 1
- `sel2`: Personaje seleccionado para el slot 2

---

### Navigation.jsx
Componente de navegación que permite cambiar entre las diferentes secciones de la aplicación.

**Props:**
- `activeTab`: Pestaña actualmente activa
- `onTabChange`: Callback para cambiar de pestaña

---

### HeroesSection.jsx
Sección que muestra la lista de todos los personajes disponibles.

**Funcionalidades:**
- Listado de personajes con sus estadísticas
- Filtros por especie y categoría
- Selección de personajes para combate
- Eliminación de personajes

**Props:**
- `onPickSlot1`: Callback para seleccionar personaje para slot 1
- `onPickSlot2`: Callback para seleccionar personaje para slot 2
- `sel1`: Personaje seleccionado en slot 1
- `sel2`: Personaje seleccionado en slot 2

---

### HeroCard.jsx
Tarjeta individual que muestra la información de un personaje.

**Props:**
- `hero`: Objeto con datos del personaje
- `onSelect`: Callback para seleccionar el personaje
- `onDelete`: Callback para eliminar el personaje
- `isSelected`: Indica si está seleccionado

---

### InscriptionForm.jsx
Formulario para crear nuevos personajes, ya sea de forma manual o aleatoria.

**Funcionalidades:**
- Creación manual con nombre, especie y categoría
- Generación aleatoria de personajes
- Validación de campos

**Props:**
- `onHeroCreated`: Callback cuando se crea un personaje

---

### DuelArena.jsx
Arena de combate donde se simula la batalla entre dos personajes.

**Funcionalidades:**
- Visualización de los combatientes
- Simulación de combate con log de acciones
- Mostrado de resultados

**Props:**
- `sel1`: Personaje del slot 1
- `sel2`: Personaje del slot 2
- `onDuelComplete`: Callback cuando termina el combate

---

### CombatantSlot.jsx
Componente que muestra un slot de combatiente en la arena.

**Props:**
- `hero`: Personaje a mostrar
- `slotNumber`: Número del slot (1 o 2)

---

### RPGCard.jsx
Componente genérico de tarjeta con estilo RPG.

**Props:**
- `title`: Título de la tarjeta
- `children`: Contenido de la tarjeta

---

## Servicios

### api.js
Cliente HTTP para comunicación con el backend.

**Funciones disponibles:**

```javascript
// Obtener héroes con filtros opcionales
heroService.getHeroes(especie, categoria)

// Inscribir personaje (manual o aleatorio)
heroService.inscribir(datos, esAleatorio)

// Eliminar personaje
heroService.borrar(id)

// Simular combate
heroService.luchar(id1, id2)
```

**Configuración:**
- URL base: `http://localhost:3000/api`
- Headers: `Content-Type: application/json`
- Manejo de errores centralizado

---

## Utilidades

### characterImages.js
Mapeo de imágenes según la categoría y especie del personaje.

**Función principal:**
```javascript
getCharacterImage(categoria, especie)
```

**Mapeo disponible:**
- 3 categorías: guerrero, explorador, mago
- 3 especies: humano, enano, elfo
- 9 imágenes totales (combinaciones)

---

## Instalación y Configuración

### Requisitos Previos
- Node.js (v14 o superior)
- npm o yarn

### Pasos de Instalación

```bash
# Ir a la carpeta del frontend
cd frontend

# Instalar dependencias
npm install
```

### Ejecución en Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que asigne Vite).

### Build para Producción

```bash
# Crear build de producción
npm run build

# Previsualizar build de producción
npm run preview
```

---

## Tecnologías Utilizadas

### Framework y Build
- **React 19** - Biblioteca UI
- **Vite 8** - Herramienta de build y desarrollo
- **React DOM 19** - Renderizado de React

### Desarrollo
- **ESLint 10** - Linting de código
- **@vitejs/plugin-react 6** - Plugin de React para Vite

---

## Próximos Pasos y Mejoras Futuras

- [ ] Implementar autenticación de usuarios
- [ ] Agregar sistema de rankings y puntuaciones
- [ ] Implementar historial de combates del usuario
- [ ] Agregar animaciones de combate
- [ ] Implementar modo multijugador en tiempo real (WebSocket)
- [ ] Agregar sistema de logros y badges
- [ ] Implementar modo de práctica con IA
- [ ] Agregar personalización de personajes
- [ ] Implementar sistema de chat
- [ ] Agregar soporte para dispositivos móviles (PWA)

---

## Licencia

ISC

---

## Repositorio

https://github.com/GuaSiMoTO/lab-backend-role-playing-game
