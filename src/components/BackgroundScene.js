import React from "react";
import "./BackgroundScene.css";

export default function BackgroundScene({ background, children }) {
  return (
    <div className="background-scene" style={{ backgroundImage: background }}>
      {children}
    </div>
  );
}
