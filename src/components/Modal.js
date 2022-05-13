import React from "react";

export default function Modal({ isCorrect, turn, solution }) {
  if (turn === 1) {
    return (
      <div className="modal">
        {isCorrect && (
          <div>
            <h1>You Win!</h1>
            <p className="solution">{solution}</p>
            <p>You found the solution in {turn} guess :)</p>
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
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>You Lose!</h1>
          <p>Answer:</p>
          <p className="solution">{solution}</p>
          <p>Better luck next time!</p>
        </div>
      )}
    </div>
  );
}
