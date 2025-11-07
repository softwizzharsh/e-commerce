import React from 'react'
import Product from './Product'
import { useParams ,useSearchParams } from 'react-router-dom'
const MainCategoryProducts = () => {
   const param  =   useParams()
   const [data]=  useSearchParams() 
   const isName = data.get("isName")
  return (
    <div>
        <Product categoryId={param.id} isName={isName}></Product>
    </div>
  )
}

export default MainCategoryProducts
