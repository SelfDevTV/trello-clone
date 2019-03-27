import { combineReducers } from "redux";
import listsReducer from "./listsReducer";
import listOrderReducer from "./listOrderReducer";
import cardsReducer from "./cardsReducer";

export default combineReducers({
  lists: listsReducer,
  listOrder: listOrderReducer,
  cards: cardsReducer
});
