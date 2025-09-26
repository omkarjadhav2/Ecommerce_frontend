import React , {useContext , useEffect}from 'react'
import { ShopContext } from "../context/ShopContext";
import {AuthContext } from "../context/AuthContext";

const Testcart = () => {

      const { getOrderItems } = useContext(ShopContext);
      const { authTokens } = useContext(AuthContext);
    
 useEffect(()=>{
    getOrderItems(authTokens)
 },[])     
  return (
    <div>
        hello from test
    </div>
  )
}

export default Testcart;