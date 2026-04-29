const API_URL = 'http://localhost:3000/api';

export async function apiFetch(path, opts = {}) {
  const r = await fetch(API_URL + path, {
    headers: { 'Content-Type': 'application/json' },
    ...opts
  });
  const d = await r.json();
  if (!r.ok) throw new Error(d.error || 'Error del servidor');
  return d;
}

export const heroService = {
  // Obtener héroes con filtros
  getHeroes: async (especie = '', categoria = '') => {
    const params = new URLSearchParams();
    if (especie) params.append('especie', especie);
    if (categoria) params.append('categoria', categoria);
    const r = await fetch(`${API_URL}/personajes?${params}`);
    return r.json();
  },

  // Inscribir (Manual o Aleatorio)
  inscribir: async (datos, esAleatorio = false) => {
    const endpoint = esAleatorio ? '/personajes/aleatorio' : '/personajes/manual';
    const r = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    return r.json();
  },

  // Eliminar
  borrar: async (id) => {
    return fetch(`${API_URL}/personajes/${id}`, { method: 'DELETE' });
  },

  // Combate
  luchar: async (id1, id2) => {
    const r = await fetch(`${API_URL}/combates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id1, id2 })
    });
    return r.json();
  }
};