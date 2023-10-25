import { useState, useEffect } from 'react';

export const useOrder= ()=>{
    const cart= localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {items: [], address: {}};
    const itemsStorage= localStorage.getItem('selectedItems') ? JSON.parse(localStorage.getItem('selectedItems')) : {items: []}
    const [selectedItems, setSelectedItems]= useState(itemsStorage.items);
    
    const [address, setAddress]= useState(cart.address);

    useEffect(()=> {
        cart.address= address;
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [address]);

    useEffect(()=> {
        localStorage.setItem('selectedItems', JSON.stringify({items: selectedItems}))
    }, [selectedItems])

    return { selectedItems, address, setSelectedItems, setAddress };
}
