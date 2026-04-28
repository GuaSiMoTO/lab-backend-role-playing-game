// POST   /api/personajes/aleatorio   → Genera un personaje aleatorio completo
// PUT    /api/personajes/:id         → Actualiza el nombre
// DELETE /api/personajes/:id         → Elimina

// Personajes falseados para pruebas
let personajes = [
  {
    id: 1,
    nombre: "Agatha",
    especie: "elfo",
    categoria: "mago"
  },
  {
    id: 2,
    nombre: "Gilberto",
    especie: "humano",
    categoria: "guerrero"
  },
  {
    id: 3,
    nombre: "Ana",
    especie: "orco",
    categoria: "explorador"
  },
  {
    id: 4,
    nombre: "Marcos",
    especie: "enano",
    categoria: "guerrero"
  },
];

let nextId = 4;
/*

//TODO ESTO SERÁ CUANDO services esté hecho

const service = require('../services/PersonajeService')

const listar = (req, res) => {
  res.json(service.obtenerTodos())
}

const obtenerPorId = (req, res) => {
  res.json(service.obtenerPorId(Number(req.params.id)))
}

const crearManual = (req, res) => {
  const { nombre, especie, categoria } = req.body
  if (!nombre || !especie || !categoria) {
    return res.status(400).json({ error: 'Faltan campos: nombre, especie, categoria' })
  }
  res.status(201).json(service.crearManual(req.body))
}

const crearAleatorio = (req, res) => {
  res.status(201).json(service.crearAleatorio())
}

const actualizar = (req, res) => {
  res.json(service.actualizarNombre(Number(req.params.id), req.body.nombre))
}

const eliminar = (req, res) => {
  res.json({ mensaje: 'Personaje eliminado', personaje: service.eliminar(Number(req.params.id)) })
}

module.exports = { listar, obtenerPorId, crearManual, crearAleatorio, actualizar, eliminar }
*/

// SIN SERVICES HECHO

// GET    /personajes             → Lista todos (filtros opcionales: ?especie= ?categoria=)
const listar = (req, res) => {
  const { especie, categoria } = req.query;

  // Si no hay ningún filtro, devolvemos todos
  if (!especie && !categoria) {
    return res.json(personajes);
  }

  const resultado = personajes.filter(p => {
    // Retorna true si coincide con especie O coincide con categoria
    return (especie && p.especie === especie) || (categoria && p.categoria === categoria);
  });

  res.json(resultado);
};

// GET    /personajes/:id         → Detalle de un personaje

const obtenerPorId = (req, res) => {
  const personaje = personajes.find((p) => p.id === Number(req.params.id));
  if (!personaje)
    return res.status(404).json({ error: "Personaje no encontrado" });
  res.json(personaje);
};

// POST   /personajes/manual      → Crea un personaje con datos concretos

const crearManual = (req, res) => {
  const { nombre, especie, categoria } = req.body;
  if (!nombre || !especie || !categoria) {
    return res
      .status(400)
      .json({ error: "Faltan campos: nombre, especie, categoria" });
  }
  const nuevo = { id: nextId++, nombre, especie, categoria };
  personajes.push(nuevo);
  res.status(201).json(nuevo);
};

// PUT    /personajes/:id         → Actualiza el nombre
const actualizar = (req, res) => {
  const personaje = personajes.find((p) => p.id === Number(req.params.id));
  if (!personaje)
    return res.status(404).json({ error: "Personaje no encontrado" });
  personaje.nombre = req.body.nombre;
  res.json(personaje);
};

// DELETE /personajes/:id         → Elimina

const eliminar = (req, res) => {
  const index = personajes.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1)
    return res.status(404).json({ error: "Personaje no encontrado" });
  const eliminado = personajes.splice(index, 1)[0];
  res.json({ mensaje: "Personaje eliminado", personaje: eliminado });
};

module.exports = { listar, obtenerPorId, crearManual, actualizar, eliminar };
