import { useState } from 'react';
import { apiFetch } from '../services/api';

export default function InscriptionForm({ onHeroCreated }) {
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('humano');
  const [categoria, setCategoria] = useState('guerrero');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const showMsg = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      showMsg('Debes consignar un nombre en el pergamino', 'error');
      return;
    }
    try {
      const p = await apiFetch('/personajes/manual', {
        method: 'POST',
        body: JSON.stringify({ nombre: nombre.trim(), especie, categoria })
      });
      showMsg(`✦ ${p.nombre} ha sido inscrito en el grimorio (ID ${p.id})`, 'ok');
      setNombre('');
      onHeroCreated();
    } catch (e2) {
      showMsg(e2.message, 'error');
    }
  };

  const handleRandomSummon = async () => {
    try {
      const p = await apiFetch('/personajes/aleatorio', { method: 'POST', body: '{}' });
      showMsg(`✦ El destino ha convocado a ${p.nombre}, ${p.especie} ${p.categoria} (ID ${p.id})`, 'ok');
      onHeroCreated();
    } catch (e) {
      showMsg(e.message, 'error');
    }
  };

  return (
    <section id="section-inscribir" className="section">
      <div className="quill-form">
        <p className="form-chapter">Inscripción de Héroe</p>
        
        {message && <div className={`status-msg st-${messageType}`}>{message}</div>}

        <label className="quill-label">Nombre del héroe</label>
        <input 
          className="quill-input" 
          type="text" 
          placeholder="Escríbelo con tinta firme…"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <div className="quill-row">
          <div>
            <label className="quill-label">Especie</label>
            <select 
              className="quill-select" 
              value={especie}
              onChange={(e) => setEspecie(e.target.value)}
            >
              <option value="humano">Humano</option>
              <option value="enano">Enano</option>
              <option value="elfo">Elfo</option>
            </select>
          </div>
          <div>
            <label className="quill-label">Clase</label>
            <select 
              className="quill-select" 
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="guerrero">Guerrero</option>
              <option value="explorador">Explorador</option>
              <option value="mago">Mago</option>
            </select>
          </div>
        </div>

        <button className="quill-submit" onClick={handleManualSubmit}>
          Sellar con lacre rojo
        </button>
        <button className="quill-random" onClick={handleRandomSummon}>
          ✦ Invocación aleatoria del destino
        </button>
      </div>
    </section>
  );
}
