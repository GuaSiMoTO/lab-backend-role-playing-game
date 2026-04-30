/**
 * Importaciones de imágenes de personajes
 * En Vite, los archivos en src/assets se importan directamente
 */

import guerreroHumano from '../assets/guerrero-humano.png';
import guerreroEnano from '../assets/guerrero-enan.png';
import guerreroElfo from '../assets/guerrero-elfo.png';
import exploradorHumano from '../assets/explorador-humano.png';
import exploradorEnano from '../assets/explorador-enano.png';
import exploradorElfo from '../assets/explorador-elfo.png';
import magoHumano from '../assets/mago-humano.png';
import magoEnano from '../assets/mago-enano.png';
import magoElfo from '../assets/mago-elfo.png';

/**
 * Mapea combinaciones de categoría y especie a sus imágenes correspondientes
 */
export const CHARACTER_IMAGES = {
  guerrero: {
    humano: guerreroHumano,
    enano: guerreroEnano,
    elfo: guerreroElfo,
  },
  explorador: {
    humano: exploradorHumano,
    enano: exploradorEnano,
    elfo: exploradorElfo,
  },
  mago: {
    humano: magoHumano,
    enano: magoEnano,
    elfo: magoElfo,
  },
};

/**
 * Obtiene la imagen correspondiente a una categoría y especie
 */
export const getCharacterImage = (categoria, especie) => {
  if (!categoria || !especie) return null;
  
  const categoriaLower = categoria.toLowerCase();
  const especieLower = especie.toLowerCase();
  
  return CHARACTER_IMAGES[categoriaLower]?.[especieLower] || null;
};
