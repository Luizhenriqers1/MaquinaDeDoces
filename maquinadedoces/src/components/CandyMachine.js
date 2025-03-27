import React, { useState, useEffect } from "react";
import "./CandyMachine.css";

const CANDIES = [
  { name: "Doce A", price: 6 },
  { name: "Doce B", price: 7 },
  { name: "Doce C", price: 8 },
];

export default function CandyMachine() {
  const [credit, setCredit] = useState(0);
  const [selectedCandy, setSelectedCandy] = useState(null);
  const [dispensed, setDispensed] = useState(null);
  const [change, setChange] = useState(0);

  useEffect(() => {
    if (dispensed) {
      setTimeout(() => {
        setDispensed(null);
        setChange(0);
        setSelectedCandy(null);
        setCredit(0);
      }, 5000);
    }
  }, [dispensed]);

  const insertMoney = (amount) => {
    setCredit((prev) => prev + amount);
  };

  const selectCandy = (candy) => {
    setSelectedCandy(candy);
  };

  const buyCandy = () => {
    if (selectedCandy && credit >= selectedCandy.price) {
      setChange(credit - selectedCandy.price);
      setDispensed(selectedCandy);
    }
  };

  return (
    <div className="machine-container">
      <h1 className="title">Máquina de Doces 🍬</h1>

      <div className="machine">
        <div className="screen">
          <p>Crédito: R${credit},00</p>
          {change > 0 && <p>Troco: R${change},00</p>}
        </div>

        <div className="buttons">
          {CANDIES.map((candy) => (
            <button
              key={candy.name}
              onClick={() => selectCandy(candy)}
              className={`candy-button ${
                credit >= candy.price ? "available" : "unavailable"
              } ${selectedCandy?.name === candy.name ? "selected" : ""}`}
              disabled={credit < candy.price}
            >
              {candy.name} - R${candy.price},00
            </button>
          ))}
        </div>

        <div className="money-buttons">
          {[1, 2, 5].map((value) => (
            <button
              key={value}
              onClick={() => insertMoney(value)}
              className="money-button"
            >
              Inserir R${value},00
            </button>
          ))}
        </div>

        <button
          onClick={buyCandy}
          disabled={!selectedCandy || credit < selectedCandy.price}
          className="buy-button"
        >
          Comprar 🍭
        </button>

        {dispensed && (
          <div className="candy-dispensed">{dispensed.name} foi entregue!</div>
        )}
      </div>
    </div>
  );
}
