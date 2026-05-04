const Personaje = require("./Personaje");

class Guerrero extends Personaje {
  constructor(ficha) {
    super({ 
      id: ficha.id, 
      nombre: ficha.nombre, 
      especie: ficha.especie, 
      categoria: "guerrero", 
      victorias: ficha.victorias || 0, 
      derrotas: ficha.derrotas || 0 
    });
    this.turno = 0;
  }

  //Override
  habilidadEspecial() {
    this.turno++;
    if (this.turno % 3 === 0) {
      return {
        danio: this.ataque * 2,
        descripcion: `El Guerrero ${this.especie} ${this.nombre}  usa GOLPE DEVASTADOR e inflinge el doble de daño`,
        ignoraDefensa: false,
      };
    }
    return {
      danio: this.ataque,
      descripcion: `El Guerrero ${this.especie} ${this.nombre} tiene la habilidad especial en cooldown, le quedan ${3 - (this.turno % 3)} turnos para estar activa`,
      ignoraDefensa: false,
    };
  }
}

module.exports = Guerrero;