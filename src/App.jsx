import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  let [arr, setArr] = useState([]);
  let Arr = Array.from({ length: 3 }, () =>
    Array(3).fill({ ref: null, value: "*" })
  );
  const refArr = useRef(Arr.map((row) => row.map(() => React.createRef())));

  const choice = "x";

  useEffect(() => {
    Arr.map((row, i) =>
      row.map((item, j) => {
        item.ref = refArr.current[i][j];
      })
    );
    setArr(Arr);
    // console.log("They shootin");
  }, []);

  let destructArr = [];
  function pustToArr() {
    arr.map((rows, rIdx) => {
      rows.map((item, cIdx) => {
        if (item.value === "x") {
          destructArr.push({ value: item.value, x: rIdx, y: cIdx });
        }
      });
    });
  }

  useEffect(() => {
    pustToArr();
    const winArr = [
      [[], [], []],
      [[], [], []],
      [[], [], []],
    ];
    destructArr.forEach((item) => {

      //CLASSIFYING IN ROW, COLUMN, DIAGONAL SECTIONS
      if (item.x + item.y == 2) {
        winArr[2][0].push(item);
      }
      if (item.x - item.y == 0) {
        winArr[2][1].push(item);
      }
      for (let i = 0; i < 3; i++) {
        if (item.x == i) {
          winArr[0][i].push(item);
        }
        if (item.y == i) {
          winArr[1][i].push(item);
        }
      }

      //RESULT LOGIC

      if(winArr[2][0].length===3) console.log({status: "Win",type:"MAIN_DIAGONAL"})
      if(winArr[2][1].length===3) console.log({status: "Win",type:"CROSS_DIAGONAL"})
      for (let i = 0; i < 3; i++) {
        if(winArr[0][i].length===3) console.log({status: "Win",type:"ROW"})
        if(winArr[1][i].length===3) console.log({status: "Win",type:"COLUMN"})
      }
    });

    // console.log(`Desturctured Array: `,destructArr);
    console.log(`Win Array: `, winArr);
  }, [arr]);

  function clickHandler(i, j) {
    const newArr = arr.map((rows, rIdx) => {
      return rows.map((cell, cIdx) => {
        return rIdx === i && cIdx === j ? { ...cell, value: "x" } : cell;
      });
    });
    setArr(newArr);
    // console.log(`Updated Matrix: `,newArr);
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
              onClick={() => clickHandler(i, j)}
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
