import React from "react";
import "./FloorScene.css";

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
    image: "/images/mirante.png",
    text: "Você chega ao mirante do prédio e consegue ver toda a cidade no inverno."
  }
};

export default function FloorScene({ floor, onBack, onFinish }) {
  const scene = floorData[floor];

  return (
    <div className="visual-novel-scene" style={{ backgroundImage: `url('${scene.image}')` }}>
      <div className="dialogue-box">
        <p>{scene.text}</p>
        <div className="dialogue-buttons">
          <button onClick={onBack}>↕️ Voltar ao Elevador</button>
          <button onClick={() => onFinish("end")}>🔚 Finalizar História</button>
        </div>
      </div>
    </div>
  );
}