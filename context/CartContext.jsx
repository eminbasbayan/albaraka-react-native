import { createContext, useEffect, useReducer, useState } from 'react';

export const CartContext = createContext();

const initialState = {
  cartItems: [],
  total: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: [{ ...action.product, quantity: 1 }, ...state.cartItems],
      };

    case 'DELETE_FROM_CART':
      const filteredCartItems = state.cartItems.filter(
        (item) => item.id !== action.cartItemId
      );
      return {
        ...state,
        cartItems: filteredCartItems,
      };

    default:
      return state;
  }
}

const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('state:', state.cartItems);

  function addToCart(product) {
    dispatch({ type: 'ADD_TO_CART', product });
    // const findCartItem = cartItems.find((item) => item.id === product.id);

    // if (findCartItem) {
    //   const newCartItems = cartItems.map((item) => {
    //     if (item.id === findCartItem.id) {
    //       return { ...item, quantity: item.quantity + 1 };
    //     }
    //     return item;
    //   });

    //   setCartItems(newCartItems);
    // } else {
    //   setCartItems([{ ...product, quantity: 1 }, ...cartItems]);
    // }
  }

  function deleteFromCart(cartItemId) {
    dispatch({ type: 'DELETE_FROM_CART', cartItemId });
    const filteredCartItems = cartItems.filter(
      (item) => item.id !== cartItemId
    );

    setCartItems(filteredCartItems);
  }

  function handleClearCart() {
    setCartItems([]);
  }

  console.log(state.cartItems);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        deleteFromCart,
        handleClearCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
