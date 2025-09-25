import React , {useContext , useEffect}from 'react'
import { ShopContext } from "../context/ShopContext";
import {AuthContext } from "../context/AuthContext";

const Testcart = () => {

      const { getCartItems } = useContext(ShopContext);
      const { authTokens } = useContext(AuthContext);
    
 useEffect(()=>{
    getCartItems(authTokens)
 },[])     
  return (
    <div>
        hello from test
    </div>
  )
}

export default Testcart;