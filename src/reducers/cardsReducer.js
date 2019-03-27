import { CONSTANTS } from "../actions";

let cardID = 0;

const initialState = {
  "card-0": {
    text: "Last Episode",
    id: `card-0`,
    list: "list-0"
  }
};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_CARD: {
      const { text, listID } = action.payload;

      cardID += 1;
      const newCard = {
        text,
        id: `card-${cardID}`,
        list: listID
      };

      return { ...state, [`card-${cardID}`]: newCard };
    }
    default:
      return state;
  }
};

export default cardsReducer;
