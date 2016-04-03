import {KEY_LEFT, KEY_UP, KEY_RIGHT, KEY_DOWN, KEY_SWAP} from '../constants';
import {MATRIX_ROW_COUNT, MATRIX_COL_COUNT} from '../constants';
import {COLOR_EMPTY, COLOR_RED, COLOR_ORANGE, COLOR_BLUE} from '../constants';
import {GLOBAL_KEY_PRESS} from '../constants';
import {TIMER_TICK} from '../constants';

// (x, y) keeps track of the left cursor
const initialState = {
  x: 0,
  y: 11,
  boundY: 0,
  matrix: initMatrix(0, 11)
};

function moveCursor(state, oldX, oldY, newX, newY) {
  let newMatrix = state.matrix;

  const a1 = newMatrix[oldY][oldX];
  const a2 = newMatrix[oldY][oldX+1];
  const b1 = newMatrix[newY][newX];
  const b2 = newMatrix[newY][newX+1];

  newMatrix[oldY][oldX]   = { color: a1.color, selected: false };
  newMatrix[oldY][oldX+1] = { color: a2.color, selected: false };
  newMatrix[newY][newX]   = { color: b1.color, selected: true };
  newMatrix[newY][newX+1] = { color: b2.color, selected: true };

  return Object.assign({}, state, { matrix: newMatrix, x: newX, y: newY });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function swapBlocks(state) {
  const x = state.y;
  const y = state.x;
  let newMatrix = state.matrix.slice(0);

  const saveBlock = newMatrix[x][y];
  newMatrix[x][y] = newMatrix[x][y+1];
  newMatrix[x][y+1] = saveBlock;

  return Object.assign({}, state, { matrix: newMatrix });
}

function initMatrix(x, y) {
  const initBox = {
    selected: false,
    color: COLOR_EMPTY
  }

  let row = [];
  for (let i=0; i < MATRIX_COL_COUNT; i++) {
    row.push(initBox);
  }

  let matrix = [];
  for (let i=0; i < MATRIX_ROW_COUNT; i++) {
    matrix.push(row.slice(0));
  }

  console.log(matrix, x, y);
  matrix[y][x] = {selected: true};
  matrix[y][x+1] = {selected: true};

  return populateMatrix(matrix);
}

function populateMatrix(matrix) {
  let newMatrix = matrix.slice(0);

  for (let y = 0; y < MATRIX_ROW_COUNT; y++) {
    for (let x = 0; x < MATRIX_COL_COUNT; x++) {
      let color = 0;
      if (x !== 3) {
        color = getRandomInt(1, 5);
      }

      const block = newMatrix[y][x];
      newMatrix[y][x] = {
        selected: block.selected,
        color: color
      }
    }
  }
  return newMatrix;
}

function resetBoard(state) {
  return Object.assign({}, state, { matrix: populateMatrix(state.matrix) });
}

function dropBlocks(state) {
  let newMatrix = state.matrix.slice(0);

  for (let y = MATRIX_ROW_COUNT-1; y > 0; y--) {
    for (let x = 0; x < MATRIX_COL_COUNT; x++) {
      if (state.matrix[y][x].color === COLOR_EMPTY) {
        for (let z = y; z > 0; z--) {
          newMatrix[z][x].color = state.matrix[z-1][x].color;
        }
        newMatrix[0][x].color = COLOR_EMPTY;
      }
    }
  }
  return Object.assign({}, state, { matrix: newMatrix });
}

export default function(state = initialState, action) {
  if (action.type === GLOBAL_KEY_PRESS) {
    if ((state.x === 0 && action.key === KEY_LEFT) ||
        (state.x === 4 && action.key === KEY_RIGHT) ||
        (state.y === state.boundY && action.key === KEY_UP) ||
        (state.y === 11 && action.key === KEY_DOWN)) {
      return state;
    }

    switch (action.key) {
      case KEY_UP:
        return moveCursor(state, state.x, state.y, state.x, state.y - 1);
      case KEY_DOWN:
        return moveCursor(state, state.x, state.y, state.x, state.y + 1);
      case KEY_LEFT:
        return moveCursor(state, state.x, state.y, state.x - 1, state.y);
      case KEY_RIGHT:
        return moveCursor(state, state.x, state.y, state.x + 1, state.y);
      case KEY_SWAP:
        return swapBlocks(state);
      default:
        return state;
    }
  } else if (action.type === "IDK") {
    return resetBoard(state);
  } else if (action.type === TIMER_TICK) {
    return dropBlocks(state);
  } else {
    return state;
  }
}
