import { CONSTANTS } from "../actions";

let boardID = 0;

const initialState = ["board-0"];

const boardOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_BOARD: {
      boardID += 1;

      return [...state, `board-${boardID}`];
    }
    default:
      return state;
  }
};

export default boardOrderReducer;
