import { createStore } from "redux";
import cartItemsReducer from "./reducer";

const store = createStore(cartItemsReducer);

export default store;
