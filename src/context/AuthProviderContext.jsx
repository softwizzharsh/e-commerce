
import React, { useState , useEffect } from 'react'
import { createContext } from 'react'
import axios from 'axios'
import { BACKEND_API } from '../backendApi'

export const AuthContext =  createContext()
function AuthProviderContext({children}) {
    const [isLogin , setIsLogin] =  useState(false)
    const [blogs , setBlogs] = useState([])
 // Fetch blogs
   const fetchBlogs = async () => {
     try {
       const res = await axios.get(`${BACKEND_API}/api/blogs`);
       setBlogs(res.data);
     } catch (err) {
       console.error("Error fetching blogs:", err);
     }
   };

   useEffect(() => {
     fetchBlogs();
   }, []);

  return (
    <div>
        <AuthContext.Provider value={{isLogin , setIsLogin, blogs}} >
           {children}
        </AuthContext.Provider>
    </div>
  )
}

export default AuthProviderContext
