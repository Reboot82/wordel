import { useState, useEffect } from "react";

const useWordel = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});

  // const [allSolutions, setAllSolutions] = useState([]);

  // var possibleAnswers = [];

  // useEffect(() => {
  //   fetch("http://localhost:3001/solutions")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       var solutionsArray = [];
  //       for (let i = 0; i < json.length; i++) {
  //         let singleSolution = json[i].word;
  //         solutionsArray.push(singleSolution);
  //       }
  //       // eslint-disable-next-line react-hooks/exhaustive-deps
  //       possibleAnswers = solutionsArray;
  //     });
  // });


  //   YOU NEED TO FIGURE OUT HOW TO MAKE THIS WORK. OR MAYBE JUST FETCH THE SOLUTIONS 
      //       ONCE UPON OPENING THE PAGE, THEN PASS IT THROUGH AS NECESSARY?
  // useEffect(() => {
  //   const url =
  //     "https://api.jsonbin.io/v3/b/62d3278bb34ef41b73c3c6b7";
  //   fetch(url, {
  //     method: "GET",
  //     withCredentials: true,
  //     headers: {
  //       "X-Master-Key":
  //         "$2b$10$EeeXZRIaCulbm1svTUCAv.s/jD95poKdvMc63Wwsp4IGJ3NirKwI.",
  //       "X-BIN-META": false,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then(function (data){
  //       var solutionsArray = [];
  //       for (let i = 0; i < data.solutions.length; i++) {
  //         let singleSolution = data.solutions[i].word;
  //         solutionsArray.push(singleSolution);
  //       }
  //       // eslint-disable-next-line react-hooks/exhaustive-deps
  //       possibleAnswers = solutionsArray;
  //     })
  // });

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: "grey" };
    });

    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setUsedKeys((prevUsedKeys) => {
      let newKeys = { ...prevUsedKeys };

      formattedGuess.forEach((l) => {
        const currentColor = newKeys[l.key];

        if (l.color === "green") {
          newKeys[l.key] = "green";
          return;
        }
        if (l.color === "yellow" && currentColor !== "green") {
          newKeys[l.key] = "yellow";
          return;
        }
        if (
          l.color === "grey" &&
          currentColor !== "green" &&
          currentColor !== "yellow"
        ) {
          newKeys[l.key] = "grey";
          return;
        }
      });

      return newKeys;
    });
    setCurrentGuess("");
  };

  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      if (turn > 5) {
        alert("You used all your guesses");
        return;
      }
      if (history.includes(currentGuess)) {
        alert("You already tried this word");
        setCurrentGuess("");
        return;
      }
      if (currentGuess.length !== 5) {
        alert("Word must be 5 letters long");
        return;
      }

      //   YOU NEED TO FIGURE OUT HOW TO MAKE THIS WAIT. OR MAYBE JUST FETCH THE SOLUTIONS 
      //       ONCE UPON OPENING THE PAGE, THEN PASS IT THROUGH AS NECESSARY?
      // if (!possibleAnswers.includes(currentGuess)) {
      //   console.log(possibleAnswers);
      //   console.log(currentGuess);
      //   alert("Word not found in database");
      //   setCurrentGuess("");
      //   return;
      // }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
};

export default useWordel;
