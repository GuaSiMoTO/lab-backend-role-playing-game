const SPECIES_ICON = { humano: '🧑', enano: '⛏', elfo: '🧝' };

export default function CombatantSlot({ hero, slotType }) {
  const slotClass = slotType === 'a' ? 'slot-a' : 'slot-b';
  
  if (!hero) {
    return (
      <div className={`combatant-slot ${slotClass}`}>
        <div style={{fontSize: '1.8rem', opacity: '.25'}}>{slotType === 'a' ? '⚔' : '🛡'}</div>
        <p>
          Elige un {slotType === 'a' ? 'campeón' : 'rival'}<br/>desde el registro
        </p>
      </div>
    );
  }

  return (
    <div className={`combatant-slot ${slotClass} filled`}>
      <div style={{fontSize: '1.6rem'}}>{SPECIES_ICON[hero.especie]}</div>
      <h3>{hero.nombre}</h3>
      <p>{hero.especie} · {hero.categoria}</p>
      <small>
        ❤ {hero.stats.vida} · ⚔ {hero.stats.ataque} · ⚡ {hero.stats.iniciativa}
      </small>
    </div>
  );
}
