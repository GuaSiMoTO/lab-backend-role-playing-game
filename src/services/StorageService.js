const fs = require('fs');
const path = require('path');


const RUTA = path.join(__dirname, '../../data/personajes.txt');

const StorageService = () => {
    const leerPersonajes= ()=> {
        if (!fs.existsSync(RUTA)) return []; // Si no existe el directorio
        return fs.readFileSync(RUTA, 'utf-8').trim().split('\n').slice(0,-1);
    }

    const guardarPersonajes = (personajes, aniadir) => {
        if (aniadir)  (fs.appendFileSync(RUTA, JSON.stringify(personajes) + '\n', 'utf-8'))
        else {
            const contenido = personajes.map(p => JSON.stringify(p)).join('\n');
            fs.writeFileSync(RUTA, contenido + '\n', 'utf-8');
        }
    }
    return { leerPersonajes, guardarPersonajes};
}

module.exports = StorageService;