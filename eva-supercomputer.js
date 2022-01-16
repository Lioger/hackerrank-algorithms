const basicCheck = (grid) => grid.filter((row) => row.includes('G')).length

const getPlusSquare = (rowIndex, colIndex, grid) => {
  const getNewEdgesSquare = (i, rowIndex, colIndex) => {
    if (
      grid[rowIndex - i] &&
      grid[rowIndex - i][colIndex] === 'G' &&
      grid[rowIndex][colIndex + i] === 'G' &&
      grid[rowIndex + i] &&
      grid[rowIndex + i][colIndex] === 'G' &&
      grid[rowIndex][colIndex - i] === 'G'
    ) {
      return 4;
    } else {
      return 0;
    }
  }

  let square = 1;
  for (let i = 1; true; i++) {
    const newEdgesSquare = getNewEdgesSquare(i, rowIndex, colIndex)
    if (!newEdgesSquare) {
      break;
    } else {
      square += newEdgesSquare
    }
  }
  return square;
}

const getAllPossiblePluses = (grid, m) => {
  let pluses = [];
  grid.forEach((row, rowIndex) => {
    for (let col = 0; col < m; col++) {
      if (row[col] === 'G') {
        const square = getPlusSquare(rowIndex, col, grid);
        if (square === 5) {
          pluses.push({ row: rowIndex, col, square,  edgeSquare: 1 });
        } else if (square > 5 && !((square - 5) % 4)) {
          const edgeSquare = (square - 1) / 4;
          for (let i = 0; i < edgeSquare; i++) {
            pluses.push({ row: rowIndex, col, square: square - i * 4, edgeSquare: edgeSquare - i });
          } 
        }
      }
    };
  });
  return pluses;
}

const drawPlus = (plus, grid) => {
  if (grid[plus.row][plus.col] === 'P') {
    return { success: false, grid };
  }
  let success = true;
  for (let i = plus.edgeSquare; i > 0; i--) {
    if (grid[plus.row - i][plus.col] === 'P' || 
    grid[plus.row + i][plus.col] === 'P' || 
    grid[plus.row][plus.col - i]  === 'P' || 
    grid[plus.row][plus.col + i] === 'P') {
      success = false;
    } else {
      const topRow = grid[plus.row - i].substring(0, plus.col) + 'P' + grid[plus.row - i].substring(plus.col + 1);
      const bottomRow = grid[plus.row + i].substring(0, plus.col) + 'P' + grid[plus.row + i].substring(plus.col + 1);
      grid[plus.row - i] = topRow;
      grid[plus.row + i] = bottomRow;
    }
  }
  if (success) {
    const horizontalLine = grid[plus.row].substring(0, plus.col - plus.edgeSquare) + 
                          ('P'.repeat(plus.edgeSquare * 2 + 1)) + 
                          grid[plus.row].substring(plus.col + plus.edgeSquare + 1);
    grid[plus.row] = horizontalLine;
  }

  return { success, grid };
}

const getResult = (pluses, grid) => {
  let maxResult = 0;
  pluses.forEach((firstPlus) => {
    const gridCopy = [...grid];
    let results = [firstPlus.square];
    const singlePlusGrid = drawPlus(firstPlus, gridCopy); // { success, grid }
    if (singlePlusGrid.success) {
      for (let i = 0; i < pluses.length; i++) {
        const singleGridCopy = [...singlePlusGrid.grid];
        const secondPlus = pluses[i];
        if (firstPlus.col === secondPlus.col && firstPlus.row === secondPlus.row && firstPlus.square === secondPlus.square) {
          continue;
        }
        const doublePlusGrid = drawPlus(secondPlus, singleGridCopy);
        if (doublePlusGrid.success) {
          results.push(firstPlus.square * secondPlus.square);
          break;
        }
      }
    }
    const maxResultForPlus = Math.max(...results);
    if (maxResultForPlus > maxResult) maxResult = maxResultForPlus;
  });
  return maxResult;
}

const getGoodCount = (grid, m) => {
  let count = 0;
  grid.forEach((row) => {
    for (let col = 0; col < m; col++) {
      if (row[col] === 'G') {
        count++;
      }
    }
  });
  return count;
}

const twoPluses = (grid) => {
    if (!basicCheck) {
        return 0;
    }
    const n = grid.length; // rows count
    const m = grid[0].length; // cols count
    const sortPluses = (a, b) => {
        if (a.square > b.square) {
            return -1;
        } else if (a.square < b.square) {
            return 1;
        } else return 0;
    }
    
    const pluses = getAllPossiblePluses(grid, m).sort(sortPluses); // Array of pluses { row, col, square, edgeSquare }
    const result = !pluses.length ? getGoodCount(grid, m) > 1 ? 1 : 0 : getResult(pluses, grid);
    return result;
}

const matrixExample = [
    'BBBGBGBBB',
    'BBBGBGBBB',
    'BBBGBGBBB',
    'GGGGGGGGG',
    'BBBGBGBBB',
    'BBBGBGBBB',
    'GGGGGGGGG',
    'BBBGBGBBB',
    'BBBGBGBBB',
    'BBBGBGBBB'
];

const product = twoPluses(matrixExample);
console.log(product);
