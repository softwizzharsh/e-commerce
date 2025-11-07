
import React, { useState } from 'react'
import { createContext } from 'react'

export const AuthContext =  createContext()

function AuthProviderContext({children}) {
    const [isLogin , setIsLogin] =  useState(false)
 
  return (
    <div>
        <AuthContext.Provider value={{isLogin , setIsLogin ,}} >
           {children}
        </AuthContext.Provider>
    </div>
  )
}

export default AuthProviderContext
