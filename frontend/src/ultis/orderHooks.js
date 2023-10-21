import { useState } from 'react';

export const useOrder= ()=>{

    const [selectedItems, setSelectedItems]= useState([]);
    const [address, setAddress]= useState();


    return { selectedItems, address, setSelectedItems, setAddress };
}
