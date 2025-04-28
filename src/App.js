import { useState } from "react";
import CandyMachine from "./components/CandyMachine";
import SceneSelector from "./components/SceneSelector";
import ElevatorCabin from "./components/ElevatorCabin";
import FloorScene from "./components/FloorScene";
import BackgroundScene from "./components/BackgroundScene";
import story from "./data/stories";
import "./App.css";

function App() {
  const [gamePhase, setGamePhase] = useState("select");
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [currentFloor, setCurrentFloor] = useState(null);
  const [visitedFloors, setVisitedFloors] = useState([]);

  const specialDialogue = {
    background: 'url(/images/all-floors-visited.png)',
    text: "Você explorou todos os andares do prédio! Agora pode voltar para a loja de doces."
  };

  const handleFloorSelection = (floor) => {
    setCurrentFloor(floor);
    setVisitedFloors(prev => [...prev, floor]);
    setGamePhase("floorScene");
  };

  const handleBackToElevator = () => {
    setGamePhase("elevatorStory");
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
        <ElevatorCabin
          onSelectFloor={handleFloorSelection}
          visitedFloors={visitedFloors}
        />
      ) : gamePhase === "floorScene" ? (
        <FloorScene
          floor={currentFloor}
          visitedFloors={visitedFloors}
          onBack={handleBackToElevator}
          onFinish={(target) => setGamePhase(target || "candyMachine")}
        />
      ) : gamePhase === "specialDialogue" ? (
        <BackgroundScene background={specialDialogue.background}>
          <div className="dialogue-box">
            <p>{specialDialogue.text}</p>
            <button onClick={() => setGamePhase("candyMachine")}>
              Ir para Loja de Doces
            </button>
          </div>
        </BackgroundScene>
      ) : gamePhase === "candyMachine" ? (
        <CandyMachine onComplete={() => setGamePhase("exit")} />
      ) : gamePhase === "end" ? (
        <BackgroundScene background={story.end.background}>
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
        </BackgroundScene>
      ) : (
        <BackgroundScene background={story[gamePhase].background}>
          <div className="dialogue-box">
            <p>{story[gamePhase].dialogues[dialogueIndex]}</p>
            <button onClick={handleNext}>
              {dialogueIndex < story[gamePhase].dialogues.length - 1 ? "▶" : "➤"}
            </button>
          </div>
        </BackgroundScene>
      )}
    </div>
  );
}

export default App;
