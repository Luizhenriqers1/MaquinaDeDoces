import { useState } from "react";
import CandyMachine from "./components/CandyMachine";
import SceneSelector from "./components/SceneSelector";
import ElevatorStory from "./components/ElevatorStory"; // futura história do elevador
import "./App.css";

function App() {
  const [gamePhase, setGamePhase] = useState("select");
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const story = {
    introA: {
      background: 'url(/images/store-front.png)',
      dialogues: [
        "Você está em frente à loja de doces...",
        "O cheiro de algodão doce te atrai para dentro..."
      ]
    },
    inside: {
      background: 'url(/images/store-interior.png)',
      dialogues: [
        "O interior é como uma cápsula do tempo...",
        "Uma atendente se aproxima sorrindo..."
      ]
    },
    interaction: {
      background: 'url(/images/store-counter.png)',
      dialogues: [
        "Atendente: 'Seja bem-vindo à nossa loja!'",
        "'Quer tentar a sorte na máquina de doces?'"
      ]
    },
    exit: {
      background: 'url(/images/store-cat.png)',
      dialogues: [
        "Atendente: 'Volte sempre que quiser doçura!'"
      ]
    },
    end: {
      background: 'url(/images/store-front.png)',
      dialogues: ["Obrigado por jogar!"],
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
      if (gamePhase === "introA") setGamePhase("inside");
      else if (gamePhase === "inside") setGamePhase("interaction");
      else if (gamePhase === "interaction") setGamePhase("candyMachine");
      else if (gamePhase === "exit") setGamePhase("end");
      setDialogueIndex(0);
    }
  };

  return (
    <div className="App">
      {gamePhase === "select" ? (
        <SceneSelector onSelect={(scene) => setGamePhase(scene)} />
      ) : gamePhase === "elevatorStory" ? (
        <ElevatorStory onComplete={() => setGamePhase("select")} />
      ) : gamePhase === "candyMachine" ? (
        <CandyMachine onComplete={() => setGamePhase("exit")} />
      ) : gamePhase === "end" ? (
        <div
          className="visual-novel-scene end-scene"
          style={{ backgroundImage: story.end.background }}
        >
          <div className="dialogue-box">
            <p>{story.end.dialogues[dialogueIndex]}</p>
            <button
              className="play-again-button"
              onClick={() => {
                setGamePhase("select");
                setDialogueIndex(0);
              }}
            >
              Jogar Novamente
            </button>
          </div>
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
              {dialogueIndex < story[gamePhase].dialogues.length - 1 ? "▶" : "➤"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
