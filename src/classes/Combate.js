const Guerrero = require("./Guerrero");
const Mago = require("./Mago");
const Explorador = require("./Explorador");

/**
 * Fábrica (Factory) que convierte una ficha JSON plana
 * en la instancia de clase correcta según su categoría.
 */
function crearPersonaje(ficha) {
  switch (ficha.categoria) {
    case "guerrero":
      return new Guerrero(ficha.nombre, ficha.especie);
    case "mago":
      return new Mago(ficha.nombre, ficha.especie);
    case "explorador":
      return new Explorador(ficha.nombre, ficha.especie);
    default:
      throw new Error(`Categoría desconocida: ${ficha.categoria}`);
  }
}

class Combate {
  /**
   * Simula un combate por turnos entre dos personajes.
   * Recibe objetos planos (fichas), no instancias de clase.
   * La fábrica se encarga de instanciar Guerrero / Mago / Explorador
   * para aprovechar el polimorfismo y las habilidades especiales.
   * Devuelve: { ganador, perdedor, rondas, log }
   */
  static simular(fichaA, fichaB) {
    const pA = crearPersonaje(fichaA);
    const pB = crearPersonaje(fichaB);

    const log = [];
    let ronda = 0; // Iniciativa: el personaje con mayor iniciativa ataca primero

    const [primero, segundo] =
      pA.iniciativa >= pB.iniciativa ? [pA, pB] : [pB, pA];

    log.push(
      `:crossed_swords:  ${primero.nombre} (${primero.categoria}, iniciativa ${primero.iniciativa}) ataca primero`,
    );

    while (primero.vida > 0 && segundo.vida > 0) {
      ronda++; // --- Turno del primero ---

      const accionPrimero = primero.habilidadEspecial();

      const danioRealPrimero = segundo.recibirDanio(
        accionPrimero.danio,
        accionPrimero.ignoraDefensa,
      );

      log.push(
        `Ronda ${ronda}a: ${accionPrimero.descripcion} → ${segundo.nombre} [-${danioRealPrimero} daño] (${segundo.vida} vida restante)`,
      );

      if (segundo.vida <= 0) break; // --- Turno del segundo ---

      const accionSegundo = segundo.habilidadEspecial();

      const danioRealSegundo = primero.recibirDanio(
        accionSegundo.danio,
        accionSegundo.ignoraDefensa,
      );

      log.push(
        `Ronda ${ronda}b: ${accionSegundo.descripcion} → ${primero.nombre} [-${danioRealSegundo} daño] (${primero.vida} vida restante)`,
      );
    }

    const ganador = primero.vida > 0 ? primero : segundo;
    const perdedor = primero.vida > 0 ? segundo : primero;

    log.push(
      `:trophy: Ganador: ${ganador.nombre} (${ganador.categoria}) en ${ronda} ronda(s)`,
    );

    return {
      ganador: ganador.nombre,
      perdedor: perdedor.nombre,
      rondas: ronda,
      log,
    };
  }
}

module.exports = Combate;
