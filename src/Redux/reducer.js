import {ADD_TO_CART, REMOVE_FROM_CART, SET_API_DATA} from './actions';

const initialState = {
  apiData: [],
  cart: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_API_DATA:
      return {...state, apiData: action.payload};

    case ADD_TO_CART:
      return { 
        ...state,
        cart: [...state.cart, action.payload]
    }

    case REMOVE_FROM_CART:
      let i = state.cart.findIndex(v => v.id == action.payload.id);
      let updatedCart = [...state.cart];
      updatedCart.splice(i, 1);
      return { 
        ...state,
        cart: updatedCart
    }

      default:
        return state
  }
}

export default reducer
