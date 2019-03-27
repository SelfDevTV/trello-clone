import { CONSTANTS } from "../actions";

let listID = 1;
let cardID = 6;

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
      const newCard = {
        text: action.payload.text,
        id: `card-${cardID}`
      };
      cardID += 1;

      console.log("action received", action);

      const newState = state.map(list => {
        if (list.id === action.payload.listID) {
          return {
            ...list,
            cards: [...list.cards, newCard]
          };
        } else {
          return list;
        }
      });

      return newState;
    }

    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,

        type
      } = action.payload;
      const newState = [...state];

      // draggin lists around
      if (type === "list") {
        const list = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...list);
        return newState;
      }

      // in the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find(list => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      // other list
      if (droppableIdStart !== droppableIdEnd) {
        // find the list where the drag happened
        const listStart = state.find(list => droppableIdStart === list.id);
        // pull out the card from this list
        const card = listStart.cards.splice(droppableIndexStart, 1);
        // find the list where the drag ended
        const listEnd = state.find(list => droppableIdEnd === list.id);

        // put the card in the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }

      return newState;

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
