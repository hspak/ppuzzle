import {KEY_LEFT, KEY_UP, KEY_RIGHT, KEY_DOWN} from '../constants';
import {MATRIX_ROW_COUNT, MATRIX_COL_COUNT} from '../constants';
import {COLOR_EMPTY, COLOR_RED, COLOR_ORANGE} from '../constants';

const initialState = {
  x: 1,
  y: 12,
  matrix: initMatrix()
};

function updateMatrix(state, oldX, oldY, newX, newY) {
  let newMatrix = state.matrix;

  initMatrix();

  newMatrix[oldY-1][oldX-1]   = { selected: false, color: COLOR_ORANGE };
  newMatrix[oldY-1][oldX-1+1] = { selected: false, color: COLOR_ORANGE};
  newMatrix[newY-1][newX-1]   = { selected: true, color: COLOR_RED };
  newMatrix[newY-1][newX-1+1] = { selected: true, color: COLOR_RED };

  return Object.assign({}, state, { matrix: newMatrix, x: newX, y: newY });
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
      (state.y === 1 && action.key === KEY_UP) ||
      (state.y === 12 && action.key === KEY_DOWN)) {
    return state;
  }

  switch (action.key) {
    case KEY_UP:
      return updateMatrix(state, state.x, state.y, state.x, state.y - 1);
    case KEY_DOWN:
      return updateMatrix(state, state.x, state.y, state.x, state.y + 1);
    case KEY_LEFT:
      return updateMatrix(state, state.x, state.y, state.x - 1, state.y);
    case KEY_RIGHT:
      return updateMatrix(state, state.x, state.y, state.x + 1, state.y);
    default:
      return state;
  }
}
