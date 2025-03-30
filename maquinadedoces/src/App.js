import { useState } from 'react';
import CandyMachine from "./components/CandyMachine";
import './App.css';

function App() {
  const [gamePhase, setGamePhase] = useState('intro'); // intro, inside, interaction, candyMachine, exit
  const [dialogueIndex, setDialogueIndex] = useState(0);

  // Cenas e diálogos
  const story = {
    intro: {
      background: 'url(/images/store-front.png)',
      dialogues: [
        "Você está em frente à loja de doces, uma loja vintage com vitrais coloridos...",
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
        "Atendente: 'Seja Bem-vindo! Nossa máquina de doces está cheia de surpresas hoje.'",
        "Ela aponta para uma máquina vintage no canto: 'Quer tentar a sorte?'"
      ]
    },
    exit: {
      background: 'url(/images/store-cat.png)', // Pode usar a mesma imagem ou uma nova
      dialogues: [
        "Atendente: 'Muito obrigada por comprar com a gente!'",
        "Ela entrega seu doce em um saquinho colorido: 'Volte sempre que quiser um pouco de doçura na sua vida!'"
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
      // Não precisamos de transição automática da candyMachine para exit
      setDialogueIndex(0);
    }
  };

  return (
    <div className="App">
      {gamePhase === 'candyMachine' ? (
        <CandyMachine onComplete={() => setGamePhase('exit')} />
      ) : gamePhase === 'exit' ? (
        <div 
          className="visual-novel-scene" 
          style={{ backgroundImage: story.exit.background }}
        >
          <div className="dialogue-box">
            <p>{story.exit.dialogues[dialogueIndex]}</p>
            <button onClick={handleNext}>
              {dialogueIndex < story.exit.dialogues.length - 1 ? '▶' : 'Fim'}
            </button>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default App;