import React, { createContext, useEffect, useState ,useContext } from "react";
import { AuthContext } from "./AuthProviderContext";
import {BACKEND_API} from "../backendApi"
export const addToCartContext = createContext();

function AddToCartContextProvider({ children }) {

  const userId = localStorage.getItem("userID");
  let [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [discount, setDiscount] = useState("00.00");
  const { isLogin }=   useContext(AuthContext)

  const fetchCartData = async () => {
    if (userId) {
    try {
        const res = await fetch(`${BACKEND_API}/api/cart/${userId}`);
        const data = await res.json();
        if (data.isError){
          setCartItems([])
        }else{
          setCartItems(data);
        }
        setLoading(false);
      } catch (err) {
        console.log(err)
        setError("Failed to fetch cart data");
        setLoading(false);
      }
    }
    else{
      setLoading(false);
    }
    if (!isLogin) {
      setCartItems([])
    }
  };


  useEffect(()=>{
    fetchCartData()
  } , [isLogin])
  const addProductToCart = async (productId, quantity) => {
    try {
      if (userId) {
        const res = await fetch(`${BACKEND_API}/api/cart/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, productId, quantity }),
        });
        const data = await res.json();
        alert("Product Add !")
        fetchCartData()
      }else{
        alert("Login you Account ! ")
      }
    } catch (error) {
        console.log(error)
    }
  };

  const removeFromCart = async (productId) => {
    console.log(productId)
    const res = await fetch(
      `${BACKEND_API}/api/cart/${userId}/${productId}`,
      { method: "DELETE" }
    );
    const data = await res.json();
    // setCart(data); // update state with new cart
    alert("Item removed from cart!");
  };

   const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const data =   total + Math.round(item.productId.mrp * (1 - item.productId.discount / 100)) * item.quantity
     return data ; 
     
    }, 0);
  };

  const calculateSavings = () => {
    return discount
  };
  return (
    <div>
      <addToCartContext.Provider value={{setDiscount, discount ,  calculateTotal, calculateSavings,addProductToCart , removeFromCart , cartItems , setCartItems , loading , error ,userId }}>
        {children}
      </addToCartContext.Provider>
    </div>
  );
}

export default AddToCartContextProvider;
