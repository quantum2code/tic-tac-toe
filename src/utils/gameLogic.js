function gameLogic(matrix, player) {
  let destructArr = [];
  function pustToArr() {
    matrix.map((rows, rIdx) => {
      rows.map((item, cIdx) => {
        if (item.value === player) {
          destructArr.push({ value: item.value, x: rIdx, y: cIdx });
        }
      });
    });
  }

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
  });

  //   console.log(`Win Array: `, winArr);
  //RESULT LOGIC
  if (winArr[2][0].length === 3) {
    console.log({ player: player, status: "Win", type: "MAIN_DIAGONAL" });
    return { player: player, status: "Win", type: "MAIN_DIAGONAL" };
  }
  if (winArr[2][1].length === 3) {
    console.log({ player: player, status: "Win", type: "CROSS_DIAGONAL" });
    return { player: player, status: "Win", type: "CROSS_DIAGONAL" };
  }
  for (let i = 0; i < 3; i++) {
    if (winArr[0][i].length === 3) {
      console.log({ player: player, status: "Win", type: "ROW" });
      return { player: player, status: "Win", type: "ROW" };
    }
    if (winArr[1][i].length === 3) {
      console.log({ player: player, status: "Win", type: "COLUMN" });
      return { player: player, status: "Win", type: "COLUMN" };
    }
  }
  return null;

  // console.log(`Desturctured Array: `,destructArr);
}

export default gameLogic;
