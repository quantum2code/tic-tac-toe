function cpuChoice(matrix, gridSize) {
  let allCords = [];
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      allCords.push([i, j]);
    }
  }
  const emptyCords = allCords.filter(([i, j]) => !matrix[i][j].value);
  //   console.log("Empty Cordinates: ", emptyCords);
  if (emptyCords === 0) return null;
  const randIdx = Math.floor(Math.random() * emptyCords.length);
  return emptyCords[randIdx];
}

export default cpuChoice;
