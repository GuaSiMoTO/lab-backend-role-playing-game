import { useEffect, useState } from "react";
import { getCharacters } from "./services/api";
import CharacterCard from "./components/CharacterCard";
import CreateForm from "./components/CreateForm";
import CombatArena from "./components/CombatArena";

export default function App() {
  const [chars, setChars] = useState([]);
  const [tab, setTab] = useState("personajes");

  const [sel1, setSel1] = useState(null);
  const [sel2, setSel2] = useState(null);

  const loadChars = async () => {
    const data = await getCharacters();
    setChars(data);
  };

  useEffect(() => {
    loadChars();
  }, []);

  return (
    <div className="app">

      <h1>⚔ Crónicas del Reino</h1>

      {/* NAV */}
      <div className="tabs">
        <button onClick={() => setTab("personajes")}>Personajes</button>
        <button onClick={() => setTab("crear")}>Forja</button>
        <button onClick={() => setTab("combate")}>Arena</button>
      </div>

      {/* PERSONAJES */}
      {tab === "personajes" && (
        <div className="grid">
          {chars.map((p) => (
            <CharacterCard
              key={p.id}
              p={p}
              setSel1={setSel1}
              setSel2={setSel2}
              reload={loadChars}
            />
          ))}
        </div>
      )}

      {/* CREAR */}
      {tab === "crear" && <CreateForm reload={loadChars} />}

      {/* COMBATE */}
      {tab === "combate" && (
        <CombatArena sel1={sel1} sel2={sel2} reload={loadChars} />
      )}

    </div>
  );
}