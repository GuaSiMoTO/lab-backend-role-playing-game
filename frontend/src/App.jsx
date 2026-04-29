import { useState } from 'react';
import Header from './components/layout/Header';
import Navigation from './components/Navigation';
import HeroesSection from './components/HeroesSection';
import InscriptionForm from './components/InscriptionForm';
import DuelArena from './components/DuelArena';
import Footer from './components/layout/Footer';

function App() {
  const [tab, setTab] = useState('heroes');
  const [sel1, setSel1] = useState(null);
  const [sel2, setSel2] = useState(null);

  const handlePickSlot1 = (hero) => {
    setSel1(hero);
    setTab('duelo');
  };

  const handlePickSlot2 = (hero) => {
    setSel2(hero);
    setTab('duelo');
  };

  const handleDuelComplete = () => {
    // Heroes will be reloaded in HeroesSection
  };

  return (
    <div className="app">
      <Header />
      <Navigation activeTab={tab} onTabChange={setTab} />

      {tab === 'heroes' && (
        <HeroesSection 
          onPickSlot1={handlePickSlot1}
          onPickSlot2={handlePickSlot2}
          sel1={sel1}
          sel2={sel2}
        />
      )}
      {tab === 'inscribir' && (
        <InscriptionForm 
          onHeroCreated={() => setTab('heroes')}
        />
      )}
      {tab === 'duelo' && (
        <DuelArena 
          sel1={sel1}
          sel2={sel2}
          onDuelComplete={handleDuelComplete}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;