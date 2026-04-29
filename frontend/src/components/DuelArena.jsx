import { useState, useRef } from 'react';
import CombatantSlot from './CombatantSlot';
import { apiFetch } from '../services/api';

export default function DuelArena({ sel1, sel2, onDuelComplete }) {
  const [log, setLog] = useState([]);
  const [isCombatting, setIsCombatting] = useState(false);
  const [winner, setWinner] = useState(null);
  const [rounds, setRounds] = useState(0);
  const [loser, setLoser] = useState(null);
  const [error, setError] = useState('');
  const chronicleRef = useRef(null);

  const canDuel = sel1 && sel2 && sel1.id !== sel2.id;

  const getHintText = () => {
    if (sel1 && sel2 && sel1.id === sel2.id) {
      return '⚠ Un guerrero no puede batirse contra su propio reflejo';
    }
    if (canDuel) {
      return 'Los duelistas están en posición. ¡Que el destino decida!';
    }
    return 'Usa los botones <em style="color:var(--red-ink)">① Campeón</em> y <em style="color:var(--blue-ink)">② Rival</em> en las fichas de héroe';
  };

  const iniciarDuelo = async () => {
    if (!sel1 || !sel2) return;
    
    setIsCombatting(true);
    setError('');
    setWinner(null);
    setLog([]);
    setRounds(0);
    setLoser(null);

    try {
      const data = await apiFetch('/combates', {
        method: 'POST',
        body: JSON.stringify({ id1: sel1.id, id2: sel2.id })
      });
      
      const lines = data.log || [];
      let i = 0;

      const tick = setInterval(() => {
        if (i >= lines.length) {
          clearInterval(tick);
          setWinner(data.ganador);
          setRounds(data.rondas);
          setLoser(data.perdedor);
          setIsCombatting(false);
          onDuelComplete();
          return;
        }

        const l = lines[i++];
        setLog(prev => [...prev, l]);
        
        if (chronicleRef.current) {
          chronicleRef.current.scrollTop = chronicleRef.current.scrollHeight;
        }
      }, 300);

    } catch (e) {
      setError(e.message);
      setIsCombatting(false);
    }
  };

  const getLogClass = (line) => {
    if (line.includes('🏆') || line.includes('Ganador')) return 'chr-victory';
    if (line.includes('iniciativa') || line.includes('⚔️')) return 'chr-first';
    return 'chr-round';
  };

  return (
    <section id="section-duelo" className="section">
      <div className="codex-arena">
        {error && <div className="status-msg st-error">{error}</div>}

        <div className="duel-stage">
          <CombatantSlot hero={sel1} slotType="a" />
          <div className="vs-ornament">VS</div>
          <CombatantSlot hero={sel2} slotType="b" />
        </div>

        <p className="combat-hint" dangerouslySetInnerHTML={{ __html: getHintText() }} />

        <button 
          className="duel-btn" 
          onClick={iniciarDuelo} 
          disabled={!canDuel || isCombatting}
        >
          ✦ Que comience el duelo ✦
        </button>

        {(log.length > 0 || isCombatting) && (
          <div className="chronicle" ref={chronicleRef}>
            {isCombatting && log.length === 0 && (
              <span className="spinner"></span>
            )}
            {log.map((line, idx) => (
              <div key={idx} className={`chronicle-line ${getLogClass(line)}`}>
                {line}
              </div>
            ))}
          </div>
        )}

        {winner && (
          <div className="victory-scroll">
            <p className="victory-name">✦ {winner} ✦</p>
            <p className="victory-sub">
              sale victorioso de {rounds} ronda{rounds !== 1 ? 's' : ''} de combate
            </p>
            <p className="victory-sub" style={{marginTop: '.3rem', fontSize: '.78rem'}}>
              {loser} yace en el polvo
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
