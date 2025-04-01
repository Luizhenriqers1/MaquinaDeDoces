import React, { useState, useEffect } from "react";
import "./CandyMachine.css";
import { time } from "framer-motion";

const CANDIES = [
  { name: "Doce A", price: 6, color: "#d34b35", hoverColor: "#d34b35", emoji: "🥜" },
  { name: "Doce B", price: 7, color: "#445b6f", hoverColor: "#445b6f", emoji: "🍬" },
  { name: "Doce C", price: 8, color: "#8b9667", hoverColor: "#8b9667", emoji: "🍫" },
];

export default function CandyMachine({ onComplete }) {
  const [credit, setCredit] = useState(0);
  const [selectedCandy, setSelectedCandy] = useState(null);
  const [dispensed, setDispensed] = useState(null);
  const [change, setChange] = useState(0);
  const [activeMoneyButton, setActiveMoneyButton] = useState(null);
  const [leverPosition, setLeverPosition] = useState("up");
  const [showExitButton, setShowExitButton] = useState(false);

  useEffect(() => {
    if (dispensed) {
      const timer = setTimeout(() => {
        setDispensed(null);
        setChange(0);
        setSelectedCandy(null);
        setCredit(0);
        setShowExitButton(true); 
        }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [dispensed]);

  const handleExit = () => {
    setShowExitButton(false);
    if (onComplete) {
      onComplete();
    }
  };
  const insertMoney = (amount) => {
    setActiveMoneyButton(amount);
    setTimeout(() => setActiveMoneyButton(null), 200);
    setCredit((prev) => prev + amount);
  };

  const selectCandy = (candy) => {
    setSelectedCandy(candy);
  };

  const buyCandy = () => {
    if (selectedCandy && credit >= selectedCandy.price) {
      setLeverPosition("down");
      const calculatedChange = credit - selectedCandy.price;
      setCredit(0);
      setChange(calculatedChange > 0 ? calculatedChange : 0);

      setTimeout(() => {
        setDispensed(selectedCandy);
        setShowExitButton(false)
      }, 300);

      setTimeout(() => setLeverPosition("up"), 500);
    }
  };

  return (
    <div className="machine-container" style={{ 
      backgroundImage: "url(public/images/candybg.png)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh"
    }}>

      <div className="machine">
      <h1 className="title">Máquina de Doces 🍬</h1>
        <div className="screens-container">
          <div className="credit-screen">
            <p className="screen-label">CRÉDITO</p>
            <p className="screen-value">R${credit},00</p>
          </div>
          <div className="change-screen">
            <p className="screen-label">TROCO</p>
            <p className="screen-value">{change > 0 ? `R$${change},00` : "R$0,00"}</p>
          </div>
        </div>

        <div className="margem-button">
          <div className="buttons">
            {CANDIES.map((candy) => {
              const isAvailable = credit >= candy.price;
              const isSelected = selectedCandy?.name === candy.name;

              let candyEmoji = '';
              if (candy.name === "Doce A") candyEmoji = "🥜";
              else if (candy.name === "Doce B") candyEmoji = "🍬";
              else if (candy.name === "Doce C") candyEmoji = "🍫";

              return (
                <button
                  key={candy.name}
                  onClick={() => selectCandy(candy)}
                  className={`candy-button ${isAvailable ? "available" : "unavailable"} ${isSelected ? "selected" : ""
                    }`}
                  disabled={!isAvailable}
                  style={{
                    backgroundColor: isAvailable ? candy.color : "",
                    border: isSelected ? "3px solid white" : "none",
                    boxShadow: isSelected ? "0 0 10px white" : "none",
                  }}
                >
                  {candy.name.replace("Doce ", "")}
                  <div className="candy-emoji">{candyEmoji}</div>
                  <div className="candy-price">R${candy.price},00</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="money-buttons">
          {[1, 2, 5].map((value) => (
            <button
              key={value}
              onClick={() => insertMoney(value)}
              className={`money-button ${activeMoneyButton === value ? "money-button-active" : ""
                }`}
            >
              Inserir R${value},00
            </button>
          ))}
        </div>

        <div className="lever-container">
          <button
            onClick={buyCandy}
            disabled={!selectedCandy || credit < selectedCandy.price}
            className={`lever ${leverPosition}`}
          >
            <div className="lever-handle"></div>
          </button>
        </div>

        <div className="dispense-area">
          {dispensed && (
            <div
              className="candy-dispensed"
              style={{ backgroundColor: dispensed.color }}
            >
              {dispensed.emoji}
            </div>
          )}
        </div>

        {showExitButton && (
          <button 
            onClick={handleExit}
            className="exit-button"
          >
            Finalizar Compra
          </button>
        )}
      </div>
    </div>
  );
}