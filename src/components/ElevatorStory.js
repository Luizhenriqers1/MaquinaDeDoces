import React, { useState } from "react";
import ElevatorCabin from "./ElevatorCabin";
import FloorScene from "./FloorScene";
import "./ElevatorStory.css";

export default function ElevatorStory({ onComplete }) {
  const [phase, setPhase] = useState("intro"); // intro, elevator, floor
  const [floor, setFloor] = useState(null);

  const shoppingNarrative = [
    "Você entra em um shopping enorme, repleto de vitrines brilhantes.",
    "Um elevador elegante de vidro espelhado te convida para uma jornada curiosa...",
    "Você se aproxima do elevador, a porta se abre automaticamente."
  ];

  const [index, setIndex] = useState(0);

  const nextDialogue = () => {
    if (index < shoppingNarrative.length - 1) {
      setIndex(index + 1);
    } else {
      setPhase("elevator");
    }
  };

  return (
    <>
      {phase === "intro" && (
        <div className="visual-novel-scene" style={{ backgroundImage: `url('/images/shopping.png')` }}>
          <div className="dialogue-box">
            <p>{shoppingNarrative[index]}</p>
            <button onClick={nextDialogue}>
              {index < shoppingNarrative.length - 1 ? "▶" : "▶"}
            </button>
          </div>
        </div>
      )}

      {phase === "elevator" && (
        <ElevatorCabin
          onSelectFloor={(f) => {
            setFloor(f);
            setPhase("floor");
          }}
        />
      )}

      {phase === "floor" && (
        <FloorScene
          floor={floor}
          onBack={() => setPhase("elevator")}
          onFinish={() => onComplete()}
        />
      )}
    </>
  );
}
