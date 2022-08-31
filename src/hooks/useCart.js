import React from 'react';
import AppContext from '../context';

export const useCart = () => {
  const { cartItems, setCartItems } = React.useContext(AppContext);

  const totalprice = cartItems.reduce((sum, obj) => Number(obj.price) + sum, 0);

  return { cartItems, totalprice, setCartItems };
};
