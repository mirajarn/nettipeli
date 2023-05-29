import React, { useState, useEffect } from "react";

function GeneroiNimiTietovisaan({ tietovisaMembers, currentIndex }) {
  const [pelaaja, setPelaaja] = useState("");

  useEffect(() => {
    generateRandomName();
  }, [currentIndex]);

  function generateRandomName() {
    const randomIndex = getRandomNumber(0, tietovisaMembers.length - 1);
    const selectedPlayer = tietovisaMembers[randomIndex];
    setPelaaja(selectedPlayer);
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <>
      <p>{pelaaja}</p>
    </>
  );
}

export default GeneroiNimiTietovisaan;
