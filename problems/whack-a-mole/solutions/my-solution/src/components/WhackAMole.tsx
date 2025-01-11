import React, { useState, useEffect, useCallback } from "react";

const WhackAMole = () => {
  const [score, setScore] = useState(0);
  const [moles, setMoles] = useState(Array(9).fill(false));
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  const showRandomMoles = useCallback(() => {
    if (!gameActive) return;

    const newMoles = Array(9).fill(false);
    // Show exactly 2 moles
    let molesShown = 0;
    while (molesShown < 2) {
      const randomIndex = Math.floor(Math.random() * 9);
      if (!newMoles[randomIndex]) {
        newMoles[randomIndex] = true;
        molesShown++;
      }
    }
    setMoles(newMoles);
  }, [gameActive]);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    showRandomMoles();
  };

  const stopGame = () => {
    setGameActive(false);
    setMoles(Array(9).fill(false));
    setGameOver(true);
  };

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            stopGame();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameActive]);

  // Mole appearance effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameActive) {
      timer = setInterval(showRandomMoles, 1000);
    }
    return () => clearInterval(timer);
  }, [gameActive, showRandomMoles]);

  const whackMole = (index: number) => {
    if (!gameActive) return;
    if (moles[index]) {
      setScore((prev) => prev + 1);
      const newMoles = [...moles];
      newMoles[index] = false;
      setMoles(newMoles);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex justify-between w-full max-w-xl mb-4">
        <div className="text-white text-2xl">Score: {score}</div>
        <div className="text-white text-2xl">Time: {timeLeft}s</div>
      </div>

      {gameOver && (
        <div className="mb-4 text-white text-3xl font-bold">
          Game Over! Final Score: {score}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-4">
        {moles.map((isVisible, index) => (
          <div
            key={index}
            className="relative w-40 h-40 cursor-pointer"
            onClick={() => whackMole(index)}
          >
            {isVisible && (
              <img
                className="absolute top-0 left-0 w-40 h-40 transition-all duration-200 transform hover:scale-105"
                alt="mole head"
                src="https://pub-473edaec9c9b416fb6c35c8854296a05.r2.dev/mole-head.png"
              />
            )}
            <img
              className="absolute bottom-0 left-0 w-40"
              alt="mole hill"
              src="https://pub-473edaec9c9b416fb6c35c8854296a05.r2.dev/mole-hill.png"
            />
          </div>
        ))}
      </div>

      <div className="space-x-4">
        {!gameActive && (
          <button
            onClick={startGame}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            {gameOver ? "Play Again" : "Start Game"}
          </button>
        )}
      </div>
    </div>
  );
};

export default WhackAMole;
