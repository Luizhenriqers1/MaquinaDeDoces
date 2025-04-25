import React from "react";
import "./ElevatorStory.css";

const floorData = {
  0: {
    image: "/images/loja-roupa.png",
    text: "Você entra em uma loja de roupas cheia de peças vintage e vitrines coloridas."
  },
  1: {
    image: "/images/loja-tenis.png",
    text: "Tênis flutuam nas prateleiras de uma loja moderna e iluminada."
  },
  2: {
    image: "/images/petshop.png",
    text: "Um petshop barulhento e cheio de filhotes adoráveis te recebe."
  },
  3: {
    image: "/images/loja-doces.png",
    text: "A loja de doces te transporta para um mundo mágico de sabores e cores."
  }
};

export default function FloorScene({ floor, onBack, onFinish }) {
  const scene = floorData[floor];

  return (
    <div className="visual-novel-scene" style={{ backgroundImage: `url('${scene.image}')` }}>
      <div className="dialogue-box">
        <p>{scene.text}</p>
        <div className="dialogue-buttons">
          <button onClick={onBack}>↕️</button>
          <button onClick={onFinish}>🔚</button>
        </div>
      </div>
    </div>
  );
}
