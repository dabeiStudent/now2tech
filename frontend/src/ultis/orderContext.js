import { createContext } from 'react';

export const OrderContext= createContext({
    selectedItems: [],
    address: '',
    setSelectedItems: ()=>{},
    setAddress: ()=> {}
})