import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import { wishlistContext } from "../context/WishlistContextProvider";
import { AuthContext } from "../context/AuthProviderContext";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { addToCartContext } from "../context/AddToCartContextProvider";
function SearchData() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get("q");
  const category = queryParams.get("category");
  const [results, setResults] = useState([]);
  const { addToWishlist } = useContext(wishlistContext);
  const { isLogin } = useContext(AuthContext);
  const { addProductToCart } = useContext(addToCartContext);
  useEffect(() => {
    getData();
  }, [q, category]);
  async function getData() {
    try {
      const res = await fetch(
        `http://localhost:8000/api/products/search?q=${q}&category=${category}`
      );
      const data = await res.json();

      if (data.success) {
        setResults(data.products);
      }
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  }

  return (
    // <>this is search file</>
    <div class="product-grid row row-cols-1 mt-10 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
      {results.map(({ _id, pic1, mrp, productname, netquantity, discount }) => {
        return (
          <div class="col" key={_id}>
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
                <div class="d-flex align-items-center justify-content-between my-2">
                  <button
                    onClick={() => {
                      addProductToCart(_id);
                    }}
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
          </div>
        );
      })}
    </div>
  );
}

export default SearchData;
