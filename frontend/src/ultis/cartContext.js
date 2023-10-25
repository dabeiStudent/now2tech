import {createContext} from 'react';

export const CartContext= createContext({
    items: [],
    addToCart: ()=> {},
    reduceQty: ()=> {},
    increaseQty: ()=> {},
    deleteItem: ()=> {},
    setCartItems: ()=> {}
});