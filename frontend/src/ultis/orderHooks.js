import { useState, useEffect } from 'react';

export const useOrder= ()=>{
    const cart= localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {items: [], address: {}};
    const [selectedItems, setSelectedItems]= useState([]);

    const [address, setAddress]= useState(cart.address);

    useEffect(()=> {
        cart.address= address;
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [address]);

    return { selectedItems, address, setSelectedItems, setAddress };
}
