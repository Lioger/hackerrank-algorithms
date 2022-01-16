/* We already know, that for 3*3 matrix and [1, 9] values magicConstant === 15 and there
  are only 8 combinations of magic squares with such condition. If you want to get
  more detailed explanation feel free to ask me any questions (Telegram: +79964165496) */ 

function getMinimalCost(matrix) {
    const receivedArr = matrix.reduce((prev, curr) => [...prev, ...curr]);
    const possibleMagicSquares = [
      [8, 1, 6, 3, 5, 7, 4, 9, 2],
      [6, 7, 2, 1, 5, 9, 8, 3, 4],
      [2, 9, 4, 7, 5, 3, 6, 1, 8],
      [4, 3, 8, 9, 5, 1, 2, 7, 6],
      [8, 3, 4, 1, 5, 9, 6, 7, 2],
      [4, 9, 2, 3, 5, 7, 8, 1, 6],
      [2, 7, 6, 9, 5, 1, 4, 3, 8],
      [6, 1, 8, 7, 5, 3, 2, 9, 4]
    ];
    let minCost = Math.min();
    possibleMagicSquares.every((magicSquare) => {
      let currCost = 0;
      magicSquare.forEach((value, index) => {
        currCost += Math.abs(value - receivedArr[index]);
      });
      if (currCost < minCost) {
        minCost = currCost;
      }
      return true
    })
    return minCost;
  } 
  
const matrixExample = [[4, 5, 2], [6, 5, 7], [8, 4, 5]]
const minimalCost = getMinimalCost(matrixExample)
console.log(`Minimal cost for matrix example: ${minimalCost}`)
  