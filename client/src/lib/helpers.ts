// Generic methods related to the game, matrices, etc.
// @todo split into related files / classes

import { IGameCell, DirectionType } from '@/interfaces';

export const randInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
export const shuffleArray = (value: [any]): [any] => {
  for (let i = value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = value[i];
    value[i] = value[j];
    value[j] = temp;
  }
  return value;
};

export const isWithinMatrix = (x: number, y: number, w: number, h?: number): boolean => {
  h = h || w;
  return x >= 0 && x < w && y >= 0 && y < h;
};

// Would change to type 'any' over 'IGameCell' for future use elsewhere
export const createMatrix = (size: number): [[IGameCell]] => {
  return Array(size).fill(null)
    .map((i, rowIdx) => [...Array(size)]
      .map((i, colIdx) => ({ row: rowIdx, col: colIdx, value: 0 })));
};

// Would change to type 'any' over 'IGameCell' for future use elsewhere
export const fillRandomEmptyCellInMatrix = (matrix: [[IGameCell]], value: number): [[IGameCell]] => {
  let randomCell: boolean|IGameCell = false;
  while (!randomCell || randomCell.value) {
    randomCell = matrix[randInt(0, matrix.length - 1)][randInt(0, matrix.length - 1)];
  }
  randomCell.value = value;
  return matrix;
};

// Would change to type 'any' over 'IGameCell' for future use elsewhere
export const rotateMatrixLeft = (matrix: [[IGameCell]]): [[IGameCell]] => {
  const rows = matrix.length;
  const columns = matrix[0].length;
  const matrixRotated = [];
  for (let row = 0; row < rows; row++) {
    matrixRotated.push([]);
    for (let column = 0; column < columns; column++) {
      matrixRotated[row][column] = matrix[column][columns - row - 1];
    }
  }
  return matrixRotated;
};

export const rotateMatrixWithRegardToVector = (
  matrix: [[IGameCell]],
  dir: DirectionType,
  shouldReverse: boolean = false,
): [[IGameCell]] => {
  if (shouldReverse) {
    if (dir === 'u') {
      matrix = rotateMatrixLeft(matrix);
    } else if (dir === 'l') {
      matrix = rotateMatrixLeft(matrix);
      matrix = rotateMatrixLeft(matrix);
    } else if (dir === 'd') {
      matrix = rotateMatrixLeft(matrix);
      matrix = rotateMatrixLeft(matrix);
      matrix = rotateMatrixLeft(matrix);
    }
  } else {
      if (dir === 'u') {
      matrix = rotateMatrixLeft(matrix);
      matrix = rotateMatrixLeft(matrix);
      matrix = rotateMatrixLeft(matrix);
    } else if (dir === 'l') {
      matrix = rotateMatrixLeft(matrix);
      matrix = rotateMatrixLeft(matrix);
    } else if (dir === 'd') {
      matrix = rotateMatrixLeft(matrix);
    }
  }

  return matrix;
};

export const shiftColumnsInRow = (row: [IGameCell]): [IGameCell] => {
  let newFilledCells = row.filter(({ value }) => value !== 0);
  const newEmptyCells = Array(row.length - newFilledCells.length).fill(null)
    .map((cell, colIdx): IGameCell => ({ row: row[0].row, col: colIdx, value: 0 }));
  newFilledCells = newEmptyCells.concat(newFilledCells);
  return newFilledCells;
};
