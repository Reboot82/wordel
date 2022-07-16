import React, { useEffect, useState } from "react";

export default function Keypad({ usedKeys }) {
  var [letters, setLetters] = useState(null);

  // useEffect(() => {
  //   fetch("http://localhost:3001/letters")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setLetters(json)
  //     })
  // }, [])

  useEffect(() => {
    const url =
      "https://api.jsonbin.io/v3/b/62d3278bb34ef41b73c3c6b7";
    fetch(url, {
      method: "GET",
      withCredentials: true,
      headers: {
        "X-Master-Key":
          "$2b$10$EeeXZRIaCulbm1svTUCAv.s/jD95poKdvMc63Wwsp4IGJ3NirKwI.",
        "X-BIN-META": false,
      },
    })
      .then((res) => res.json())
      .then(function (data){
        setLetters(data.letters);
      })
  }, []);

  // async function getLetters() {
  //   const response = await fetch('https://api.jsonbin.io/v3/b/62d3278bb34ef41b73c3c6b7/letters');
  //   letters = await response.json();
  //   setLetters(letters);
  // }

  return (
    <div className="keypad">
      {letters &&
        letters.map((l) => {
          const color = usedKeys[l.key];
          return (
            <div key={l.key} className={color}>
              {l.key}
            </div>
          );
        })}
    </div>
  );
}
