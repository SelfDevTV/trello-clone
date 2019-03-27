import { CONSTANTS } from "../actions";

const initialState = {
  "card-0": {
    text: "Last Episode",
    id: `card-0`,
    list: "list-0"
  }
};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default cardsReducer;
