const fs = require("fs");
const path = require("path");

const RUTA = path.join(__dirname, "../../data/personajes.txt");

const leerPersonajes = () => {
  if (!fs.existsSync(RUTA)) return [];
  const contenido = fs.readFileSync(RUTA, "utf-8").trim();
  if (!contenido) return [];
  // Convertimos cada línea de texto en un objeto real de JS
  return contenido.split("\n").map(linea => JSON.parse(linea));
};

const guardarPersonajes = (data, aniadir) => {
  if (aniadir) {
    // data es el nuevo personaje (un solo objeto)
    fs.appendFileSync(RUTA, JSON.stringify(data) + "\n", "utf-8");
  } else {
    // data es el array completo de personajes
    const contenido = data.map((p) => JSON.stringify(p)).join("\n");
    fs.writeFileSync(RUTA, contenido + (contenido ? "\n" : ""), "utf-8");
  }
};

module.exports = { leerPersonajes, guardarPersonajes };;
