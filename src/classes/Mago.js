const Personaje = require("./Personaje");

class Mago extends Personaje {
  constructor({ id, nombre, especie, victorias, derrotas }) {
    // 2. Pasamos el objeto completo a Personaje, forzando la categoría "mago"
    super({ id, nombre, especie, categoria: "mago", victorias, derrotas });
    this.turno = 0;
  }

  //Override
  habilidadEspecial() {
    this.turno++;
    if (this.turno % 3 === 0) {
      return {
        danio: this.ataque,
        descripcion: `El Mago ${this.especie} ${this.nombre}  usa RAYO PENETRANTE y evita la defensa del objetivo`,
        ignoraDefensa: true,
      };
    }
    return {
      danio: this.ataque,
      descripcion: `El Mago ${this.especie} ${this.nombre} tiene la habilidad especial en cooldown, le quedan ${3 - (this.turno % 3)} turnos para estar activa`,
      ignoraDefensa: false,
    };
  }
}

module.exports = Mago;
