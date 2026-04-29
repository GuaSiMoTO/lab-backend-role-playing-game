const BasePersonaje = require("./BasePersonaje");

const MODIFICADORES_ESPECIE = {
  humano: { vida: 0, ataque: 0, defensa: 0, iniciativa: 5 },
  enano: { vida: 20, ataque: 5, defensa: 10, iniciativa: -5 },
  elfo: { vida: -10, ataque: 10, defensa: -5, iniciativa: 10 },
};

const MODIFICADORES_CATEGORIA = {
  guerrero: { vida: 30, ataque: 15, defensa: 10, iniciativa: 0 },
  explorador: { vida: 10, ataque: 10, defensa: 5, iniciativa: 15 },
  mago: { vida: -10, ataque: 25, defensa: -5, iniciativa: 5 },
};

class Personaje extends BasePersonaje {
  constructor(nombre, especie, categoria) {
    super(nombre, especie, categoria);
    this.calcularStats();
  }

  // Override
  calcularStats() {
    const bonusEspecie = MODIFICADORES_ESPECIE[this.especie];
    const bonusCategoria = MODIFICADORES_CATEGORIA[this.categoria];
    this.vida = 100 + bonusEspecie.vida + bonusCategoria.vida;
    this.ataque = 10 + bonusEspecie.ataque + bonusCategoria.ataque;
    this.defensa = 5 + bonusEspecie.defensa + bonusCategoria.defensa;
    this.iniciativa = 5 + bonusEspecie.iniciativa + bonusCategoria.iniciativa;
  }

  //Override
  atacar(objetivo) {
    objetivo.recibirDanio(this.ataque);
  }

  //Override
  recibirDanio(cantidad) {
    const ataqueReal = Math.max(0, cantidad - this.defensa); //Si cantidad - defensa es negativo, se queda con 0
    this.vida = Math.max(0, this.vida - ataqueReal); // Si el ataque le quita más de lo que queda de vida, se pone la vida a 0
  }
}

module.exports = Personaje;
