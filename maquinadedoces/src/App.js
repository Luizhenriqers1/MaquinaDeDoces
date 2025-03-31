import { useState } from 'react';
import CandyMachine from "./components/CandyMachine";
import './App.css';

function App() {
  const [gamePhase, setGamePhase] = useState('intro'); // intro, inside, interaction, candyMachine, exit, end
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
      background: 'url(/images/store-cat.png)',
      dialogues: [
        "Atendente: 'Muito obrigada por comprar com a gente!'",
        "Ela entrega seu doce em um saquinho colorido: 'Volte sempre que quiser um pouco de doçura na sua vida!'"
      ]
    },
    end: {
      background: 'url(/images/store-front.png)',
      dialogues: [
        "'Obrigado por jogar!'"
      ],
      credits: `Desenvolvido por:
      Eloisa Alves Silva - 821216356
      Luiz Henrique Ribeiro da Silva - 821224356
      Matias Porto Lima - 82120858
      Samuel Lima Nunes - 821234484`
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
      else if (gamePhase === 'exit') setGamePhase('end');
      setDialogueIndex(0);
    }
  };

  return (
    <div className="App">
      {gamePhase === 'candyMachine' ? (
        <CandyMachine onComplete={() => setGamePhase('exit')} />
      ) : gamePhase === 'end' ? (
        <div 
          className="visual-novel-scene end-scene" 
          style={{ backgroundImage: story.end.background }}
        >
          <div className="dialogue-box">
            <p>{story.end.dialogues[dialogueIndex]}</p>
            <button onClick={() => setGamePhase('intro')}>
              Jogar Novamente
            </button>
          </div>
          {/* Nova caixa de créditos */}
          <div className="credits-box">
            {story.end.credits.split('\n').map((line, i) => (
        <p key={i} style={{ margin: '5px 0' }}>{line}</p>
      ))}
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
              {dialogueIndex < story[gamePhase].dialogues.length - 1 ? '▶' : 
               gamePhase === 'exit' ? 'Fim' : '➤'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;