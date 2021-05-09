import { ADD_TO_CART, REMOVE_FROM_CART } from "./action";

const initialState = { id: 10000, sessionTokent: "NaN", itemsNumber: 0 };

const cartItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      state = action.payload;
      return state;
    case REMOVE_FROM_CART:
      //console.log(action.payload);
      state = action.payload;
      return state;
  }
  return state;
};
export default cartItemsReducer;
