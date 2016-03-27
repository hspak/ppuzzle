import {KEY_LEFT, KEY_UP, KEY_RIGHT, KEY_DOWN} from '../constants'
import {MATRIX_ROW_COUNT, MATRIX_COL_COUNT} from '../constants'

const initialState = { x: 1, y: 12,
  matrix: [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [1,1,0,0,0,0]
  ]
};

function updateMatrix(state, oldX, oldY, newX, newY) {
  let newMatrix = state.matrix;

  newMatrix[oldY-1][oldX-1] = 0;
  newMatrix[oldY-1][oldX-1+1] = 0;
  newMatrix[newY-1][newX-1] = 1;
  newMatrix[newY-1][newX-1+1] = 1;

  return Object.assign({}, state, { matrix: newMatrix, x: newX, y: newY });
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
