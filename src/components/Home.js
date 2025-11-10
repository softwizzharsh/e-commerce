import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/swiper-bundle.css";
// import 'jquery/dist/jquery.js';
// import "../js/script.js";
import { register } from "swiper/element/bundle";
import TrendingProduct from "./TrendingProduct";
import SubCategory from "./SubCategory";
import Brand from "./Brand";
import JustArrived from "./JustArrived";
import Latest from "./Latest";
import Featured from "./Featured";
import { AuthContext } from "../context/AuthProviderContext";
import { useContext } from "react";

register();

export default function Home() {
  const [swiperInstance2, setSwiperInstance2] = useState(null);
  const [swiperInstance3, setSwiperInstance3] = useState(null);
  const [swiperInstance4, setSwiperInstance4] = useState(null);
  const { blogs } = useContext(AuthContext);
  return (
    <>
      <section class="py-3 section1">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="banner-blocks">
                <div class="banner-ad large bg-info block-1">
                  <div class="swiper main-swiper">
                    {/* <div class="swiper-wrapper"> */}

                    <Swiper
                      spaceBetween={3}
                      slidesPerView={1}
                      pagination={true}
                      loop={true}
                      style={{
                        "--swiper-pagination-color": "#fff",
                      }}
                    >
                      <SwiperSlide>
                        <div className="row banner-content p-5">
                          <div className="content-wrapper col-md-7">
                            <div className="categories my-3">
                              New Season Arrivals
                            </div>
                            <h3 className="display-4">
                              Trendy Styles for Every Occasion
                            </h3>
                            <p>
                              Discover the latest fashion pieces designed to
                              keep you stylish and comfortable. Shop the newest
                              looks before they’re gone.
                            </p>
                            <a
                              href="#"
                              className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1 px-4 py-3 mt-3"
                            >
                              Shop Now
                            </a>
                          </div>
                          <div className="img-wrapper col-md-5 text-center">
                            <img
                              src={require("../images/d1.webp")}
                              alt="Fashion Banner"
                              className="img-fluid"
                            />
                          </div>
                        </div>
                      </SwiperSlide>

                      <SwiperSlide>
                        <div className="row banner-content p-5">
                          <div className="content-wrapper col-md-7">
                            <div className="categories mb-3 pb-3">
                              Exclusive Collection
                            </div>
                            <h3 className="banner-title">
                              Upgrade Your Wardrobe
                            </h3>
                            <p>
                              From casual wear to party outfits, explore our
                              premium clothing range crafted for modern comfort
                              and timeless style.
                            </p>
                            <a
                              href="#"
                              className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1"
                            >
                              Explore Collection
                            </a>
                          </div>
                          <div className="img-wrapper col-md-5 text-center">
                            <img
                              src={require("../images/d3.png")}
                              alt="Clothing Banner"
                              className="img-fluid"
                            />
                          </div>
                        </div>
                      </SwiperSlide>

                      <SwiperSlide>
                        <div className="row banner-content p-5">
                          <div className="content-wrapper col-md-7">
                            <div className="categories mb-3 pb-3">
                              Best Seller
                            </div>
                            <h3 className="banner-title">
                              Classic Denim Collection
                            </h3>
                            <p>
                              Refresh your everyday look with our best-selling
                              denim jackets, jeans, and shirts — perfect for all
                              seasons and styles.
                            </p>
                            <a
                              href="#"
                              className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1"
                            >
                              View More
                            </a>
                          </div>
                          <div className="img-wrapper col-md-5 text-center">
                            <img
                              src={require("../images/d1.png")}
                              alt="Denim Collection"
                              className="img-fluid"
                              width={240}
                            />
                          </div>
                        </div>
                      </SwiperSlide>

                      <div class="swiper-pagination"></div>
                    </Swiper>
                  </div>
                </div>

                <div class="banner-ad bg-success-subtle block-2 bannerad1">
                  <div class="row banner-content p-5">
                    <div class="content-wrapper col-md-7">
                      <div class="categories sale mb-3 pb-3">20% off</div>
                      <h3 class="banner-title">Women's Collection</h3>
                      <a href="#" class="d-flex align-items-center nav-link">
                        Shop Collection{" "}
                        <svg width="24" height="24">
                          <use xlinkHref="#arrow-right"></use>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="banner-ad bg-danger block-3 bannerad2">
                  <div class="row banner-content p-5">
                    <div class="content-wrapper col-md-7">
                      <div class="categories sale mb-3 pb-3">15% off</div>
                      <h3 class="item-title">Men's Collection</h3>
                      <a href="#" class="d-flex align-items-center nav-link">
                        Shop Collection{" "}
                        <svg width="24" height="24">
                          <use xlinkHref="#arrow-right"></use>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SubCategory></SubCategory>

      <Brand></Brand>

      <TrendingProduct></TrendingProduct>

      <section class="py-5">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
              <div class="banner-ad banneradchocolate bg-danger mb-3">
                <div class="banner-content p-5">
                  <div class="categories text-primary fs-3 fw-bold">
                    Upto 25% Off
                  </div>
                  <h3 class="banner-title">Men's Collection</h3>
                  <p>
                    Separated they live in Bookmarksgrove right at the coast of
                    the Semantics, a large language ocean.
                  </p>
                  <a href="#" class="btn btn-dark text-uppercase">
                    Show Now
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="banner-ad banneradcreamy bg-info">
                <div class="banner-content p-5">
                  <div class="categories text-primary fs-3 fw-bold">
                    Upto 25% Off
                  </div>
                  <h3 class="banner-title">Women's Collection</h3>
                  <p>
                    Separated they live in Bookmarksgrove right at the coast of
                    the Semantics, a large language ocean.
                  </p>
                  <a href="#" class="btn btn-dark text-uppercase">
                    Show Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Latest></Latest>

      <section class="py-5">
        <div class="container-fluid">
          <div class="bg-secondary py-5 my-5 rounded-5 div1">
            <div class="container my-5">
              <div class="row">
                <div class="col-md-6 p-5">
                  <div class="section-header">
                    <h2 class="section-title display-4">
                      Get <span class="text-primary">25% Off</span> your first
                      fashion order
                    </h2>
                  </div>
                  <p>
                    Join our style community and enjoy exclusive discounts,
                    early access to new arrivals, and personalized fashion
                    updates straight to your inbox.
                  </p>
                </div>
                <div class="col-md-6 p-5">
                  <form>
                    <div class="mb-3">
                      <label for="name" class="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        name="name"
                        id="name"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        class="form-control form-control-lg"
                        name="email"
                        id="email"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div class="form-check form-check-inline mb-3">
                      <label class="form-check-label" for="subscribe">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="subscribe"
                          value="subscribe"
                        />
                        Subscribe for exclusive fashion deals
                      </label>
                    </div>
                    <div class="d-grid gap-2">
                      <button type="submit" class="btn btn-dark btn-lg">
                        Get Discount
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Featured></Featured>

      <JustArrived></JustArrived>
      <section id="latest-blog" class="py-5">
        <div class="container-fluid">
          <div class="row">
            <div class="section-header d-flex align-items-center justify-content-between my-5">
              <h2 class="section-title">Our Recent Blog</h2>
              <div class="btn-wrap align-right">
                <Link to={"blogs"} class="d-flex align-items-center nav-link">
                  Read All Articles{" "}
                  <svg width="24" height="24">
                    <use xlinkHref="#arrow-right"></use>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div class="row">
            {blogs.slice(0, 3).map((blog) => {
              return (
                <div class="col-md-4">
                  <article class="post-item card border-0 shadow-sm p-3">
                    <div class="image-holder zoom-effect">
                      <Link to="blogs">
                        <img src={blog.image} alt="post" class="card-img-top" />
                      </Link>
                    </div>
                    <div class="card-body">
                      <div class="post-meta d-flex text-uppercase gap-3 my-2 align-items-center">
                        <div class="meta-date">
                          <svg width="16" height="16">
                            <use xlinkHref="#calendar"></use>
                          </svg>
                          Post On: {new Date(blog.postOn).toLocaleDateString()}
                        </div>
                      </div>
                      <div class="post-header">
                        <h3 class="post-title">
                          <Link to="blogs" class="text-decoration-none">
                            {blog.title}
                          </Link>
                        </h3>
                        <p>{blog.description.split(0, 50)}...</p>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* <section class="py-5 my-5">
        <div class="container-fluid">
          <div class="bg-warning py-5 rounded-5 div2">
            <div class="container">
              <div class="row">
                <div class="col-md-4">
                  <img
                    src={require("../images/phone.png")}
                    alt="phone"
                    class="image-float img-fluid"
                  />
                </div>
                <div class="col-md-8">
                  <h2 class="my-5">Shop faster with foodmart App</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sagittis sed ptibus liberolectus nonet psryroin. Amet sed
                    lorem posuere sit iaculis amet, ac urna. Adipiscing fames
                    semper erat ac in suspendisse iaculis. Amet blandit tortor
                    praesent ante vitae. A, enim pretiummi senectus magna.
                    Sagittis sed ptibus liberolectus non et psryroin.
                  </p>
                  <div class="d-flex gap-2 flex-wrap">
                    <img
                      src={require("../images/app-store.jpg")}
                      alt="app-store"
                    />
                    <img
                      src={require("../images/google-play.jpg")}
                      alt="google-play"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section class="py-5 my-5">
        <div class="container-fluid">
          <div class="bg-warning py-5 rounded-5 div2">
            <div class="container">
              <div class="row">
                <div class="col-md-4">
                  <img
                    src={require("../images/phone.png")}
                    alt="phone"
                    class="image-float img-fluid"
                  />
                </div>
                <div class="col-md-8">
                  <h2 class="my-5">Shop smarter with the StyleMart App</h2>
                  <p>
                    Discover the latest trends, exclusive collections, and
                    limited-time offers — all from the comfort of your phone.
                    With our app, you can browse effortlessly, save your
                    favorite looks, and check out faster with secure payment
                    options. Fashion inspiration and easy shopping, right in
                    your pocket.
                  </p>
                  <div class="d-flex gap-2 flex-wrap">
                    <img
                      src={require("../images/app-store.jpg")}
                      alt="app-store"
                    />
                    <img
                      src={require("../images/google-play.jpg")}
                      alt="google-play"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-5">
        <div class="container-fluid">
          <h2 class="my-5">People are also looking for</h2>
          <a href="#" class="btn btn-warning me-2 mb-2">
            Blue diamon almonds
          </a>
          <a href="#" class="btn btn-warning me-2 mb-2">
            Angie’s Boomchickapop Corn
          </a>
          <a href="#" class="btn btn-warning me-2 mb-2">
            Salty kettle Corn
          </a>
          <a href="#" class="btn btn-warning me-2 mb-2">
            Chobani Greek Yogurt
          </a>
          <a href="#" class="btn btn-warning me-2 mb-2">
            Sweet Vanilla Yogurt
          </a>
          <a href="#" class="btn btn-warning me-2 mb-2">
            Foster Farms Takeout Crispy wings
          </a>
          <a href="#" class="btn btn-warning me-2 mb-2">
            Warrior Blend Organic
          </a>
          <a href="#" class="btn btn-warning me-2 mb-2">
            Chao Cheese Creamy
          </a>
          <a href="#" class="btn btn-warning me-2 mb-2">
            Chicken meatballs
          </a>
          <a href="#" class="btn btn-warning me-2 mb-2">
            Blue diamon almonds
          </a>
          <a href="#" class="btn btn-warning me-2 mb-2">
            Angie’s Boomchickapop Corn
          </a>
          <a href="#" class="btn btn-warning me-2 mb-2">
            Salty kettle Corn
          </a>
          <a href="#" class="btn btn-warning me-2 mb-2">
            Chobani Greek Yogurt
          </a>
          <a href="#" class="btn btn-warning me-2 mb-2">
            Sweet Vanilla Yogurt
          </a>
          <a href="#" class="btn btn-warning me-2 mb-2">
            Foster Farms Takeout Crispy wings
          </a>
          <a href="#" class="btn btn-warning me-2 mb-2">
            Warrior Blend Organic
          </a>
          <a href="#" class="btn btn-warning me-2 mb-2">
            Chao Cheese Creamy
          </a>
          <a href="#" class="btn btn-warning me-2 mb-2">
            Chicken meatballs
          </a>
        </div>
      </section>

      {/* <section class="py-5">
        <div class="container-fluid">
          <div class="row row-cols-1 row-cols-sm-3 row-cols-lg-5">
            <div class="col">
              <div class="card mb-3 border-0">
                <div class="row">
                  <div class="col-md-2 text-dark">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M21.5 15a3 3 0 0 0-1.9-2.78l1.87-7a1 1 0 0 0-.18-.87A1 1 0 0 0 20.5 4H6.8l-.33-1.26A1 1 0 0 0 5.5 2h-2v2h1.23l2.48 9.26a1 1 0 0 0 1 .74H18.5a1 1 0 0 1 0 2h-13a1 1 0 0 0 0 2h1.18a3 3 0 1 0 5.64 0h2.36a3 3 0 1 0 5.82 1a2.94 2.94 0 0 0-.4-1.47A3 3 0 0 0 21.5 15Zm-3.91-3H9L7.34 6H19.2ZM9.5 20a1 1 0 1 1 1-1a1 1 0 0 1-1 1Zm8 0a1 1 0 1 1 1-1a1 1 0 0 1-1 1Z"
                      />
                    </svg>
                  </div>
                  <div class="col-md-10">
                    <div class="card-body p-0">
                      <h5>Free delivery</h5>
                      <p class="card-text">
                        Lorem ipsum dolor sit amet, consectetur adipi elit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card mb-3 border-0">
                <div class="row">
                  <div class="col-md-2 text-dark">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M19.63 3.65a1 1 0 0 0-.84-.2a8 8 0 0 1-6.22-1.27a1 1 0 0 0-1.14 0a8 8 0 0 1-6.22 1.27a1 1 0 0 0-.84.2a1 1 0 0 0-.37.78v7.45a9 9 0 0 0 3.77 7.33l3.65 2.6a1 1 0 0 0 1.16 0l3.65-2.6A9 9 0 0 0 20 11.88V4.43a1 1 0 0 0-.37-.78ZM18 11.88a7 7 0 0 1-2.93 5.7L12 19.77l-3.07-2.19A7 7 0 0 1 6 11.88v-6.3a10 10 0 0 0 6-1.39a10 10 0 0 0 6 1.39Zm-4.46-2.29l-2.69 2.7l-.89-.9a1 1 0 0 0-1.42 1.42l1.6 1.6a1 1 0 0 0 1.42 0L15 11a1 1 0 0 0-1.42-1.42Z"
                      />
                    </svg>
                  </div>
                  <div class="col-md-10">
                    <div class="card-body p-0">
                      <h5>100% secure payment</h5>
                      <p class="card-text">
                        Lorem ipsum dolor sit amet, consectetur adipi elit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card mb-3 border-0">
                <div class="row">
                  <div class="col-md-2 text-dark">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M22 5H2a1 1 0 0 0-1 1v4a3 3 0 0 0 2 2.82V22a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-9.18A3 3 0 0 0 23 10V6a1 1 0 0 0-1-1Zm-7 2h2v3a1 1 0 0 1-2 0Zm-4 0h2v3a1 1 0 0 1-2 0ZM7 7h2v3a1 1 0 0 1-2 0Zm-3 4a1 1 0 0 1-1-1V7h2v3a1 1 0 0 1-1 1Zm10 10h-4v-2a2 2 0 0 1 4 0Zm5 0h-3v-2a4 4 0 0 0-8 0v2H5v-8.18a3.17 3.17 0 0 0 1-.6a3 3 0 0 0 4 0a3 3 0 0 0 4 0a3 3 0 0 0 4 0a3.17 3.17 0 0 0 1 .6Zm2-11a1 1 0 0 1-2 0V7h2ZM4.3 3H20a1 1 0 0 0 0-2H4.3a1 1 0 0 0 0 2Z"
                      />
                    </svg>
                  </div>
                  <div class="col-md-10">
                    <div class="card-body p-0">
                      <h5>Quality guarantee</h5>
                      <p class="card-text">
                        Lorem ipsum dolor sit amet, consectetur adipi elit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card mb-3 border-0">
                <div class="row">
                  <div class="col-md-2 text-dark">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12 8.35a3.07 3.07 0 0 0-3.54.53a3 3 0 0 0 0 4.24L11.29 16a1 1 0 0 0 1.42 0l2.83-2.83a3 3 0 0 0 0-4.24A3.07 3.07 0 0 0 12 8.35Zm2.12 3.36L12 13.83l-2.12-2.12a1 1 0 0 1 0-1.42a1 1 0 0 1 1.41 0a1 1 0 0 0 1.42 0a1 1 0 0 1 1.41 0a1 1 0 0 1 0 1.42ZM12 2A10 10 0 0 0 2 12a9.89 9.89 0 0 0 2.26 6.33l-2 2a1 1 0 0 0-.21 1.09A1 1 0 0 0 3 22h9a10 10 0 0 0 0-20Zm0 18H5.41l.93-.93a1 1 0 0 0 0-1.41A8 8 0 1 1 12 20Z"
                      />
                    </svg>
                  </div>
                  <div class="col-md-10">
                    <div class="card-body p-0">
                      <h5>guaranteed savings</h5>
                      <p class="card-text">
                        Lorem ipsum dolor sit amet, consectetur adipi elit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card mb-3 border-0">
                <div class="row">
                  <div class="col-md-2 text-dark">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M18 7h-.35A3.45 3.45 0 0 0 18 5.5a3.49 3.49 0 0 0-6-2.44A3.49 3.49 0 0 0 6 5.5A3.45 3.45 0 0 0 6.35 7H6a3 3 0 0 0-3 3v2a1 1 0 0 0 1 1h1v6a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-6h1a1 1 0 0 0 1-1v-2a3 3 0 0 0-3-3Zm-7 13H8a1 1 0 0 1-1-1v-6h4Zm0-9H5v-1a1 1 0 0 1 1-1h5Zm0-4H9.5A1.5 1.5 0 1 1 11 5.5Zm2-1.5A1.5 1.5 0 1 1 14.5 7H13ZM17 19a1 1 0 0 1-1 1h-3v-7h4Zm2-8h-6V9h5a1 1 0 0 1 1 1Z"
                      />
                    </svg>
                  </div>
                  <div class="col-md-10">
                    <div class="card-body p-0">
                      <h5>Daily offers</h5>
                      <p class="card-text">
                        Lorem ipsum dolor sit amet, consectetur adipi elit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section class="py-5">
        <div class="container-fluid">
          <div class="row row-cols-1 row-cols-sm-3 row-cols-lg-5">
            <div class="col">
              <div class="card mb-3 border-0">
                <div class="row">
                  <div class="col-md-2 text-dark">
                    {/* <!-- Icon --> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M21.5 15a3 3 0 0 0-1.9-2.78l1.87-7a1 1 0 0 0-.18-.87A1 1 0 0 0 20.5 4H6.8l-.33-1.26A1 1 0 0 0 5.5 2h-2v2h1.23l2.48 9.26a1 1 0 0 0 1 .74H18.5a1 1 0 0 1 0 2h-13a1 1 0 0 0 0 2h1.18a3 3 0 1 0 5.64 0h2.36a3 3 0 1 0 5.82 1a2.94 2.94 0 0 0-.4-1.47A3 3 0 0 0 21.5 15Zm-3.91-3H9L7.34 6H19.2ZM9.5 20a1 1 0 1 1 1-1a1 1 0 0 1-1 1Zm8 0a1 1 0 1 1 1-1a1 1 0 0 1-1 1Z"
                      />
                    </svg>
                  </div>
                  <div class="col-md-10">
                    <div class="card-body p-0">
                      <h5>Free Shipping</h5>
                      <p class="card-text">
                        Enjoy free delivery on all clothing orders above ₹999 —
                        straight to your doorstep.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card mb-3 border-0">
                <div class="row">
                  <div class="col-md-2 text-dark">
                    {/* <!-- Icon --> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M19.63 3.65a1 1 0 0 0-.84-.2a8 8 0 0 1-6.22-1.27a1 1 0 0 0-1.14 0a8 8 0 0 1-6.22 1.27a1 1 0 0 0-.84.2a1 1 0 0 0-.37.78v7.45a9 9 0 0 0 3.77 7.33l3.65 2.6a1 1 0 0 0 1.16 0l3.65-2.6A9 9 0 0 0 20 11.88V4.43a1 1 0 0 0-.37-.78ZM18 11.88a7 7 0 0 1-2.93 5.7L12 19.77l-3.07-2.19A7 7 0 0 1 6 11.88v-6.3a10 10 0 0 0 6-1.39a10 10 0 0 0 6 1.39Zm-4.46-2.29l-2.69 2.7l-.89-.9a1 1 0 0 0-1.42 1.42l1.6 1.6a1 1 0 0 0 1.42 0L15 11a1 1 0 0 0-1.42-1.42Z"
                      />
                    </svg>
                  </div>
                  <div class="col-md-10">
                    <div class="card-body p-0">
                      <h5>Secure Payments</h5>
                      <p class="card-text">
                        Your payments are 100% safe with SSL encryption and
                        trusted gateways like Razorpay.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card mb-3 border-0">
                <div class="row">
                  <div class="col-md-2 text-dark">
                    {/* <!-- Icon --> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M22 5H2a1 1 0 0 0-1 1v4a3 3 0 0 0 2 2.82V22a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-9.18A3 3 0 0 0 23 10V6a1 1 0 0 0-1-1Zm-7 2h2v3a1 1 0 0 1-2 0Zm-4 0h2v3a1 1 0 0 1-2 0ZM7 7h2v3a1 1 0 0 1-2 0Zm-3 4a1 1 0 0 1-1-1V7h2v3a1 1 0 0 1-1 1Zm10 10h-4v-2a2 2 0 0 1 4 0Zm5 0h-3v-2a4 4 0 0 0-8 0v2H5v-8.18a3.17 3.17 0 0 0 1-.6a3 3 0 0 0 4 0a3 3 0 0 0 4 0a3 3 0 0 0 4 0a3.17 3.17 0 0 0 1 .6Zm2-11a1 1 0 0 1-2 0V7h2ZM4.3 3H20a1 1 0 0 0 0-2H4.3a1 1 0 0 0 0 2Z"
                      />
                    </svg>
                  </div>
                  <div class="col-md-10">
                    <div class="card-body p-0">
                      <h5>Premium Quality</h5>
                      <p class="card-text">
                        We source top fabrics and ensure every stitch meets
                        high-quality fashion standards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card mb-3 border-0">
                <div class="row">
                  <div class="col-md-2 text-dark">
                    {/* <!-- Icon --> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12 8.35a3.07 3.07 0 0 0-3.54.53a3 3 0 0 0 0 4.24L11.29 16a1 1 0 0 0 1.42 0l2.83-2.83a3 3 0 0 0 0-4.24A3.07 3.07 0 0 0 12 8.35Zm2.12 3.36L12 13.83l-2.12-2.12a1 1 0 0 1 0-1.42a1 1 0 0 1 1.41 0a1 1 0 0 0 1.42 0a1 1 0 0 1 1.41 0a1 1 0 0 1 0 1.42ZM12 2A10 10 0 0 0 2 12a9.89 9.89 0 0 0 2.26 6.33l-2 2a1 1 0 0 0-.21 1.09A1 1 0 0 0 3 22h9a10 10 0 0 0 0-20Zm0 18H5.41l.93-.93a1 1 0 0 0 0-1.41A8 8 0 1 1 12 20Z"
                      />
                    </svg>
                  </div>
                  <div class="col-md-10">
                    <div class="card-body p-0">
                      <h5>Exclusive Discounts</h5>
                      <p class="card-text">
                        Save more with our weekly offers, festival sales, and
                        member-only price drops.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card mb-3 border-0">
                <div class="row">
                  <div class="col-md-2 text-dark">
                    {/* <!-- Icon --> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M18 7h-.35A3.45 3.45 0 0 0 18 5.5a3.49 3.49 0 0 0-6-2.44A3.49 3.49 0 0 0 6 5.5A3.45 3.45 0 0 0 6.35 7H6a3 3 0 0 0-3 3v2a1 1 0 0 0 1 1h1v6a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-6h1a1 1 0 0 0 1-1v-2a3 3 0 0 0-3-3Zm-7 13H8a1 1 0 0 1-1-1v-6h4Zm0-9H5v-1a1 1 0 0 1 1-1h5Zm0-4H9.5A1.5 1.5 0 1 1 11 5.5Zm2-1.5A1.5 1.5 0 1 1 14.5 7H13ZM17 19a1 1 0 0 1-1 1h-3v-7h4Zm2-8h-6V9h5a1 1 0 0 1 1 1Z"
                      />
                    </svg>
                  </div>
                  <div class="col-md-10">
                    <div class="card-body p-0">
                      <h5>New Arrivals Daily</h5>
                      <p class="card-text">
                        Stay on trend — discover fresh fashion drops every day
                        from our latest collections.
                      </p>
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
