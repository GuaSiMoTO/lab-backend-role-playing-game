// Clase abstracta Base Personaje (bonus)

class BasePersonaje {
  constructor(nombre, especie, categoria) {
    if (new.target === BasePersonaje) {
      throw new Error("BasePersonaje es una clase abstracta. Usa Personaje.");
    }
    this.nombre = nombre;
    this.especie = especie;
    this.categoria = categoria;
    this.vida = 0;
    this.ataque = 0;
    this.defensa = 0;
    this.iniciativa = 0;
  }

  // Método abstracto atacar: las subclase Personaje sobreescribirlo (override).
  atacar(objetivo) {
    throw new Error("Las subclases deben implementar atacar()");
  }

  // Método abstracto recibirDanio: las subclase Personaje sobreescribirlo (override).
  recibirDanio(cantidad) {
    throw new Error("Las subclases deben implementar recibirDanio()");
  }

  // Método abstracto calcularStats: la subclase Personaje DEBE sobreescribirlo (override).
  calcularStats() {
    throw new Error("Las subclases deben implementar calcularStats()");
  }

  // Método abstracto habilidadEspecial: las subclases Mago, Explorador y Guerrero sobreescribirlo (override).
  habilidadEspecial() {
    throw new Error("Las subclases deben implementar habilidadEspecial()");
  }
}

module.exports = BasePersonaje;
