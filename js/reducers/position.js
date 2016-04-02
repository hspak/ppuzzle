import {KEY_LEFT, KEY_UP, KEY_RIGHT, KEY_DOWN, KEY_SWAP} from '../constants';
import {MATRIX_ROW_COUNT, MATRIX_COL_COUNT} from '../constants';
import {COLOR_EMPTY, COLOR_RED, COLOR_ORANGE, COLOR_BLUE} from '../constants';

// (x, y) keeps track of the left cursor
const initialState = {
  x: 1,
  y: 12,
  boundY: 3,
  matrix: initMatrix()
};

function moveCursor(state, oldX, oldY, newX, newY) {
  let newMatrix = state.matrix;

  newMatrix[oldY-1][oldX-1]   = { selected: false, color: COLOR_ORANGE };
  newMatrix[oldY-1][oldX-1+1] = { selected: false, color: COLOR_ORANGE};
  newMatrix[newY-1][newX-1]   = { selected: true, color: COLOR_RED };
  newMatrix[newY-1][newX-1+1] = { selected: true, color: COLOR_ORANGE };

  return Object.assign({}, state, { matrix: newMatrix, x: newX, y: newY });
}

function swapBlocks(state) {
  const x = state.y - 1;
  const y = state.x - 1;
  let newMatrix = state.matrix.slice(0);

  const saveBlock = newMatrix[x][y];
  newMatrix[x][y] = newMatrix[x][y+1];
  newMatrix[x][y+1] = saveBlock;

  return Object.assign({}, state, { matrix: newMatrix });
}

function initMatrix() {
  const initBox = {
    selected: false,
    color: COLOR_EMPTY
  }

  let row = [];
  for (let i=0; i < 6; i++) {
    row.push(initBox);
  }

  let matrix = [];
  for (let i=0; i < 12; i++) {
    matrix.push(row.slice(0));
  }

  matrix[11][0] = {selected: true, color: COLOR_RED};
  matrix[11][1] = {selected: true, color: COLOR_RED};

  return matrix;
}

export default function(state = initialState, action) {
  if ((state.x === 1 && action.key === KEY_LEFT) ||
      (state.x === 5 && action.key === KEY_RIGHT) ||
      (state.y === state.boundY && action.key === KEY_UP) ||
      (state.y === 12 && action.key === KEY_DOWN)) {
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
      return swapBlocks(state)
    default:
      return state;
  }
}
