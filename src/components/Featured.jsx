import React, { useState, useEffect, useContext } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { wishlistContext } from "../context/WishlistContextProvider";
import { AuthContext } from "../context/AuthProviderContext";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { addToCartContext } from "../context/AddToCartContextProvider";
import {BACKEND_API} from "../backendApi"
function Featured() {
  const [swiperInstance4, setSwiperInstance4] = useState(null);
  const [newProducts, setNewProducts] = useState([]);
  const { addToWishlist } = useContext(wishlistContext);
  const { isLogin } = useContext(AuthContext);
  const { addProductToCart } =  useContext(addToCartContext)
  useEffect(() => {
    fetch(`${BACKEND_API}/api/featuredProducts`)
      .then((res) => res.json())
      .then((data) => setNewProducts(data.newProducts))
      .catch((error) => console.log(error));
  }, []);
  return (
    <section class="py-5 overflow-hidden">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="section-header d-flex justify-content-between">
              <h2 class="section-title">Featured Products </h2>

              <div class="d-flex align-items-center">
                <a href="#" class="btn-link text-decoration-none">
                  View All Products  →
                </a>
                <div class="swiper-buttons">
                  <button
                    class="swiper-prev products-carousel-prev btn btn-primary"
                    onClick={() => swiperInstance4?.slidePrev()}
                  >
                    ❮
                  </button>
                  <button
                    class="swiper-next products-carousel-next btn btn-primary"
                    onClick={() => swiperInstance4?.slideNext()}
                  >
                    ❯
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="products-carousel swiper">
              <Swiper
                spaceBetween={20}
                slidesPerView={5}
                loop={true}
                onSwiper={setSwiperInstance4} // Set the Swiper instance when it's initialized
                style={{ "--swiper-pagination-color": "#fff" }}
              >
                {newProducts.map(({ _id , pic1 , mrp ,productname , netquantity, discount ,}) => (
                  <SwiperSlide>
                    <div class="product-item">
                      <span class="badge bg-success position-absolute m-3">
                        -{discount} %
                      </span>
                      <span
                        class="btn-wishlist"
                        onClick={() => {
                          isLogin
                            ? addToWishlist(_id)
                            : alert(" plz login your Account !");
                        }}
                      >
                        <svg width="24" height="24">
                          <use xlinkHref="#heart"></use>
                        </svg>
                      </span>
                      <figure>
                        <Link to={`productDetail/${_id}`}>
                          {/* <a href="" title="Product Title"> */}
                          <img src={pic1} class="tab-image w-100" />
                          {/* </a> */}
                        </Link>
                      </figure>
                      <div className="px-3 pb-3">
                        <h3>{productname}</h3>
                        <span class="qty">{netquantity} Unit</span>
                        <span class="rating">
                          <svg width="24" height="24" class="text-primary">
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
              
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

                {/* <SwiperSlide>
                    <div class="product-item ">
                      <a href="#" class="btn-wishlist">
                        <svg width="24" height="24">
                          <use xlinkHref="#heart"></use>
                        </svg>
                      </a>
                      <figure>
                        <a href="index.html" title="Product Title">
                          <img
                            src={require("../images/thumb-tomatoes.png")}
                            class="tab-image"
                          />
                        </a>
                      </figure>
                      <h3>Sunstar Fresh Melon Juice</h3>
                      <span class="qty">1 Unit</span>
                      <span class="rating">
                        <svg width="24" height="24" class="text-primary">
                          <use xlinkHref="#star-solid"></use>
                        </svg>{" "}
                        4.5
                      </span>
                      <span class="price">$18.00</span>
                      <div class="d-flex align-items-center justify-content-between">
                        <div class="input-group product-qty">
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
                        </div>
                        <a href="#" class="nav-link">
                          Add to Cart{" "}
                          <iconify-icon icon="uil:shopping-cart"></iconify-icon>
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div class="product-item ">
                      <a href="#" class="btn-wishlist">
                        <svg width="24" height="24">
                          <use xlinkHref="#heart"></use>
                        </svg>
                      </a>
                      <figure>
                        <a href="index.html" title="Product Title">
                          <img
                            src={require("../images/thumb-tomatoes.png")}
                            class="tab-image"
                          />
                        </a>
                      </figure>
                      <h3>Sunstar Fresh Melon Juice</h3>
                      <span class="qty">1 Unit</span>
                      <span class="rating">
                        <svg width="24" height="24" class="text-primary">
                          <use xlinkHref="#star-solid"></use>
                        </svg>{" "}
                        4.5
                      </span>
                      <span class="price">$18.00</span>
                      <div class="d-flex align-items-center justify-content-between">
                        <div class="input-group product-qty">
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
                        </div>
                        <a href="#" class="nav-link">
                          Add to Cart{" "}
                          <iconify-icon icon="uil:shopping-cart"></iconify-icon>
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div class="product-item ">
                      <a href="#" class="btn-wishlist">
                        <svg width="24" height="24">
                          <use xlinkHref="#heart"></use>
                        </svg>
                      </a>
                      <figure>
                        <a href="index.html" title="Product Title">
                          <img
                            src={require("../images/thumb-tomatoes.png")}
                            class="tab-image"
                          />
                        </a>
                      </figure>
                      <h3>Sunstar Fresh Melon Juice</h3>
                      <span class="qty">1 Unit</span>
                      <span class="rating">
                        <svg width="24" height="24" class="text-primary">
                          <use xlinkHref="#star-solid"></use>
                        </svg>{" "}
                        4.5
                      </span>
                      <span class="price">$18.00</span>
                      <div class="d-flex align-items-center justify-content-between">
                        <div class="input-group product-qty">
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
                        </div>
                        <a href="#" class="nav-link">
                          Add to Cart{" "}
                          <iconify-icon icon="uil:shopping-cart"></iconify-icon>
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div class="product-item ">
                      <a href="#" class="btn-wishlist">
                        <svg width="24" height="24">
                          <use xlinkHref="#heart"></use>
                        </svg>
                      </a>
                      <figure>
                        <a href="index.html" title="Product Title">
                          <img
                            src={require("../images/thumb-tomatoes.png")}
                            class="tab-image"
                          />
                        </a>
                      </figure>
                      <h3>Sunstar Fresh Melon Juice</h3>
                      <span class="qty">1 Unit</span>
                      <span class="rating">
                        <svg width="24" height="24" class="text-primary">
                          <use xlinkHref="#star-solid"></use>
                        </svg>{" "}
                        4.5
                      </span>
                      <span class="price">$18.00</span>
                      <div class="d-flex align-items-center justify-content-between">
                        <div class="input-group product-qty">
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
                        </div>
                        <a href="#" class="nav-link">
                          Add to Cart{" "}
                          <iconify-icon icon="uil:shopping-cart"></iconify-icon>
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div class="product-item ">
                      <a href="#" class="btn-wishlist">
                        <svg width="24" height="24">
                          <use xlinkHref="#heart"></use>
                        </svg>
                      </a>
                      <figure>
                        <a href="index.html" title="Product Title">
                          <img
                            src={require("../images/thumb-tomatoes.png")}
                            class="tab-image"
                          />
                        </a>
                      </figure>
                      <h3>Sunstar Fresh Melon Juice</h3>
                      <span class="qty">1 Unit</span>
                      <span class="rating">
                        <svg width="24" height="24" class="text-primary">
                          <use xlinkHref="#star-solid"></use>
                        </svg>{" "}
                        4.5
                      </span>
                      <span class="price">$18.00</span>
                      <div class="d-flex align-items-center justify-content-between">
                        <div class="input-group product-qty">
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
                        </div>
                        <a href="#" class="nav-link">
                          Add to Cart{" "}
                          <iconify-icon icon="uil:shopping-cart"></iconify-icon>
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div class="product-item ">
                      <a href="#" class="btn-wishlist">
                        <svg width="24" height="24">
                          <use xlinkHref="#heart"></use>
                        </svg>
                      </a>
                      <figure>
                        <a href="index.html" title="Product Title">
                          <img
                            src={require("../images/thumb-tomatoes.png")}
                            class="tab-image"
                          />
                        </a>
                      </figure>
                      <h3>Sunstar Fresh Melon Juice</h3>
                      <span class="qty">1 Unit</span>
                      <span class="rating">
                        <svg width="24" height="24" class="text-primary">
                          <use xlinkHref="#star-solid"></use>
                        </svg>{" "}
                        4.5
                      </span>
                      <span class="price">$18.00</span>
                      <div class="d-flex align-items-center justify-content-between">
                        <div class="input-group product-qty">
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
                        </div>
                        <a href="#" class="nav-link">
                          Add to Cart{" "}
                          <iconify-icon icon="uil:shopping-cart"></iconify-icon>
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div class="product-item ">
                      <a href="#" class="btn-wishlist">
                        <svg width="24" height="24">
                          <use xlinkHref="#heart"></use>
                        </svg>
                      </a>
                      <figure>
                        <a href="index.html" title="Product Title">
                          <img
                            src={require("../images/thumb-tomatoes.png")}
                            class="tab-image"
                          />
                        </a>
                      </figure>
                      <h3>Sunstar Fresh Melon Juice</h3>
                      <span class="qty">1 Unit</span>
                      <span class="rating">
                        <svg width="24" height="24" class="text-primary">
                          <use xlinkHref="#star-solid"></use>
                        </svg>{" "}
                        4.5
                      </span>
                      <span class="price">$18.00</span>
                      <div class="d-flex align-items-center justify-content-between">
                        <div class="input-group product-qty">
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
                        </div>
                        <a href="#" class="nav-link">
                          Add to Cart{" "}
                          <iconify-icon icon="uil:shopping-cart"></iconify-icon>
                        </a>
                      </div>
                    </div>
                  </SwiperSlide> */}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Featured;
