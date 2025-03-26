import React, { useState } from "react";

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

  const insertMoney = (amount) => {
    setCredit((prev) => prev + amount);
  };

  const selectCandy = (candy) => {
    setSelectedCandy(candy);
  };

  const buyCandy = () => {
    if (selectedCandy && credit >= selectedCandy.price) {
      setChange(credit - selectedCandy.price);
      setCredit(0);
      setDispensed(selectedCandy);
      setTimeout(() => setDispensed(null), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-200 h-screen">
      <h1 className="text-2xl font-bold mb-4">Máquina de Doces</h1>

      <div className="bg-gray-800 p-6 rounded-lg text-white text-center mb-4">
        <p>Crédito: R${credit},00</p>
        {change > 0 && <p>Troco: R${change},00</p>}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {CANDIES.map((candy) => (
          <button
            key={candy.name}
            onClick={() => selectCandy(candy)}
            className={`p-3 rounded-lg border ${
              selectedCandy?.name === candy.name ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {candy.name} - R${candy.price},00
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        {[1, 2, 5].map((value) => (
          <button
            key={value}
            onClick={() => insertMoney(value)}
            className="p-3 rounded-lg bg-green-500 text-white"
          >
            Inserir R${value},00
          </button>
        ))}
      </div>

      <button
        onClick={buyCandy}
        disabled={!selectedCandy || credit < selectedCandy.price}
        className="p-3 rounded-lg bg-red-500 text-white"
      >
        Comprar
      </button>

      {dispensed && (
        <div className="mt-6 p-3 bg-yellow-500 text-white rounded-lg">
          {dispensed.name} foi entregue!
        </div>
      )}
    </div>
  );
}