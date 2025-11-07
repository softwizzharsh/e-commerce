import React, { useContext, useEffect, useState } from "react";
import {wishlistContext} from "../context/WishlistContextProvider"
import { AuthContext } from "../context/AuthProviderContext";
import { addToCartContext } from "../context/AddToCartContextProvider";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import axios from "axios";
import BACKEND_API from "../backendApi"
function SimilarProducts({subCategory}) {
  const [similarProducts, setSimilarProducts] = useState([]);
  const {addToWishlist} =   useContext(wishlistContext)
  const {isLogin}  =  useContext(AuthContext)
   const { addProductToCart } =  useContext(addToCartContext) 
  useEffect(() => {
    ( async()=>{
      try {
        const res =  await axios.get(`${BACKEND_API}/api/similarProduct/${subCategory}`)
        if(res.statusText === "OK"){
          setSimilarProducts(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [subCategory]);
  return (
    <>
      <section class="py-5">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="bootstrap-tabs product-tabs">
                <div class="tabs-header d-flex justify-content-between border-bottom my-5">
                  <h3>Similar Products</h3>
                </div>
                <div class="tab-content" id="nav-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="nav-all"
                    role="tabpanel"
                    aria-labelledby="nav-all-tab"
                  >
                    <div class="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
                      {similarProducts.map(({ _id , pic1 , mrp ,productname , netquantity, discount ,}) => {
                        return (
                          <div class="col" key={_id}>
                            <div class="product-item">
                              <span class="badge bg-success position-absolute m-3">
                               -{discount} %
                              </span>
                              <span class="btn-wishlist" onClick={()=>{ isLogin ? addToWishlist(_id) : alert(" plz login your Account !")}}>
                                <svg width="24" height="24">
                                  <use xlinkHref="#heart" ></use>
                                </svg>
                              </span>
                              <figure>
                                <Link to={`/productDetail/${_id}`}>
                                {/* <a href="" title="Product Title"> */}
                                <img src={pic1} class="tab-image w-100" />
                                {/* </a> */}
                                </Link>
                              </figure>
                              <div className="px-3 pb-3">

                              <h3>{productname}</h3>
                              <span class="qty">{netquantity} Unit</span>
                              <span class="rating">
                                <svg
                                  width="24"
                                  height="24"
                                  class="text-primary"
                                >
                                  <use xlinkHref="#star-solid"></use>
                                </svg>{" "}
                                4.5
                              </span>
                              <span class="price">₹ {mrp}</span>
                              <div class="d-flex align-items-center justify-content-between">
                                <button
                           onClick={()=>{addProductToCart(_id)}}
            className="btn w-100 text-white fw-semibold py-3 d-flex align-items-center justify-content-center gap-2 shadow"
            style={{
              background: "linear-gradient(135deg, #007bff, #6f42c1)",
              borderRadius: "15px",
              border: "none",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.background =
                "linear-gradient(135deg, #0056b3, #5a2d91)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.background =
                "linear-gradient(135deg, #007bff, #6f42c1)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
                                {/* <div class="input-group product-qty">
                                  <span class="input-group-btn">
                                    <button
                                      type="button"
                                      class="quantity-left-minus btn btn-danger btn-number"
                                      data-type="minus"
                                    >
                                      <svg width="16" height="16">
                                        <use xlinkHref="#minus"></use>
                                      </svg>
                                    </button>
                                  </span>
                                  <input
                                    type="text"
                                    id="quantity"
                                    name="quantity"
                                    class="form-control input-number"
                                    value="1"
                                    onChange={() => {}}
                                  />
                                  <span class="input-group-btn">
                                    <button
                                      type="button"
                                      class="quantity-right-plus btn btn-success btn-number"
                                      data-type="plus"
                                    >
                                      <svg width="16" height="16">
                                        <use xlinkHref="#plus"></use>
                                      </svg>
                                    </button>
                                  </span>
                                </div> */}
                                {/* <a href="#" class="nav-link">
                                  Add to Cart{" "}
                                  <iconify-icon icon="uil:shopping-cart"></iconify-icon>
                                </a> */}
                              </div>

                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SimilarProducts;
