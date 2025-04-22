import React from "react";
import "./SceneSelector.css";

export default function SceneSelector({ onSelect }) {
  return (
    <div className="scene-selector">
      <h1 className="selector-title">Escolha o Cenário</h1>
      <div className="selector-buttons">
        <button onClick={() => onSelect("introA")}>📖 Cenário A</button>
        <button onClick={() => onSelect("elevatorStory")}>🛗 Cenário B</button>
      </div>
    </div>
  );
}
