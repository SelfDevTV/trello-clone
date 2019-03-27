import { CONSTANTS } from "../actions";
let listID = 0;
const initialState = ["list-0"];

const listOrderReducer = (state = initialState, action) => {
  console.log("listorder", state);
  switch (action.type) {
    case CONSTANTS.ADD_LIST: {
      listID += 1;
      const newID = `list-${listID}`;
      return [...state, newID];
    }
    default:
      return state;
  }
};

export default listOrderReducer;
