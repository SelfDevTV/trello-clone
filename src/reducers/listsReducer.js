import { CONSTANTS } from "../actions";

let listID = 1;
let cardID = 0;

const initialState = {
  "list-0": {
    title: "Last Episode",
    id: `list-0`,
    cards: ["card-0"]
  }
};

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST: {
      const newList = {
        title: action.payload,
        id: `list-${listID}`,
        cards: []
      };

      const newState = { ...state, [`list-${listID}`]: newList };
      listID += 1;

      return newState;
    }

    case CONSTANTS.ADD_CARD: {
      cardID += 1;
      const { listID } = action.payload;
      const list = state[listID];
      list.cards.push(`card-${cardID}`);
      return { ...state, [listID]: list };
    }

    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,

        type
      } = action.payload;

      // draggin lists around - the listOrderReducer should handle this
      if (type === "list") {
        return state;
      }

      // in the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state[droppableIdStart];
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
        return { ...state, [droppableIdStart]: list };
      }

      // other list
      if (droppableIdStart !== droppableIdEnd) {
        // find the list where the drag happened
        const listStart = state[droppableIdStart];
        // pull out the card from this list
        const card = listStart.cards.splice(droppableIndexStart, 1);
        // find the list where the drag ended
        const listEnd = state[droppableIdEnd];

        // put the card in the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
        return {
          ...state,
          [droppableIdStart]: listStart,
          [droppableIdEnd]: listEnd
        };
      }
      return state;

    case CONSTANTS.EDIT_CARD: {
      const { id, listID, newText } = action.payload;
      return state.map(list => {
        if (list.id === listID) {
          const newCards = list.cards.map(card => {
            if (card.id === id) {
              card.text = newText;
              return card;
            }
            return card;
          });
          return { ...list, cards: newCards };
        }
        return list;
      });
    }

    case CONSTANTS.DELETE_CARD: {
      const { id, listID } = action.payload;
      return state.map(list => {
        if (list.id === listID) {
          const newCards = list.cards.filter(card => card.id !== id);
          return { ...list, cards: newCards };
        } else {
          return list;
        }
      });
    }

    case CONSTANTS.EDIT_LIST_TITLE: {
      const { listID, newTitle } = action.payload;
      console.log(listID, newTitle);
      return state.map(list => {
        if (list.id === listID) {
          list.title = newTitle;
          return list;
        } else {
          return list;
        }
      });
    }

    case CONSTANTS.DELETE_LIST: {
      const { listID } = action.payload;
      return state.filter(list => list.id !== listID);
    }

    default:
      return state;
  }
};

export default listsReducer;
