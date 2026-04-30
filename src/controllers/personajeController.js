const service = require("../services/PersonajeService");

const listar = (req, res, next) => {
  try {
    res.json(service.obtenerTodos(req.query));
  } catch (err) {
    next(err);
  }
};

const obtenerUno = (req, res, next) => {
  try {
    res.json(service.obtenerPorId(Number(req.params.id)));
  } catch (err) {
    next(err);
  }
};

const crearManual = (req, res, next) => {
  try {
    res.status(201).json(service.crearManual(req.body));
  } catch (err) {
    next(err);
  }
};

const crearAleatorio = (req, res, next) => {
  try {
    res.status(201).json(service.crearAleatorio());
  } catch (err) {
    next(err);
  }
};

const actualizar = (req, res, next) => {
  try {
    res.json(service.actualizarNombre(Number(req.params.id), req.body.nombre));
  } catch (err) {
    next(err);
  }
};

const eliminar = (req, res, next) => {
  try {
    res.json({
      mensaje: "PERSONAJE ELIMINADO",
      personaje: service.eliminar(Number(req.params.id)),
    });
  } catch (err) {
    next(err);
  }
};

const genocidio = (req, res, next) => {
  try {
    // Extraes los filtros de la query string (?especie=Humano&categoria=Guerrero)
    const { especie, categoria, nombre } = req.query;

    // Llamas a la función pasando los filtros en un objeto
    const eliminados = service.genocidio({
      especie,
      categoria,
      nombre,
    });

    //Si no se eliminó a nadie, AVISAR
    if (eliminados.length === 0) {
      return res.status(404).json({
        mensaje: "No se encontraron personajes con esos filtros para eliminar.",
      });
    }

    // Respondes con éxito y la lista de los que han muerto"
    res.json({
      mensaje: `Se han eliminado ${eliminados.length}`,
      victimas: eliminados,
    });
  } catch (error) {
    // Esto enviará el error al middleware errorHandler (el que tiene el err.stack)
    next(error);
  }
};

module.exports = {
  listar,
  obtenerUno,
  crearManual,
  crearAleatorio,
  actualizar,
  eliminar,
  genocidio,
};
