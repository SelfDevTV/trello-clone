import { CONSTANTS } from "../actions";
let listID = 0;
const initialState = ["list-0"];

const listOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.DELETE_LIST: {
      const { listID } = action.payload;
      return state.filter(id => id !== listID);
    }
    default:
      return state;
  }
};

export default listOrderReducer;
