# Auditoría del Proyecto RPG - Soluciones de Problemas

## Fecha de Auditoría
30 de Abril, 2026

## Resumen Ejecutivo
Se ha realizado una auditoría completa del proyecto RPG (backend + frontend) comparando la implementación actual con los requisitos especificados en el README.md. Se identificaron **18 problemas críticos** en el backend y **2 problemas** en el frontend que deben ser corregidos para cumplir con los requisitos del laboratorio.

---

## PROBLEMAS DEL BACKEND

### 🔴 CRÍTICOS - Archivos Vacíos

#### 1. `src/utils/AppError.js` está vacío
**Descripción:** El archivo existe pero está completamente vacío. El README especifica que debe contener la clase `AppError` extendiendo de `Error`.

**Solución:**
```javascript
class AppError extends Error {
  constructor(mensaje, statusCode) {
    super(mensaje)
    this.statusCode = statusCode
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AppError
```

**Impacto:** CRÍTICO - Sin esto, el middleware `errorHandler` no funcionará correctamente y los errores no tendrán el código de estado HTTP apropiado.

---

#### 2. `src/utils/nombresAleatorios.js` está vacío
**Descripción:** El archivo existe pero está vacío. El README especifica que debe contener arrays de nombres por especie y funciones generadoras.

**Solución:**
```javascript
const nombres = {
  humano:   ['Aldric', 'Mara', 'Torben', 'Elisa', 'Cain', 'Sera'],
  enano:    ['Durgin', 'Broka', 'Halvard', 'Ilda', 'Grimr', 'Vorna'],
  elfo:     ['Aelindra', 'Sorin', 'Lyshara', 'Eryn', 'Caladel', 'Nimue']
}

const ESPECIES    = ['humano', 'enano', 'elfo']
const CATEGORIAS  = ['guerrero', 'explorador', 'mago']

const aleatorio = (arr) => arr[Math.floor(Math.random() * arr.length)]

const generarNombre   = (especie) => aleatorio(nombres[especie] || nombres.humano)
const generarEspecie  = () => aleatorio(ESPECIES)
const generarCategoria = () => aleatorio(CATEGORIAS)

module.exports = { generarNombre, generarEspecie, generarCategoria, ESPECIES, CATEGORIAS }
```

**Impacto:** CRÍTICO - Sin esto, `POST /api/personajes/aleatorio` no funcionará.

---

### 🟠 ALTO - Errores de Lógica y Código

#### 3. Error en `PersonajeService.js` línea 22
**Descripción:** Uso de variable incorrecta `pageXOffset` en lugar de `max`.

**Código actual:**
```javascript
this._siguienteID = this._personajes.reduce(
  (max, personaje) => Math.max(pageXOffset, personaje.id),
  0,
)+1;
```

**Solución:**
```javascript
this._siguienteID = this._personajes.reduce(
  (max, personaje) => Math.max(max, personaje.id),
  0,
)+1;
```

**Impacto:** ALTO - Esto causará un error de referencia y el ID no se calculará correctamente.

---

#### 4. Error en `PersonajeService.js` línea 40
**Descripción:** Se usa `CLASES[especie]` cuando debería ser `CLASES[categoria]` para seleccionar la clase correcta.

**Código actual:**
```javascript
const ClaseReferenciada = CLASES[especie];
```

**Solución:**
```javascript
const ClaseReferenciada = CLASES[categoria];
```

**Impacto:** ALTO - Esto siempre creará instancias incorrectas (ej: un humano sería Guerrero siempre).

---

#### 5. Error de tipografía en `PersonajeService.js` línea 101
**Descripción:** El método se llama `actulizarNombre` cuando debería ser `actualizarNombre`.

**Código actual:**
```javascript
actulizarNombre(id, nuevoNombre) {
```

**Solución:**
```javascript
actualizarNombre(id, nuevoNombre) {
```

**Impacto:** ALTO - El controlador llama a `actualizarNombre` pero el método tiene nombre incorrecto, causará error.

---

#### 6. `PersonajeService.js` no exporta singleton correctamente
**Descripción:** El README especifica que debe ser un singleton exportado como `module.exports = new PersonajeService()`, pero el código actual lo hace correctamente al final. Sin embargo, el constructor debería inicializar `victorias` y `derrotas` en 0 para cada personaje.

**Solución:** Asegurar que al leer personajes del archivo, se inicialicen las propiedades de combate si no existen.

**Impacto:** MEDIO - Puede causar errores si los datos del archivo no tienen las propiedades de combate.

---

#### 7. `StorageService.js` no parsea JSON
**Descripción:** La función `leerPersonajes` lee líneas pero no hace `JSON.parse` de cada una.

**Código actual:**
```javascript
const leerPersonajes = () => {
  if (!fs.existsSync(RUTA)) return [];
  return fs.readFileSync(RUTA, "utf-8").trim().split("\n").slice(0, -1);
};
```

**Solución:**
```javascript
const leerPersonajes = () => {
  if (!fs.existsSync(RUTA)) return [];
  const contenido = fs.readFileSync(RUTA, "utf-8").trim();
  if (!contenido) return [];
  return contenido
    .split('\n')
    .filter(linea => linea.trim())
    .map(linea => JSON.parse(linea));
};
```

**Impacto:** CRÍTICO - Sin esto, el servicio recibirá strings en lugar de objetos JavaScript.

---

#### 8. Función `GENOCIDIO` no solicitada
**Descripción:** `PersonajeService.js` y `personajeController.js` implementan una función `GENOCIDIO` que no está en los requisitos del README. Aunque es un bonus creativo, no debería estar en el código base del laboratorio.

**Solución:** Eliminar la función `GENOCIDIO` del servicio, controlador y rutas.

**Impacto:** BAJO - Es funcionalidad extra, pero no cumple con los requisitos.

---

#### 9. Error de referencia en `personajeController.js` línea 37
**Descripción:** Llama a `service.actualizarNombre` pero el método en el servicio se llama `actulizarNombre`.

**Código actual:**
```javascript
res.json(service.actualizarNombre(Number(req.params.id), req.body.nombre));
```

**Solución:**
```javascript
res.json(service.actulizarNombre(Number(req.params.id), req.body.nombre));
// O corregir el nombre del método en el servicio a actualizarNombre
```

**Impacto:** ALTO - Causará error al intentar actualizar un personaje.

---

#### 10. Ruta DELETE `/genocidio` incorrecta
**Descripción:** En `src/routes/personajes.js` línea 19, hay una ruta DELETE con el método incorrecto para genocidio.

**Código actual:**
```javascript
router.delete("/genocidio", control.genocidio);
```

**Solución:** Eliminar esta ruta (funcionalidad no solicitada) o cambiar a DELETE con query params si se desea mantener.

**Impacto:** BAJO - Funcionalidad no solicitada.

---

### 🟡 MEDIO - Configuración y Estructura

#### 11. Backend no tiene CORS configurado
**Descripción:** El README menciona que para el frontend React, el backend debe tener `app.use(cors())`. Actualmente no está configurado.

**Solución:**
1. Instalar cors: `npm install cors`
2. Agregar en `index.js`:
```javascript
const cors = require('cors')
app.use(cors())
```

**Impacto:** MEDIO - Sin esto, el frontend no podrá hacer requests al backend debido a políticas CORS.

---

#### 12. Archivos de datos están vacíos
**Descripción:** `data/personajes.txt` y `data/combates.txt` están completamente vacíos. Aunque esto es aceptable inicialmente, debería haber una línea vacía al menos para evitar errores de lectura.

**Solución:** Asegurar que los archivos tengan al menos una línea vacía o crear un script de inicialización.

**Impacto:** BAJO - El código maneja archivos vacíos correctamente.

---

#### 13. `PersonajeService` no inicializa victorias/derrotas
**Descripción:** Cuando se crea un personaje manual o aleatorio, no se inicializan las propiedades `victorias` y `derrotas` en 0.

**Solución:** Agregar en el constructor de las clases o en el servicio:
```javascript
this.victorias = 0;
this.derrotas = 0;
```

**Impacto:** MEDIO - Puede causar errores al mostrar estadísticas o registrar resultados de combate.

---

### 🟢 BAJO - Mejoras y Consistencia

#### 14. Inconsistencia en nombres de constantes
**Descripción:** El README usa `BONUS_ESPECIE` y `BONUS_CATEGORIA`, pero el código usa `MODIFICADORES_ESPECIE` y `MODIFICADORES_CATEGORIA`.

**Solución:** Cambiar los nombres para coincidir con el README o mantener los actuales y documentar el cambio.

**Impacto:** BAJO - Solo afecta la legibilidad y consistencia con el README.

---

#### 15. Constructor de Personaje no coincide con README
**Descripción:** El README especifica que el constructor recibe `{ id, nombre, especie, categoria }`, pero la implementación actual recibe parámetros separados.

**Código actual:**
```javascript
constructor(nombre, especie, categoria) {
```

**Solución:** Cambiar para aceptar un objeto como especifica el README:
```javascript
constructor({ id, nombre, especie, categoria }) {
```

**Impacto:** BAJO - Funciona correctamente pero no sigue la especificación del README.

---

#### 16. Método `ficha` no implementado
**Descripción:** El README especifica que la clase `Personaje` debe tener un getter `ficha` que devuelve la representación plana del personaje. No está implementado.

**Solución:** Agregar a la clase Personaje:
```javascript
get ficha() {
  return {
    id: this.id,
    nombre: this.nombre,
    especie: this.especie,
    categoria: this.categoria,
    stats: {
      vida: this.vida,
      ataque: this.ataque,
      defensa: this.defensa,
      iniciativa: this.iniciativa
    },
    victorias: this.victorias || 0,
    derrotas: this.derrotas || 0
  }
}
```

**Impacto:** MEDIO - Necesario para que el servicio pueda guardar correctamente.

---

#### 17. Constructor de subclases no acepta ID
**Descripción:** Las subclases (Guerrero, Explorador, Mago) no aceptan el parámetro `id` en su constructor, pero el servicio intenta pasarlo.

**Solución:** Modificar constructores de subclases para aceptar id:
```javascript
constructor({ id, nombre, especie, categoria }) {
  super({ id, nombre, especie, categoria })
}
```

**Impacto:** ALTO - Causará error al crear personajes desde el servicio.

---

#### 18. Combate usa nombres para identificar ganador/perdedor
**Descripción:** El combate usa nombres para identificar ganador/perdedor, pero debería usar IDs para mayor precisión (puede haber personajes con el mismo nombre).

**Impacto:** BAJO - Funcional pero puede causar confusiones.

---

## PROBLEMAS DEL FRONTEND

### 🟡 MEDIO - Importaciones

#### 19. Importación innecesaria de React en `HeroesSection.jsx`
**Descripción:** El archivo importa `React` pero no lo usa (React 17+ no requiere importación para JSX).

**Código actual:**
```javascript
import React, { useState, useEffect } from 'react';
```

**Solución:**
```javascript
import { useState, useEffect } from 'react';
```

**Impacto:** BAJO - Solo causa warning de linter.

---

#### 20. `cors` en dependencias del frontend
**Descripción:** `cors` está en las dependencias del frontend (`frontend/package.json`), pero es una dependencia del backend.

**Solución:** Mover `cors` a las dependencias del backend (`package.json` raíz).

**Impacto:** BAJO - No afecta funcionalidad pero es incorrecto.

---

## RESUMEN DE PRIORIDADES

### 🔴 CRÍTICO (Resolver inmediatamente)
1. AppError.js vacío
2. nombresAleatorios.js vacío
3. StorageService.js no parsea JSON

### 🟠 ALTO (Resolver pronto)
4. Error pageXOffset en PersonajeService
5. Error CLASES[especie] vs CLASES[categoria]
6. Error de tipografía actulizarNombre
7. Error de referencia en controller
8. Constructor de subclases no acepta ID

### 🟡 MEDIO (Resolver)
9. CORS no configurado
10. Método ficha no implementado
11. Inicialización de victorias/derrotas

### 🟢 BAJO (Mejoras)
12-18. Inconsistencias de nombres, estructura, etc.

---

## PLAN DE ACCIÓN RECOMENDADO

### Fase 1: CRÍTICOS (15 minutos)
1. Implementar `AppError.js`
2. Implementar `nombresAleatorios.js`
3. Corregir `StorageService.js` para parsear JSON

### Fase 2: ALTO (20 minutos)
4. Corregir error `pageXOffset`
5. Corregir `CLASES[especie]` a `CLASES[categoria]`
6. Corregir `actulizarNombre` a `actualizarNombre`
7. Corregir referencia en controller
8. Modificar constructores de subclases

### Fase 3: MEDIO (15 minutos)
9. Configurar CORS en backend
10. Implementar getter `ficha` en Personaje
11. Inicializar victorias/derrotas en constructores
12. Limpiar función GENOCIDIO (opcional)

### Fase 4: FRONTEND (5 minutos)
13. Eliminar importación innecesaria de React
14. Mover cors a dependencias del backend

### Fase 5: TESTING (20 minutos)
15. Probar todos los endpoints con Postman/Thunder Client
16. Verificar persistencia en archivos .txt
17. Probar integración con frontend

---

## VERIFICACIÓN FINAL

Después de aplicar todas las soluciones, verificar:

- [ ] `GET /api/personajes` devuelve array de objetos JSON
- [ ] `POST /api/personajes/manual` con datos válidos devuelve 201
- [ ] `POST /api/personajes/aleatorio` genera personaje completo
- [ ] `POST /api/combates` simula combate correctamente
- [ ] `PUT /api/personajes/:id` actualiza nombre
- [ ] `DELETE /api/personajes/:id` elimina personaje
- [ ] Los datos persisten al reiniciar el servidor
- [ ] El frontend puede conectar con el backend
- [ ] No hay errores en consola del navegador
- [ ] No hay errores en consola del servidor

---

## NOTAS ADICIONALES

1. **Bonus Implementados:** El proyecto tiene implementados algunos bonus no solicitados (GENOCIDIO, habilidades con cooldown). Considerar si mantenerlos o eliminarlos para cumplir estrictamente con los requisitos.

2. **Estructura de Carpetas:** La estructura general cumple con los requisitos del README, aunque algunos archivos están en ubicaciones ligeramente diferentes.

3. **Documentación:** Se recomienda agregar comentarios en el código explicando la lógica, especialmente en el motor de combate.

4. **Testing:** No se encontraron archivos de tests. Considerar implementar los tests bonus con Jest como sugiere el README.

---

## CONCLUSIÓN

El proyecto tiene una base sólida pero requiere correcciones importantes en los archivos de utilidades vacíos y varios errores de lógica en el servicio de personajes. Una vez aplicadas las soluciones de Fase 1 y 2, el backend debería ser funcional. Las Fases 3-5 son mejoras que aseguran cumplimiento completo de los requisitos.
