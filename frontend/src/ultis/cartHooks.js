import { useState, useEffect } from 'react';

export const useCart= ()=>{
    const cart= localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {items: []};
    const [cartItems, setCartItems]= useState(cart.items);
    const addressInStorage= cart.address

    const addToCart= (item)=>{
        const existItem= cartItems.find(i=> i.id === item.id);
        if(existItem){
          cartItems.map((i)=> {
            if(i.id === item.id){
              i.qty= i.qty +1;
            }
            return setCartItems([...cartItems]);
          });
          
        } else{
          setCartItems((prev)=> [...prev, item])
        }   
    }

    const reduceQty= (pid)=> {
        cartItems.map((i)=> {
            if(i.id === pid){
                i.qty= i.qty - 1;
            }
            return setCartItems([...cartItems]);
        })
    }

    const increaseQty= (pid)=> {
        cartItems.map((i)=> {
            if(i.id === pid){
                i.qty= i.qty + 1;
            }
            return setCartItems([...cartItems]);
        })
    }

    const deleteItem= (pid)=> {
        const deletedItems= cartItems.filter((i)=> i.id !== pid)
        setCartItems(deletedItems);
    }
    
    useEffect(()=> {
        localStorage.setItem('cart', JSON.stringify({items: cartItems, address: addressInStorage}));
    },[cartItems, addressInStorage]);

    return { cartItems, addToCart, reduceQty, increaseQty, deleteItem, setCartItems };
}