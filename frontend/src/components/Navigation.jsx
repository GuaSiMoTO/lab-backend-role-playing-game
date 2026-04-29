export default function Navigation({ activeTab, onTabChange }) {
  return (
    <nav className="grimoire-nav">
      <button 
        className={`nav-tab ${activeTab === 'heroes' ? 'active' : ''}`} 
        onClick={() => onTabChange('heroes')}
      >
        Héroes
      </button>
      <button 
        className={`nav-tab ${activeTab === 'inscribir' ? 'active' : ''}`} 
        onClick={() => onTabChange('inscribir')}
      >
        Inscribir
      </button>
      <button 
        className={`nav-tab ${activeTab === 'duelo' ? 'active' : ''}`} 
        onClick={() => onTabChange('duelo')}
      >
        Duelo
      </button>
    </nav>
  );
}
