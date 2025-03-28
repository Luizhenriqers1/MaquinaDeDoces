import { useState } from 'react';
import CandyMachine from "./components/CandyMachine";
import './App.css';

function App() {
  const [gamePhase, setGamePhase] = useState('intro'); // intro, inside, interaction, candyMachine
  const [dialogueIndex, setDialogueIndex] = useState(0);

  // Cenas e diálogos
  const story = {
    intro: {
      background: 'url(/images/store-front.png)',
      dialogues: [
        "Você está em frente à 'Doce Ilusão', uma loja de doces vintage com vitrais coloridos...",
        "O cheiro de algodão doce fresco e caramelo derretido te atrai para dentro..."
      ]
    },
    inside: {
      background: 'url(/images/store-interior.png)',
      dialogues: [
        "O interior é como uma cápsula do tempo, com balcões de mármore e displays de vidro curvos...",
        "Uma atendente com avental de babados se aproxima sorrindo..."
      ]
    },
    interaction: {
      background: 'url(/images/store-counter.png)',
      dialogues: [
        "Atendente: 'Bem-vindo à Doce Ilusão! Nossa máquina de doces está cheia de surpresas hoje.'",
        "Ela aponta para uma máquina vintage no canto: 'Quer tentar a sorte?'"
      ]
    }
  };

  const handleNext = () => {
    if (dialogueIndex < story[gamePhase].dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      // Transição entre fases
      if (gamePhase === 'intro') setGamePhase('inside');
      else if (gamePhase === 'inside') setGamePhase('interaction');
      else if (gamePhase === 'interaction') setGamePhase('candyMachine');
      setDialogueIndex(0);
    }
  };

  return (
    <div className="App">
      {gamePhase !== 'candyMachine' ? (
        <div 
          className="visual-novel-scene" 
          style={{ backgroundImage: story[gamePhase].background }}
        >
          <div className="dialogue-box">
            <p>{story[gamePhase].dialogues[dialogueIndex]}</p>
            <button onClick={handleNext}>
              {dialogueIndex < story[gamePhase].dialogues.length - 1 ? '▶' : '➤'}
            </button>
          </div>
        </div>
      ) : (
        <CandyMachine /> // Sua máquina de doces original aparece aqui
      )}
    </div>
  );
}

export default App;