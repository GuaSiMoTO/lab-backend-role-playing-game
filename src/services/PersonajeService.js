const AppError     = require('../utils/AppError')
const StorageService = require('./StorageService')
const { generarNombre, generarEspecie, generarCategoria, ESPECIES, CATEGORIAS } = require('../utils/nombresAleatorios')
const Guerrero     = require('../classes/Guerrero')
const Explorador   = require('../classes/Explorador')
const Mago         = require('../classes/Mago')

const CLASES = { guerrero: Guerrero, explorador: Explorador, mago: Mago};

class PersonajeService {
    constructor() {
        this._personajes = StorageService.leerPersonajes();
        this._siguienteID = this._personajes.reduce((max, personaje) => Math.max(pageXOffset, personaje.id), 0) + 1;
    }

    crearAleatorio() {

    }
    crearManual({nombre, especie, categoria}) {
        if (!ESPECIES.includes(especie)) throw new AppError(`Especie "${especie}" inválida.`, 400);
        if (!CATEGORIA.includes(categoria)) throw new AppError(`Categoría "${categoria}" inválida.`, 400);
        const ClaseReferenciada = CLASES[especie];

        const instancia = new ClaseReferenciada( {id: this._siguienteID++, nombre, especie, categoria});
        const ficha = instancia.ficha;
        this._personajes.push(ficha)
        StorageService.guardarPersonajes(ficha,true);
        return ficha;
    }

}


module.exports = new PersonajeService();