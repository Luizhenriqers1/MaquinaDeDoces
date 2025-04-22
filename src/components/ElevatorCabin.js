import React from "react";
import "./ElevatorStory.css";

export default function ElevatorCabin({ onSelectFloor }) {
  const floors = [0, 1, 2, 3];

  return (
    <div className="elevator-cabin">
      <h2 className="elevator-title">Escolha um andar</h2>
      <div className="floor-buttons">
        {floors.map((floor) => (
          <button key={floor} onClick={() => onSelectFloor(floor)}>
            Andar {floor}
          </button>
        ))}
      </div>
    </div>
  );
}
