import { useEffect, useState } from "react";
import Wordel from "./components/Wordel";

function App() {
  const [solution, setSolution] = useState(null);

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
      .then(function(data) {
        const randomSolution = data.solutions[Math.floor(Math.random() * data.solutions.length)];
        setSolution(randomSolution.word);
      });
  }, [setSolution]);

  return (
    <div className="App">
      <h1>Dirty Wordels</h1>
      {solution && <Wordel solution={solution} />}
    </div>
  );
}

export default App;
