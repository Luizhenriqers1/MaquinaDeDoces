import React, { useState, useEffect } from "react";
import "./ElevatorCabin.css";

export default function ElevatorCabin({ onSelectFloor }) {
  const [elevatorPhase, setElevatorPhase] = useState("doorOpening");
  const [selectedFloor, setSelectedFloor] = useState(null);

  useEffect(() => {
    if (elevatorPhase === "doorOpening") {
      setTimeout(() => setElevatorPhase("waitingInside"), 2000); // 2s anima porta abrindo
    } else if (elevatorPhase === "doorClosing") {
      setTimeout(() => setElevatorPhase("moving"), 2000); // 2s anima porta fechando
    } else if (elevatorPhase === "moving") {
      setTimeout(() => setElevatorPhase("arrived"), 3000); // 3s subindo
    }
  }, [elevatorPhase]);

  useEffect(() => {
    if (elevatorPhase === "arrived" && selectedFloor !== null) {
      setTimeout(() => onSelectFloor(selectedFloor), 2000); // Depois de chegar, ir para o andar
    }
  }, [elevatorPhase, selectedFloor, onSelectFloor]);

  const handleSelectFloor = (floor) => {
    setSelectedFloor(floor);
    setElevatorPhase("doorClosing");
  };

  return (
    <div className="elevator-view">
      {elevatorPhase === "doorOpening" && <p className="elevator-text">🚪 Porta abrindo...</p>}

      {elevatorPhase === "waitingInside" && (
        <div className="elevator-panel">
          <h2>Escolha um andar</h2>
          <div className="elevator-buttons">
            {[0, 1, 2, 3].map((floor) => (
              <button key={floor} onClick={() => handleSelectFloor(floor)}>
                {floor}
              </button>
            ))}
          </div>
        </div>
      )}

      {elevatorPhase === "doorClosing" && <p className="elevator-text">🚪 Porta fechando...</p>}
      {elevatorPhase === "moving" && <p className="elevator-text">⬆️ Subindo...</p>}
      {elevatorPhase === "arrived" && <p className="elevator-text">🔔 Chegamos ao andar {selectedFloor}</p>}
    </div>
  );
}
