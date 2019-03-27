import { CONSTANTS } from "../actions";


let listID = 1;
let cardID = 0;

const initialState = {};

let listID = 2;
let cardID = 6;

const initialState = [
  {
    title: "Last Episode",
    id: `list-${0}`,
    cards: [
      {
        id: `card-${0}`,
        text: "we created a static list and a static card"
      },
      {
        id: `card-${1}`,
        text: "we used a mix between material UI React and styled components"
      }
    ]
  },
  {
    title: "This Episode",
    id: `list-${1}`,
    cards: [
      {
        id: `card-${2}`,
        text: "we will create our first reducer"
      },
      {
        id: `card-${3}`,
        text: "and render many cards on our list with static data"
      },
      {
        id: `card-${4}`,
        text:
          "we will also make some little changes I forgot in the last episode (link tags for roboto font and icons,..)"
      },
      {
        id: `card-${5}`,
        text:
          "we will also make some little changes I forgot in the last episode (link tags for roboto font and icons,..)"
      }
    ]
  }
];


const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST: {
      const newList = {
        title: action.payload,

        id: `list-${listID}`,
        cards: []

        cards: [],
        id: `list-${listID}`

      };

      const newState = { ...state, [`list-${listID}`]: newList };
      listID += 1;


      return newState;
    }

    case CONSTANTS.ADD_CARD: {

    case CONSTANTS.ADD_CARD: {
      const newCard = {
        text: action.payload.text,
        id: `card-${cardID}`
      };

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

    case CONSTANTS.DELETE_CARD: {
      const { listID, id } = action.payload;

      const list = state[listID];
      const newCards = list.cards.filter(cardID => cardID !== id);

      return { ...state, [listID]: { ...list, cards: newCards } };
    }

    case CONSTANTS.EDIT_LIST_TITLE: {
      const { listID, newTitle } = action.payload;

      const list = state[listID];
      list.title = newTitle;
      return { ...state, [listID]: list };
    }

    case CONSTANTS.DELETE_LIST: {
      const { listID } = action.payload;
      const newState = state;
      delete newState[listID];
      return newState;
    }



    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        draggableId,
        type
      } = action.payload;
      const newState = [...state];
      console.log(type);
      // dragging lists around
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
        // find the list where drag happened
        const listStart = state.find(list => droppableIdStart === list.id);

        // pull out the card from this list
        const card = listStart.cards.splice(droppableIndexStart, 1);

        // find the list where drag ended
        const listEnd = state.find(list => droppableIdEnd === list.id);

        // put the card in the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }

      return newState;


    default:
      return state;
  }
};

export default listsReducer;
