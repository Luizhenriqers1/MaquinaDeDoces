import React, { useState, useEffect } from "react";
import "./ElevatorCabin.css";

export default function ElevatorCabin({ onSelectFloor, visitedFloors = [] }) {
  const [elevatorPhase, setElevatorPhase] = useState("doorOpening");
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [currentFloor, setCurrentFloor] = useState(() => {
    // Inicializa com o último andar visitado ou com 0 se não houver nenhum
    return visitedFloors.length > 0 ? visitedFloors[visitedFloors.length - 1] : 0;
  });
  const [direction, setDirection] = useState(null); // 'up' ou 'down'

  // Efeito para controlar as transições de fase do elevador
  useEffect(() => {
    let timer;
    
    if (elevatorPhase === "doorOpening") {
      timer = setTimeout(() => setElevatorPhase("waitingInside"), 2000);
    } else if (elevatorPhase === "doorClosing") {
      timer = setTimeout(() => setElevatorPhase("moving"), 2000);
    } else if (elevatorPhase === "moving") {
      timer = setTimeout(() => setElevatorPhase("arrived"), 3000);
    } else if (elevatorPhase === "arrived" && selectedFloor !== null) {
      timer = setTimeout(() => {
        onSelectFloor(selectedFloor);
        setCurrentFloor(selectedFloor); // Atualiza o andar atual quando chegamos
        setSelectedFloor(null); // Reseta o andar selecionado
        setElevatorPhase("doorOpening"); // Reseta para porta abrindo para o próximo uso
      }, 2000);
    }
    
    return () => clearTimeout(timer);
  }, [elevatorPhase, selectedFloor, onSelectFloor]);

  // Atualiza o andar atual quando visitedFloors mudar
  useEffect(() => {
    if (visitedFloors.length > 0) {
      setCurrentFloor(visitedFloors[visitedFloors.length - 1]);
    }
  }, [visitedFloors]);

  // Função para selecionar um andar e calcular direção
  const handleSelectFloor = (floor) => {
    // Não faz nada se já estamos neste andar
    if (floor === currentFloor) {
      return;
    }
    
    // Determina a direção comparando com o andar atual
    const newDirection = floor > currentFloor ? "up" : "down";
    setDirection(newDirection);
    
    // Define o andar selecionado
    setSelectedFloor(floor);
    
    // Começa a fechar as portas
    setElevatorPhase("doorClosing");
  };

  return (
    <div className="elevator-view">
      {/* Fase: Porta abrindo */}
      {elevatorPhase === "doorOpening" && (
        <p className="elevator-text">🚪 Porta abrindo...</p>
      )}

      {/* Fase: Esperando seleção de andar */}
      {elevatorPhase === "waitingInside" && (
        <div className="elevator-panel">
          <h2>Escolha um andar</h2>
          <p>Andar atual: {currentFloor}</p>
          <div className="elevator-buttons">
            {[0, 1, 2, 3].map((floor) => (
              <button 
                key={floor} 
                onClick={() => handleSelectFloor(floor)}
                className={currentFloor === floor ? "selected-floor" : ""}
                disabled={currentFloor === floor}
              >
                {floor}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Fase: Porta fechando */}
      {elevatorPhase === "doorClosing" && (
        <p className="elevator-text">🚪 Porta fechando...</p>
      )}

      {/* Fase: Movimento (subindo ou descendo) */}
      {elevatorPhase === "moving" && (
        <div className="elevator-movement">
          <p className="elevator-text">
            {direction === "up" ? "⬆️ Subindo..." : "⬇️ Descendo..."}
          </p>
          <p className="elevator-text">
            De: {currentFloor} → Para: {selectedFloor}
          </p>
        </div>
      )}

      {/* Fase: Chegada no andar */}
      {elevatorPhase === "arrived" && (
        <p className="elevator-text">🔔 Chegamos ao andar {selectedFloor}</p>
      )}
    </div>
  );
}