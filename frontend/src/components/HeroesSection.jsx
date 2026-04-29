import React, { useState, useEffect } from 'react';
import HeroCard from './HeroCard';
import { apiFetch } from '../services/api';

export default function HeroesSection({ onPickSlot1, onPickSlot2, sel1, sel2 }) {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterEspecie, setFilterEspecie] = useState('');
  const [filterCategoria, setFilterCategoria] = useState('');

  const loadHeroes = async () => {
    setLoading(true);
    setError('');
    try {
      const qs = [filterEspecie && `especie=${filterEspecie}`, filterCategoria && `categoria=${filterCategoria}`]
        .filter(Boolean)
        .join('&');
      const data = await apiFetch('/personajes' + (qs ? `?${qs}` : ''));
      setHeroes(data);
    } catch (e) {
      setError('⚠ El servidor no responde · ¿Está corriendo en localhost:3000?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHeroes();
  }, [filterEspecie, filterCategoria]);

  const handleDelete = async (id) => {
    const h = heroes.find(p => p.id === id);
    if (!h || !confirm(`¿Tachar a ${h.nombre} del grimorio para siempre?`)) return;
    try {
      await apiFetch(`/personajes/${id}`, { method: 'DELETE' });
      loadHeroes();
    } catch (e) {
      setError(e.message);
    }
  };

  const handlePickSlot1 = (id) => {
    const hero = heroes.find(h => h.id === id);
    if (hero) onPickSlot1(hero);
  };

  const handlePickSlot2 = (id) => {
    const hero = heroes.find(h => h.id === id);
    if (hero) onPickSlot2(hero);
  };

  return (
    <section id="section-heroes" className="section active">
      <div className="folio-header">
        <span className="folio-title">Registro de campeones</span>
        <select 
          className="ink-select" 
          value={filterEspecie}
          onChange={(e) => setFilterEspecie(e.target.value)}
        >
          <option value="">Todas las especies</option>
          <option value="humano">Humano</option>
          <option value="enano">Enano</option>
          <option value="elfo">Elfo</option>
        </select>
        <select 
          className="ink-select" 
          value={filterCategoria}
          onChange={(e) => setFilterCategoria(e.target.value)}
        >
          <option value="">Todas las clases</option>
          <option value="guerrero">Guerrero</option>
          <option value="explorador">Explorador</option>
          <option value="mago">Mago</option>
        </select>
        <span className="folio-count">
          {heroes.length} héroe{heroes.length !== 1 ? 's' : ''} registrado{heroes.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      {error && <div className="status-msg st-error">{error}</div>}
      
      <div className="scrolls-grid" id="scrolls-grid">
        {loading ? (
          <div className="empty-quill"><span className="spinner"></span>Consultando el grimorio…</div>
        ) : heroes.length === 0 ? (
          <div className="empty-quill">El registro está vacío<small>Inscribe el primer héroe</small></div>
        ) : (
          heroes.map(hero => (
            <HeroCard
              key={hero.id}
              hero={hero}
              isSelected1={sel1?.id === hero.id}
              isSelected2={sel2?.id === hero.id}
              onPickSlot1={handlePickSlot1}
              onPickSlot2={handlePickSlot2}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </section>
  );
}
