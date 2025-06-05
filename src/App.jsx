import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  let [arr, setArr] = useState([]);
  let Arr = Array.from({ length: 3 }, () =>
    Array(3).fill({ ref: null, value: "*" })
  );
  const refArr = useRef(Arr.map((row) => row.map(() => React.createRef())));
  
  // console.log(Arr)
  
  const choice = "x";
  
  useEffect(() => {
    Arr.map((row, i) =>
      row.map((item, j) => {
        item.ref = refArr.current[i][j];
      })
    );
    setArr(Arr)

  }, []);

  function clickHandler(i, j) {
    const newArr = arr.map((rows, rIdx) => {
      return rows.map((cell, cIdx) => {
        return rIdx === i && cIdx === j ? { ...cell, value: 1 } : cell;
      });
    });
    setArr(newArr);
    console.log(newArr);
  }

  return (
    <>
      <h1>Tic-Tac-Toe</h1>
      <div className="grid grid-cols-3 grid-rows-3 w-[20rem] h-[20rem] gap-2">
        {arr.map((row, i) =>
          row.map((item, j) => (
            <div
              key={`${i}${j}`}
              ref={refArr.current[i][j]}
              className={`row-span-1 col-span-1 row-start-${i + 1} row-end-${
                i + 1
              } col-start-${j + 1} col-end-${j + 1} border-r`}
              onClick={()=>clickHandler(i, j)}
            >
              {item.value}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
