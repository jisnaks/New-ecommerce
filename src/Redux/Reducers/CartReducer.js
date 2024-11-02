import { ADD_TO_CART, DECREMENT_QTY, INCREMENT_QTY, REMOVE_FROM_CART,SET_CART,CLEAR_CART } from "../Actions/CartActions";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const calculateTotalAmount = (cartItems) =>
  cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingProduct = state.cartItems.find((item) => item._id === action.payload._id);
      let updatedCartItems;
      if (existingProduct) {
        updatedCartItems = state.cartItems.map((item) =>
          item._id === action.payload._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCartItems = [...state.cartItems, { ...action.payload, quantity: 1 }];
      }
      return {
        ...state,
        cartItems: updatedCartItems,
        totalQuantity: state.totalQuantity + 1,
        totalAmount: calculateTotalAmount(updatedCartItems),
      };

      case SET_CART:
      return {
        ...state,
        cartItems: action.payload,
        totalQuantity: action.payload.reduce((acc, item) => acc + item.quantity, 0),
        totalAmount: calculateTotalAmount(action.payload),
      };

    case CLEAR_CART:
      return initialState;

    case REMOVE_FROM_CART:
      const filteredCart = state.cartItems.filter((item) => item._id !== action.payload);
      const productToRemove = state.cartItems.find((item) => item._id === action.payload);
      return {
        ...state,
        cartItems: filteredCart,
        totalQuantity: state.totalQuantity - (productToRemove ? productToRemove.quantity : 0),
        totalAmount: calculateTotalAmount(filteredCart),
      };

    case INCREMENT_QTY:
      const incrementedCart = state.cartItems.map((item) =>
        item._id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );
      return {
        ...state,
        cartItems: incrementedCart,
        totalQuantity: state.totalQuantity + 1,
        totalAmount: calculateTotalAmount(incrementedCart),
      };

    case DECREMENT_QTY:
      const decrementedCart = state.cartItems.map((item) =>
        item._id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      return {
        ...state,
        cartItems: decrementedCart,
        totalQuantity: state.totalQuantity - 1,
        totalAmount: calculateTotalAmount(decrementedCart),
      };

    default:
      return state;
  }
};
