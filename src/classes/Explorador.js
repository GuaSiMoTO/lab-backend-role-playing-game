const Personaje = require("./Personaje");

class Explorador extends Personaje {
  constructor(ficha) {
    super({
      id: ficha.id, 
      nombre: ficha.nombre, 
      especie: ficha.especie, 
      categoria: "explorador", 
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
        danio: this.ataque + this.iniciativa,
        descripcion: `El Explorador ${this.especie} ${this.nombre}  usa ATAQUE PÍCARO e inflinge más daño gracias a su alta iniciativa`,
        ignoraDefensa: false,
      };
    }
    return {
      danio: this.ataque,
      descripcion: `El Explorador ${this.especie} ${this.nombre} tiene la habilidad especial en cooldown, le quedan ${3 - (this.turno % 3)} turnos para estar activa`,
      ignoraDefensa: false,
    };
  }
}

module.exports = Explorador;