# Backend - Proyecto RPG Colaborativo

## Descripción General

Este proyecto implementa el backend de un juego RPG completo, desarrollado colaborativamente por un equipo de 6 desarrolladores. El sistema incluye gestión de personajes, motor de combate, API REST, servicios de persistencia de datos, y control de integración con el frontend.

**Stack tecnológico:** Node.js, Express, JavaScript

---

## Estructura del Proyecto

```
src/
├── routes/           # Definición de endpoints y rutas
├── controllers/      # Lógica de negocio de los endpoints
├── middleware/       # Middleware personalizado (validación, CORS, errores)
├── services/         # Servicios de aplicación (persistencia, lógica compartida)
├── models/           # Clases de dominio (Personaje, Combate, etc.)
└── index.js          # Punto de entrada de la aplicación
```

---

## Contribuciones del Equipo

### **Kilian Sánchez** - Correcciones de Integración y Debugging

**Responsabilidades:**
- Identificación y resolución de errores de configuración e integración
- Validación de códigos HTTP en la API
- Corrección de lógica en métodos de utilidad

**Problemas Resueltos:**
1. **Variable del navegador en backend** - Eliminación de `window.pageXOffset` en código Node.js (no disponible en servidor)
2. **Mismatch de constructores** - Corrección de parámetros en subclases (Guerrero, Mago, Explorador)
3. **Lógica de eliminación invertida** - Cambio de `index <= -1` a `index === -1` 
4. **Códigos HTTP incompletos** - Especificación de status 404 en lugar de 500 genéricos
5. **Archivos duplicados** - Consolidación de bloques de código duplicados

---

### **Hades Otero** - Servicios de Persistencia

**Responsabilidades:**
- Implementación de servicios de lectura y guardado de datos
- Gestión de serialización JSON
- Coordinación de entrada/salida con otros módulos

**Problemas Resueltos:**
1. **Error de serialización** - Conversión correcta de objetos JSON a string para almacenamiento
2. **Variables mal copiadas** - Revisión de líneas replicadas durante la implementación
3. **Coordinación de interfaces** - Alineación de formatos de entrada/salida con el equipo

---

### **Noah Ramos** - Clases Base de Personajes

**Responsabilidades:**
- Desarrollo de la clase abstracta `BasePersonaje` 
- Implementación de la clase `Personaje` 
- Definición de métodos compartidos

**Decisiones de Diseño:**
- Se mantiene el método `atacar()` aunque actualmente no se utiliza (reutilización futura)
- Los ataques se realizan a través de `habilidadEspecial()` en el flujo actual
- Estructura preparada para extensibilidad

---

### **Javier Barroso** - Capa de API (Rutas, Controladores, Middleware)

**Responsabilidades:**
- Implementación de rutas HTTP
- Desarrollo de controladores
- Integración de middleware de seguridad y validación

**Estructura implementada:**
```
src/routes/       # Definición de endpoints
src/controllers/  # Lógica de respuesta a requests
src/middleware/   # Validación, CORS, manejo de errores
```

**Problemas Resueltos:**
1. **Middleware desarrollado tardío** - Refactorización posterior para integrar correctamente
2. **Flujo de ejecución** - Revisión de laboratorio guiado para entender el orden de ejecución
3. **Reorganización funcional** - Reestructuración de la API con middleware integrado desde el inicio

**Aprendizaje aplicado:**
- Laboratorio guiado de middleware (películas)
- Documentación y ejemplos del README del ejercicio

---

### **Javier Esteban** - Motor de Combate

**Responsabilidades:**
- Implementación del sistema de combate
- Lógica de turnos y resolución de acciones
- Integración con el sistema de personajes

**Problemas Resueltos:**
1. **Conflicto de diseño** - Desalineación entre los ataques definidos en personajes vs. motor de combate
2. **Integración de ataques** - Adaptación del motor para usar correctamente `habilidadEspecial()` 
3. **Coordinación de equipo** - Revisión conjunta de código y alineación de interfaces

**Solución aplicada:**
- Código review colaborativo
- Adaptación del motor de combate al diseño de habilidades de personajes

---

### **Ithaisa Sánchez** - Integración Frontend-Backend

**Responsabilidades:**
- Resolución de problemas de conectividad
- Validación de endpoints y rutas
- Debugging de peticiones HTTP

**Problemas Resueltos:**

| Problema | Solución |
|----------|----------|
| Restricciones CORS | Configuración de CORS en Express para permitir origen del frontend |
| URL de API incorrecta | Revisión y validación de endpoints, uso de rutas completas |
| Servidor backend no disponible | Verificación de estado y ejecución correcta antes de peticiones |
| Desajuste de rutas | Unificación y validación de rutas en frontend y backend |
| Formato JSON incorrecto | Implementación de headers `Content-Type` y middleware `express.json()` |
| Manejo de asincronía | Uso de `async/await` para respuestas correctas |
| Falta de manejo de errores | Implementación de `try/catch` en solicitudes |
| Status 500 genéricos | Depuración de lógica backend y mejora de logs |
| Inconsistencia de datos | Validación de estructura de datos entre sistemas |

**Metodología:**
- Pruebas independientes del backend (Postman)
- Validación progresiva de la integración

---

## Instalación y Configuración

### Requisitos Previos
- Node.js (v14 o superior)
- npm o yarn

### Pasos de Instalación

```bash
# Clonar el repositorio
git clone https://github.com/GuaSiMoTO/lab-backend-role-playing-game.git

# Instalar dependencias
npm install

# Configurar variables de entorno (si aplica)
cp .env.example .env

# Ejecutar el servidor
npm start
```

### Ejecución en Desarrollo
```bash
# Con nodemon para hot-reload
npm run dev
```

---

## API Endpoints

Consultar la documentación específica de endpoints en `docs/API.md` o utilizando herramientas como Postman para explorar las rutas disponibles.

### Estructura General
- **GET** - Obtener recursos
- **POST** - Crear recursos
- **PUT/PATCH** - Actualizar recursos
- **DELETE** - Eliminar recursos

### Endpoints Disponibles

#### Personajes
```
GET    /api/personajes             → Lista todos (filtros opcionales: ?especie= ?categoria=)
GET    /api/personajes/:id         → Detalle de un personaje
POST   /api/personajes/manual      → Crea un personaje con datos concretos
POST   /api/personajes/aleatorio   → Genera un personaje aleatorio completo
PUT    /api/personajes/:id         → Actualiza el nombre
DELETE /api/personajes/:id         → Elimina
```

#### Combates
```
POST   /api/combates               → Simula un combate (body: { id1, id2 })
GET    /api/combates/historial     → Lista combates guardados
```

---

## Sistema de Personajes

### Clases Disponibles
- **Guerrero** - Alto daño físico, resistencia media
- **Mago** - Daño mágico, baja resistencia
- **Explorador** - Velocidad alta, daño equilibrado

### Habilidades Especiales
Cada personaje posee una `habilidadEspecial()` que define su estilo de combate único.

### Especies y Categorías

**Especies:**
| Especie  | vida | ataque | defensa | iniciativa |
|----------|:----:|:------:|:-------:|:----------:|
| humano   | +0   | +0     | +0      | +5         |
| enano    | +20  | +5     | +10     | -5         |
| elfo     | -10  | +10    | -5      | +10        |

**Categorías:**
| Categoría   | vida | ataque | defensa | iniciativa |
|-------------|:----:|:------:|:-------:|:----------:|
| guerrero    | +30  | +15    | +10     | +0         |
| explorador  | +10  | +10    | +5      | +15        |
| mago        | -10  | +25    | -5      | +5         |

**Stats base:** `vida=100, ataque=10, defensa=5, iniciativa=5`

---

## Motor de Combate

El sistema de combate resuelve:
- Turnos alternos entre combatientes
- Resolución de ataques mediante habilidades especiales
- Cálculo de daño y resistencia
- Condiciones de victoria/derrota

---

## Problemas Comunes y Soluciones

### Errores de Configuración
✅ Validar que las variables de entorno estén correctamente definidas
✅ Verificar que Node.js no intente acceder a APIs del navegador

### Integración Frontend-Backend
✅ Configurar CORS correctamente en Express
✅ Validar que los endpoints coincidan en ambos lados
✅ Usar herramientas como Postman para pruebas aisladas
✅ Implementar logs detallados en el backend

### Serialización de Datos
✅ Asegurar que los objetos se conviertan a JSON string antes de guardar
✅ Implementar validación de estructura en entrada/salida

---

## Buenas Prácticas Implementadas

1. **Separación de responsabilidades** - Rutas, controladores, servicios y modelos claramente delimitados
2. **Middleware centralizado** - CORS, validación y manejo de errores en un solo lugar
3. **Clases abstractas para extensibilidad** - `BasePersonaje` como base para nuevas clases
4. **Manejo de errores robusto** - Códigos HTTP específicos y mensajes descriptivos
5. **Documentación del código** - Comentarios y docstrings donde es necesario
6. **Debugging progresivo** - Pruebas aisladas antes de integración completa

---

## Próximos Pasos y Mejoras Futuras

- [ ] Implementar autenticación y autorización
- [ ] Agregar validación de datos con esquemas (Joi, Yup)
- [ ] Crear suite de tests automáticos (Jest)
- [ ] Documentar API con Swagger/OpenAPI
- [ ] Implementar logging centralizado
- [ ] Optimizar consultas de base de datos
- [ ] Agregar rate limiting para seguridad
- [ ] Implementar sistema de rankings/puntuaciones

---

## Créditos y Equipo

Este proyecto fue desarrollado colaborativamente por:

| Rol | Desarrollador |
|-----|---------------|
| Integración y Debugging | Kilian |
| Servicios de Persistencia | Hades |
| Clases Base de Personajes | Noah |
| Capa de API | Javier Barroso |
| Motor de Combate | Javier Esteban |
| Integración Frontend-Backend | Ithaisa Sánchez |

---

## Licencia

ISC

## Repositorio

https://github.com/GuaSiMoTO/lab-backend-role-playing-game