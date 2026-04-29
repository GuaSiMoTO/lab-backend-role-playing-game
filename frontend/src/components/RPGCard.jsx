/**
 * RPGCard - Componente de carta de personaje estilo RPG
 * 
 * PROPS:
 * - name (string): Nombre del personaje (requerido)
 * - especie (string): Especie del personaje - "humano", "enano", "elfo" (requerido)
 * - categoria (string): Categoría/clase - "guerrero", "explorador", "mago" (requerido)
 * - image (string): URL de la imagen del personaje (opcional)
 * - stats (object): Estadísticas del personaje
 *   - vida (number): Puntos de vida
 *   - ataque (number): Puntos de ataque
 *   - defensa (number): Puntos de defensa
 *   - iniciativa (number): Puntos de iniciativa
 * - abilities (array): Array de strings con habilidades especiales (opcional)
 * - onClick (function): Función a ejecutar al hacer click en la carta (opcional)
 * 
 * EJEMPLO DE USO:
 * <RPGCard
 *   name="Aragorn"
 *   especie="humano"
 *   categoria="guerrero"
 *   image="/images/aragorn.jpg"
 *   stats={{ vida: 100, ataque: 85, defensa: 70, iniciativa: 75 }}
 *   abilities=["Espada legendaria", "Liderazgo", "Resistencia"]}
 *   onClick={() => console.log('Card clicked')}
 * />
 */

const SPECIES_COLORS = {
  humano: { bg: 'rgba(139, 94, 60, 0.9)', border: '#8b5e3c', icon: '🧑' },
  enano: { bg: 'rgba(90, 64, 32, 0.9)', border: '#5a4020', icon: '⛏' },
  elfo: { bg: 'rgba(45, 96, 80, 0.9)', border: '#2d6050', icon: '🧝' },
};

const CATEGORY_COLORS = {
  guerrero: { bg: 'rgba(192, 57, 43, 0.9)', border: '#c0392b', icon: '⚔️' },
  explorador: { bg: 'rgba(39, 174, 96, 0.9)', border: '#27ae60', icon: '🏹' },
  mago: { bg: 'rgba(41, 128, 185, 0.9)', border: '#2980b9', icon: '🔮' },
};

export default function RPGCard({ 
  name, 
  especie, 
  categoria, 
  image, 
  stats = {}, 
  abilities = [],
  onClick 
}) {
  const speciesConfig = SPECIES_COLORS[especie?.toLowerCase()] || SPECIES_COLORS.humano;
  const categoryConfig = CATEGORY_COLORS[categoria?.toLowerCase()] || CATEGORY_COLORS.guerrero;

  const defaultStats = {
    vida: stats.vida || 0,
    ataque: stats.ataque || 0,
    defensa: stats.defensa || 0,
    iniciativa: stats.iniciativa || 0,
  };

  return (
    <div className="rpg-card" onClick={onClick}>
      {/* Image Container */}
      <div className="rpg-card-image">
        {image ? (
          <img src={image} alt={name} className="rpg-card-img" />
        ) : (
          <div className="rpg-card-placeholder">
            <span className="placeholder-icon">{speciesConfig.icon}</span>
            <span className="placeholder-text">{especie}</span>
          </div>
        )}
        
        {/* Species Badge - Top Left */}
        <div className="rpg-badge rpg-badge-species" style={{
          background: speciesConfig.bg,
          borderColor: speciesConfig.border
        }}>
          <span className="badge-icon">{speciesConfig.icon}</span>
          <span className="badge-text">{especie}</span>
        </div>

        {/* Category Badge - Top Right */}
        <div className="rpg-badge rpg-badge-category" style={{
          background: categoryConfig.bg,
          borderColor: categoryConfig.border
        }}>
          <span className="badge-icon">{categoryConfig.icon}</span>
          <span className="badge-text">{categoria}</span>
        </div>

        {/* Name Overlay - Bottom */}
        <div className="rpg-card-name-overlay">
          <h3 className="rpg-card-name">{name}</h3>
        </div>
      </div>

      {/* Stats Section */}
      <div className="rpg-card-stats">
        <div className="rpg-stat-row">
          <span className="rpg-stat-label">❤️ Vida</span>
          <span className="rpg-stat-value">{defaultStats.vida}</span>
        </div>
        <div className="rpg-stat-row">
          <span className="rpg-stat-label">⚔️ Ataque</span>
          <span className="rpg-stat-value">{defaultStats.ataque}</span>
        </div>
        <div className="rpg-stat-row">
          <span className="rpg-stat-label">🛡️ Defensa</span>
          <span className="rpg-stat-value">{defaultStats.defensa}</span>
        </div>
        <div className="rpg-stat-row">
          <span className="rpg-stat-label">⚡ Iniciativa</span>
          <span className="rpg-stat-value">{defaultStats.iniciativa}</span>
        </div>
      </div>

      {/* Abilities Section */}
      {abilities && abilities.length > 0 && (
        <div className="rpg-card-abilities">
          <div className="abilities-title">Habilidades</div>
          <div className="abilities-list">
            {abilities.map((ability, index) => (
              <span key={index} className="ability-badge">
                {ability}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
