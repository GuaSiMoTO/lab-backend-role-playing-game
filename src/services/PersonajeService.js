const AppError = require("../utils/AppError");
const StorageService = require("./StorageService");
const {
  generarNombre,
  generarEspecie,
  generarCategoria,
  ESPECIES,
  CATEGORIAS,
} = require("../utils/nombresAleatorios");
const Guerrero = require("../classes/Guerrero");
const Explorador = require("../classes/Explorador");
const Mago = require("../classes/Mago");

const CLASES = { guerrero: Guerrero, explorador: Explorador, mago: Mago };

class PersonajeService {
  constructor() {
    this._personajes = StorageService.leerPersonajes();
    this._siguienteID =
      this._personajes.reduce(
        (max, personaje) => Math.max(max, personaje.id),
        0,
      ) + 1;
    this._historialCombate = StorageService.leerCombates();
  }

  crearAleatorio() {
    const especie = generarEspecie();
    const categoria = generarCategoria();
    const nombre = generarNombre(especie); // Para que tenga el nombre de la especie en específico.
    return this.crearManual({ especie, categoria, nombre });
  }
  crearManual({ nombre, especie, categoria }) {
    // Normalizamos a minúsculas para que coincida con tus constantes
    const espNorm = especie?.toLowerCase();
    const catNorm = categoria?.toLowerCase();

    if (!ESPECIES.includes(espNorm)) {
      throw new AppError(`Especie "${especie}" inválida.`, 400);
    }

    if (!CATEGORIAS.includes(catNorm)) {
      throw new AppError(`Categoría "${categoria}" inválida.`, 400);
    }

    const ClaseReferenciada = CLASES[catNorm];

    if (!ClaseReferenciada) {
      throw new AppError(
        `No existe una clase para la categoría: ${categoria}`,
        400,
      );
    }

    const instancia = new ClaseReferenciada({
      id: this._siguienteID++,
      nombre,
      especie: espNorm,
      categoria: catNorm,
    });

    const ficha = instancia.ficha;
    this._personajes.push(ficha);

    // IMPORTANTE: Pasamos 'ficha' para añadir, NO el array completo
    StorageService.guardarPersonajes(ficha, true);

    return ficha;
  }
  obtenerHistorial(id = 0) {
    let resultado = [...this._historialCombate];
    if (id > 0) {
      const nombre = this.obtenerPorId(id).nombre;
      resultado = resultado.filter(
        (p) => p.ganador == nombre || p.perdedor == nombre,
      );
    }
    return resultado;
  }
  obtenerTodos(filtros = {}) {
    // O algunos, depende del filtro.
    let resultado = [...this._personajes];
    if (filtros.especie)
      resultado = resultado.filter((p) => p.especie == filtros.especie);
    if (filtros.categoria)
      resultado = resultado.filter((p) => p.categoria == filtros.categoria);
    if (filtros.nombre)
      resultado = resultado.filter((p) => p.nombre == filtros.nombre);
    if (!resultado) throw new AppError("Personajes no encontrados.", 404);
    return resultado;
  }
  obtenerPorId(Id) {
    // Esta función es redundante y se puede unir en "obtenerTodos"
    const personaje = this._personajes.find((p) => p.id == Id);
    if (!personaje) throw new AppError("Personaje no encontrado.", 404);
    return personaje;
  }
  eliminar(Id) {
    // Mayúscula para diferenciarlo del id propio del objeto.
    const index = this._personajes.findIndex((p) => p.id == Id);
    if (index === -1) throw new AppError("Personaje no encontrado.", 404);
    const eliminado = this._personajes.splice(index, 1)[0];
    StorageService.guardarPersonajes(this._personajes, false);
    return eliminado;
  }
  
  /// Futura implementación
  // GENOCIDIO(filtros = {}) {
  //   let victimas = [...this._personajes];
  //   if (filtros.especie)
  //     victimas = victimas.filter((p) => p.especie == filtros.especie);
  //   if (filtros.categoria)
  //     victimas = victimas.filter((p) => p.categoria == filtros.categoria);
  //   if (filtros.nombre)
  //     victimas = victimas.filter((p) => p.nombre == filtros.nombre);

  //   victimas.forEach((victima) => {
  //     this.eliminar(victima.id); //Esto debería funcionar.
  //   });
  //   return victimas;
  // }

  registrarResultado(ganador, perdedor, historial) {
    const win = this._personajes.find((p) => p.id == ganador);
    const lose = this._personajes.find((p) => p.id == perdedor);
    if (win) win.victorias++;
    if (lose) lose.derrotas++;
    this._historialCombate.push(historial);
    StorageService.guardarCombates(historial);
    StorageService.guardarPersonajes(this._personajes, false);
  }
  actulizarNombre(id, nuevoNombre) {
    const index = this._personajes.findIndex((p) => p.id === id);
    if (index === -1) throw new AppError("Personaje no encontrado", 404);
    this._personajes[index].nombre = nuevoNombre;
    StorageService.guardarPersonajes(this._personajes, false);
    return this._personajes[index];
  }
}

module.exports = new PersonajeService();
