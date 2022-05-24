import React, { useEffect, useState } from "react";
import useWordel from "../hooks/useWordel";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

export default function Wordel({ solution }) {
  const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } = useWordel(solution)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener('keyup', handleKeyup)
    }

    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener('keyup', handleKeyup)
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  return (
    <div>
      {/* <div>solution - {solution}</div> */}
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
    </div>
  );
}
