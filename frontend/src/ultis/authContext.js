import { createContext } from 'react';

export const AuthContext= createContext({
    isLogin: false,
    username: '',
    login: ()=>{},
    logout:()=> {}
})