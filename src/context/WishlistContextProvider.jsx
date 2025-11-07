import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import BACKEND_API from "../backendApi"

export const wishlistContext = createContext();
function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState({});
  const userId = localStorage.getItem("userID");
  async function addToWishlist(id) {
    try {
      if (userId) {
        const res = await fetch(
          `${BACKEND_API}/api/wishlist/${userId}/add`,
          {
            method: "post",
            body: JSON.stringify({ productId : id }),
            headers: {
              "content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        alert(" product add  to the WishList !")
        // console.log(data);
      } else {
        alert("plz login you Account !");
      }
    } catch (error) {
      console.log(error);
      alert(" server Error !");
    }
  }
  
  async function getWishlist() {
      try {
        const res =  await fetch(`${BACKEND_API}/api/wishlist/${userId}`)
        const data = await res.json()
        setWishlist(data)
      } catch (error) {
          console.log(error)
      }
  }
  
  useEffect(()=>{
    if(userId){
      getWishlist()
    }
  } , [userId])

    // Remove from wishlist
  const handleRemove = async (productId) => {
    try {
      await axios.delete(`${BACKEND_API}/api/wishlist/${userId}/remove`, {
        data: { productId },
      });
     getWishlist()
    } catch (err) {
      console.error("Error removing product:", err);
    }
  };
  return (
    <div>
      <wishlistContext.Provider value={{ addToWishlist , wishlist ,handleRemove }}>
        {children}
      </wishlistContext.Provider>
    </div>
  );
}

export default WishlistContextProvider;
