class Personaje {
  constructor(ficha) {
    this.id = ficha.id;
    this.nombre = ficha.nombre;
    this.especie = ficha.especie;
    this.categoria = ficha.categoria;
    this.victorias = ficha.victorias;
    this.derrotas = ficha.derrotas;

    this.vida = ficha.stats.vida;
    this.ataque = ficha.stats.ataque;
    this.defensa = ficha.stats.defensa;
    this.iniciativa = ficha.stats.iniciativa;
  }

  estaVivo() {
    return this.vida > 0;
  }

  recibirAtaque(cantidad) {
    this.vida = Math.max(0, this.vida - cantidad);
  }

  atacar(objetivo) {
    const danio = Math.max(1, this.ataque - objetivo.defensa);
    objetivo.recibirAtaque(danio);
    return danio;
  }
}

class Combate {
  /**
   * Simula un combate por turnos entre dos personajes.
   * Recibe objetos planos (fichas), no instancias de clase.
   * Devuelve: { ganador, perdedor, rondas, log }
   */
  static simular(fichaA, fichaB) {
    const pA = new Personaje(fichaA);
    const pB = new Personaje(fichaB);

    const log = [];
    let ronda = 0;

    const [primero, segundo] =
      pA.iniciativa >= pB.iniciativa ? [pA, pB] : [pB, pA];

    log.push(
      `⚔️  ${primero.nombre} (iniciativa ${primero.iniciativa}) ataca primero`,
    );

    while (primero.estaVivo() && segundo.estaVivo()) {
      ronda++;

      const danioPrimero = primero.atacar(segundo);
      log.push(
        `Ronda ${ronda}a: ${primero.nombre} → ${segundo.nombre} [-${danioPrimero} vida] (${segundo.vida} restante)`,
      );

      if (!segundo.estaVivo()) break;

      const danioSegundo = segundo.atacar(primero);
      log.push(
        `Ronda ${ronda}b: ${segundo.nombre} → ${primero.nombre} [-${danioSegundo} vida] (${primero.vida} restante)`,
      );
    }

    const ganador = primero.estaVivo() ? primero : segundo;
    const perdedor = primero.estaVivo() ? segundo : primero;

    log.push(`🏆 Ganador: ${ganador.nombre} en ${ronda} ronda(s)`);

    return {
      ganador: ganador.nombre,
      perdedor: perdedor.nombre,
      rondas: ronda,
      log,
    };
  }
}

module.exports = Combate;
