import React, { useEffect, useRef, useState } from "react";
import cpuChoice from "./utils/CPUChoice";
import gameLogic from "./utils/gameLogic";

function App() {
  const defMatrix = Array.from({ length: 3 }, () =>
    Array(3).fill({ ref: null, value: null })
  );

  const [playerStart, setPlayerStart] = useState("x");
  const [winner, setWinner] = useState(null);
  const [matrix, setMatrix] = useState(defMatrix);
  const [isMyTurn, setIsMyTurn] = useState(playerStart === "x" ? true : false);
  const [isGameOver, setIsGameOver] = useState(false);
  // const refArr = useRef(Arr.map((row) => row.map(() => React.createRef())));

  function clickHandler(i, j, player) {
    if (!matrix[i][j].value) {
      const newMatrix = matrix.map((rows, rIdx) => {
        return rows.map((cell, cIdx) => {
          return rIdx === i && cIdx === j ? { ...cell, value: player } : cell;
        });
      });
      setMatrix(newMatrix);
    } else console.warn("cell occupied");
  }
  useEffect(() => {
    if (!isGameOver) {
      const resultX = gameLogic(matrix, "x");
      const resultO = gameLogic(matrix, "o");
      if (resultX || resultO) {
        setIsGameOver(true);
        console.warn("The Game is Over");
        if (resultX) {
          if (resultO) setWinner("DRAW");
          else setWinner("X");
        } else setWinner("O");
      }
      setIsMyTurn(prev=>!prev);
    }
  }, [matrix]);

  //GAME LOOP
  useEffect(() => {
    if (!isMyTurn && !isGameOver) {
      const cpuChoiceCords = cpuChoice(matrix, 3);
      if (cpuChoiceCords) {
        if (!isGameOver) {
          clickHandler(cpuChoiceCords[0], cpuChoiceCords[1], "o");
        }
      } else {
        setIsGameOver(true);
        console.warn("The Game is Over");
      }
    }
  }, [isMyTurn]);

  return (
    <>
      <h1>Tic-Tac-Toe</h1>
      <div
        className={"grid grid-cols-3 grid-rows-3 w-[20rem] h-[20rem] gap-2 "}
      >
        {matrix.map((row, i) =>
          row.map((item, j) => (
            <div
              key={`${i}${j}`}
              // ref={refArr.current[i][j]}
              className={`row-span-1 col-span-1 row-start-${i + 1} row-end-${
                i + 1
              } col-start-${j + 1} col-end-${
                j + 1
              } border-r text-3xl flex justify-center items-center`}
              onClick={() => {
                if (!isGameOver) {
                  clickHandler(i, j, "x");
                } else console.warn("Game is Over");
              }}
            >
              {item.value}
            </div>
          ))
        )}
      </div>
      <h1 className="text-3xl m-3">
        {winner ? (winner === "DRAW" ? "DRAW" : `Winner: ${winner}`) : " "}
      </h1>
      <button
        onClick={() => {
          setMatrix(defMatrix);
          setIsGameOver(false);
          setIsMyTurn(true);
          setWinner(null);
        }}
        className="p-2 bg-gray-700 text-white m-3"
      >
        {" "}
        Clear Board{" "}
      </button>
    </>
  );
}

export default App;
