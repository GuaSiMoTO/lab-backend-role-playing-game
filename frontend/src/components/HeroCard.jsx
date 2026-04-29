const SPECIES_ICON = { humano: '🧑', enano: '⛏', elfo: '🧝' };
const CAT_LABEL = { guerrero: 'Gue', explorador: 'Exp', mago: 'Mag' };

export default function HeroCard({ hero, isSelected1, isSelected2, onPickSlot1, onPickSlot2, onDelete }) {
  const selectedClass = isSelected1 ? 'sel-1' : isSelected2 ? 'sel-2' : '';

  return (
    <div className={`hero-scroll ${selectedClass}`} id={`card-${hero.id}`}>
      <div className={`scroll-species-bar bar-${hero.especie}`}></div>
      <div className="scroll-body">
        <div style={{display: 'flex', alignItems: 'flex-start', gap: '.4rem'}}>
          <div style={{flex: 1}}>
            <div className="scroll-name">{hero.nombre}</div>
            <div className="scroll-sub">
              <span>{SPECIES_ICON[hero.especie] || '👤'} {hero.especie}</span>
              <span className="sep">·</span>
              <span>{hero.categoria}</span>
            </div>
          </div>
          <div className={`wax-seal seal-${hero.categoria}`}>{CAT_LABEL[hero.categoria]}</div>
        </div>
        <table className="stats-table">
          <tbody>
            <tr><td>Puntos de vida</td><td>{hero.stats.vida}</td></tr>
            <tr><td>Fuerza de ataque</td><td>{hero.stats.ataque}</td></tr>
            <tr><td>Armadura</td><td>{hero.stats.defensa}</td></tr>
            <tr><td>Iniciativa</td><td>{hero.stats.iniciativa}</td></tr>
          </tbody>
        </table>
        <div className="scroll-record">
          Victorias: <span>{hero.victorias}</span> &nbsp;·&nbsp; Derrotas: <span>{hero.derrotas}</span>
        </div>
      </div>
      <div className="scroll-actions">
        <button className="ink-btn btn-red" onClick={() => onPickSlot1(hero.id)}>① Campeón</button>
        <button className="ink-btn btn-blue" onClick={() => onPickSlot2(hero.id)}>② Rival</button>
        <button className="ink-btn btn-del" onClick={() => onDelete(hero.id)}>Tachar</button>
      </div>
    </div>
  );
}
