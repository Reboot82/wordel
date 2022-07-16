import React, { useEffect } from "react";

export default function Modal({ isCorrect, turn, solution }) {

  const handleKeyup = () => {
    newGame();
  }

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
  })

  if (turn === 1) {
    return (
      <div className="modal">
        {isCorrect && (
          <div>
            <h1>You Win!</h1>
            <p className="solution">{solution}</p>
            <p>You found the solution in {turn} guess :)</p>
            <p>Congratulations, you lucky ducky!</p>
            <button type="reset" onClick={newGame}>
              Play Again?
            </button>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>You Win!</h1>
          <p className="solution">{solution}</p>
          <p>You found the solution in {turn} guesses :)</p>
          <button type="reset" onClick={newGame}>
            Play Again?
          </button>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>You Lose!</h1>
          <p>Answer:</p>
          <p className="solution">{solution}</p>
          <p>Better luck next time!</p>
          <button type="reset" onClick={newGame}>
            Play Again?
          </button>
        </div>
      )}
    </div>
  );
}

const newGame = () => {
  window.location.reload();
};
