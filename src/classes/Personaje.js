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
  constructor({nombre, especie, categoria}) {
    super(nombre, especie, categoria);
    this.calcularStats();
  }

  // Override
  calcularStats() {
    // Es vital pasar la especie a minúsculas por si acaso
    const esp = this.especie?.toLowerCase();
    const cat = this.categoria?.toLowerCase();

    const bonusEspecie = MODIFICADORES_ESPECIE[esp];
    const bonusCategoria = MODIFICADORES_CATEGORIA[cat];

    if (!bonusEspecie || !bonusCategoria) {
        throw new Error(`Especie (${esp}) o Categoría (${cat}) no encontrada en las tablas.`);
    }
    

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
  recibirDanio(cantidad, ignoraDefensa = false) {
    const danioReal = ignoraDefensa
      ? cantidad
      : Math.max(0, cantidad - this.defensa);
    this.vida = Math.max(0, this.vida - danioReal); // Si el ataque le quita más de lo que queda de vida, se pone la vida a 0
    return danioReal;
  }
}

module.exports = Personaje;
