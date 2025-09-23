import React ,{useState , useContext}from 'react'
import CartTotal from '../components/CartTotal';
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";



const Payment = () => {
    const [method, setMethod] = useState("cod");
    const { placeOrder } = useContext(ShopContext); 

  return (
    <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal></CartTotal>

        </div>
        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={"METHOD"}></Title>
          <div className="flex gap-3 flex-col lg:flex-row">
            <div  onClick={()=>setMethod('stripe')} className={`flex items-center gap-3 border p-2 px-3 cursor-pointer  ${method === 'stripe' ? 'border-blue-600' : ''} `}>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400 ' : ''}`}></p>
                <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('razorpay')} className={`flex items-center gap-3 border p-2 px-3 cursor-pointer  ${method === 'razorpay' ? 'border-blue-600' : ''} `}>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400 ' : ''}`}></p>
                <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('cod')} className={`flex items-center gap-3 border p-2 px-3 cursor-pointer  ${method === 'cod' ? 'border-blue-600' : ''} `}>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400 ' : ''}`}></p>
                <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>

            </div>

          </div>
          <div className="w-full text-end mt-8">
            <button onClick={()=> placeOrder()} className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>

          </div>
        </div>

      </div>
  )
}

export default Payment