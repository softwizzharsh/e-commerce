import React, { useEffect, useState, useContext } from "react";
import { Search, Filter, Star, ShoppingCart, Heart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { wishlistContext } from "../context/WishlistContextProvider";
import { AuthContext } from "../context/AuthProviderContext";
import BACKEND_API from "../backendApi"

const Product = ({categoryId, isName}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const { addToWishlist } = useContext(wishlistContext);
  const { isLogin } = useContext(AuthContext);
  const [meta, setMeta] = useState({});
  useEffect(() => {
    async function byMainCategory(findCategory) {
      console.log(findCategory)
      try {
        const res = await axios.get(
          `${BACKEND_API}/getCategoryByMainCategory/${findCategory}?limit=${limit}&page=${page}`
        );
        setCategories(res.data.categories);
        setProducts(res.data.product);
        setBrands(res.data.brand);
        setSubCategories(res.data.subCategories);
        setMeta(res.data.meta);
      } catch (error) {
        console.log(error);
      }
    }
    
     async function bySubCategories() {
      try {
        const res = await axios.get(
          `${BACKEND_API}/bysubCategories/${categoryId}`
        );
        if (res.data.isFind){  
          byMainCategory(res.data.data.maincategory)
          setSelectedSubCategory(categoryId)
          setSelectedCategory(res.data.data.category)
        }
      } catch (error) {
        console.log(error);
        alert(" data not Found !")
      }
    }

    async function byBrand() {
      try {
        const res = await axios.get(
          `${BACKEND_API}/bybrand/${categoryId}`
        );
        console.log(res.data)
        if (res.data.isFind){  
          console.log(res.data.data._id)
          byMainCategory(res.data.data.maincategory._id)
          setSelectedBrand(categoryId)
          setSelectedCategory(res.data.data._id)
        }
      } catch (error) {
        console.log(error);
      }
    }
   if (isName ==="mainCategory") byMainCategory(categoryId);
   if (isName ==="subCategory")bySubCategories() 
   if (isName === "brand")byBrand()
  }, [categoryId ,page]);

  const sortedProducts = products.filter((product) => {
    if (selectedCategory !== "all" && product.category !== selectedCategory)
      return false;
    if (selectedBrand !== "" && product.brand !== selectedBrand) return false;
    if (
      selectedSubCategory !== "" &&
      product.subcategory !== selectedSubCategory
    )
      return false;
    if (product.mrp < priceRange[0] || product.mrp > priceRange[1])
      return false;
    if (
      searchQuery &&
      !product.productname.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const sortedBrand = brands.filter((brand) => {
    if (brand.category?._id === selectedCategory) {
      return true;
    }
    return false;
  });

  const sortSubCategories = subCategories.filter((subCategory) => {
    if (subCategory.category === selectedCategory) {
      return true;
    }
    return false;
  });

  const ProductCard = ({ product }) => (
    <div className="col-lg-4 col-md-6 mb-4">
      <div
        className="card h-100 shadow-lg border-0 position-relative overflow-hidden"
        style={{ borderRadius: "20px", transition: "all 0.3s ease" }}
        >
      <Link to={`/productDetail/${product._id}`}>
        <div className="position-relative overflow-hidden">
          <img
            src={product.pic1}
            alt={product.productname}
            className="card-img-top"
            style={{
              height: "250px",
              objectFit: "cover",
              transition: "transform 0.5s ease",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            />
          {
            <span
              className={`position-absolute top-0 start-0 m-3 badge bg-dark text-white px-3 py-2`}
              style={{
                borderRadius: "20px",
                fontSize: "0.7rem",
                fontWeight: "600",
              }}
            >
              - {product.discount}%
            </span>
          }

          <div
            className="position-absolute top-0 end-0 m-3 d-flex flex-column gap-2"
            style={{ opacity: 0, transition: "opacity 0.3s ease" }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = 1)}
            onMouseOut={(e) => (e.currentTarget.style.opacity = 0)}
          >
            <button
              className="btn btn-light btn-sm rounded-circle p-2 shadow"
              onClick={() => {
                isLogin
                  ? addToWishlist(product._id)
                  : alert(" plz login your Account !");
              }}
            >
              <Heart size={16} />
            </button>
            <button className="btn btn-light btn-sm rounded-circle p-2 shadow">
              <Eye size={16} />
            </button>
          </div>
        </div>
          </Link>
       

        <div className="card-body p-4">
          <h5
            className="card-title mb-3"
            style={{ color: "#1a1a1a", fontWeight: "600" }}
          >
            {product.productname}
            {/* <small className="text-muted">({product.brand?.brandname})</small> */}
          </h5>
          <div className="d-flex align-items-center justify-content-between ">
            <div className="d-flex align-items-center">
              <span className="h4 mb-0 me-2 text-dark fw-bold">
                ₹
                {product.mrp -
                  (product.mrp * (product.discount / 100)).toFixed(2)}
              </span>
              {product.mrp && (
                <span className="text-muted text-decoration-line-through">
                  ₹{product.mrp}
                </span>
              )}
            </div>
          </div>
          {product.mrp && (
            <span
              className="badge bg-light text-danger px-2 py-1 mb-3"
              style={{ borderRadius: "15px", fontSize: "0.7rem" }}
            >
              Save ₹{(product.mrp * (product.discount / 100)).toFixed(2)}
            </span>
          )}

          <button
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
  );

  return (
    <>
      <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
        {/* Header */}
        <div className="bg-white shadow-sm border-bottom">
          <div className="container py-4">
            <div className="row align-items-center mb-4">
              <div className="col-lg-6">
                <h1 className="display-4 fw-bold text-dark mb-0">
                  Our Products
                </h1>
                <p className="text-muted mb-0">
                  Discover amazing products at great prices
                </p>
              </div>
              <div className="col-lg-6">
                <div className="position-relative">
                  <Search
                    className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="form-control ps-5 py-3 border-2 shadow-sm"
                    style={{ borderRadius: "15px" }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <p className="text-muted mb-0">
                Showing {sortedProducts.length} of {meta?.count} products
              </p>
            </div>
          </div>
        </div>

        <div className="container py-4">
          <div className="row">
            {/* Left Sidebar - Categories */}
            <div className="col-lg-3 mb-4">
              <div
                className="bg-white rounded-4 shadow-lg p-4 sticky-top"
                style={{ top: "2rem" }}
              >
                {/* Categories */}
                <div className="mb-4">
                  <h6 className="fw-semibold text-dark mb-3">Categories</h6>
                  <div className="d-flex flex-column gap-2">
                    <label
                      className={`d-flex  align-items-center justify-content-between px-3 py-1 rounded-3 cursor-pointer ${
                        selectedCategory === "all"
                          ? "bg-primary text-white"
                          : "bg-color"
                      }`}
                      style={{
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <input
                          type="radio"
                          name="category"
                          value={"all"}
                          checked={selectedCategory === "all"}
                          onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setSelectedBrand("");
                            setSelectedSubCategory("");
                          }}
                          className="form-check-input me-3"
                        />
                        <span className="small fw-medium">{"All"}</span>
                      </div>
                      <span
                        className={`badge px-2 py-1 ${
                          selectedCategory === "all"
                            ? "bg-secondary text-primary"
                            : "bg-secondary"
                        }`}
                        style={{ borderRadius: "12px", fontSize: "0.7rem" }}
                      >
                        {products.length}
                      </span>
                    </label>
                    {categories.map((category) => (
                      <label
                        key={category._id}
                        className={`d-flex align-items-center justify-content-between px-3 py-1 rounded-3 cursor-pointer ${
                          selectedCategory === category._id
                            ? "bg-primary text-white"
                            : "bg-secondary"
                        }`}
                        style={{
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <input
                            type="radio"
                            name="category"
                            value={category._id}
                            checked={selectedCategory === category._id}
                            onChange={(e) => {
                              setSelectedCategory(e.target.value);
                              setSelectedBrand("");
                              setSelectedSubCategory("");
                            }}
                            className="form-check-input me-3"
                          />
                          <span className="small fw-medium">
                            {category.title}
                          </span>
                        </div>
                        <span
                          className={`badge px-2 py-1 ${
                            selectedCategory === category._id
                              ? "bg-light text-primary"
                              : "bg-secondary"
                          }`}
                          style={{ borderRadius: "12px", fontSize: "0.7rem" }}
                        >
                          {sortedProducts.length}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* BRAND LIST  */}
                {sortedBrand.length > 0 && (
                  <div className="mb-4">
                    <h6 className="fw-semibold text-dark mb-3">Brand</h6>
                    <div className="d-flex flex-column gap-2">
                      {sortedBrand.map((brand) => (
                        <label
                          key={brand._id}
                          className={`d-flex align-items-center justify-content-between px-3 p-1 rounded-3 cursor-pointer ${
                            selectedBrand === brand._id
                              ? "bg-primary text-white"
                              : "bg-secondary"
                          }`}
                          style={{
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                          }}
                        >
                          <div className="d-flex align-items-center">
                            <input
                              type="radio"
                              name="brand"
                              value={brand._id}
                              checked={selectedBrand == brand._id}
                              onChange={(e) => setSelectedBrand(e.target.value)}
                              className="form-check-input me-3"
                            />
                            <span className="small fw-medium">
                              {brand.brandname}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* SUBCATEGORY  LIST  */}

                {sortSubCategories.length > 0 && (
                  <div className="mb-4">
                    <h6 className="fw-semibold text-dark mb-3">Sub Category</h6>
                    <div className="d-flex flex-column gap-2">
                      {sortSubCategories.map((subCategory) => (
                        <label
                          key={subCategory._id}
                          className={`d-flex align-items-center justify-content-between px-3 p-1 rounded-3 cursor-pointer ${
                            selectedSubCategory === subCategory._id
                              ? "bg-primary text-white"
                              : "bg-secondary"
                          }`}
                          style={{
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                          }}
                        >
                          <div className="d-flex align-items-center">
                            <input
                              type="radio"
                              name=""
                              value={subCategory._id}
                              checked={selectedSubCategory == subCategory._id}
                              onChange={(e) =>
                                setSelectedSubCategory(e.target.value)
                              }
                              className="form-check-input me-3"
                            />
                            <span className="small fw-medium">
                              {subCategory.subcategoryname}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                {/* Price Range */}
                <div>
                  <h6 className="fw-semibold text-dark mb-3">Price Range</h6>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between text-muted small mb-2">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="form-range"
                    />
                  </div>

                  <div className="row g-2">
                    <div className="col-6">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([
                            parseInt(e.target.value) || 0,
                            priceRange[1],
                          ])
                        }
                        style={{ borderRadius: "8px" }}
                      />
                    </div>
                    <div className="col-6">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            parseInt(e.target.value) || priceRange[1],
                          ])
                        }
                        style={{ borderRadius: "8px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Products */}
            <div className="col-lg-9">
              {sortedProducts.length === 0 ? (
                <div className="text-center py-5">
                  <div className="bg-white rounded-4 shadow-lg p-5">
                    <h3 className="text-muted mb-3">No products found</h3>
                    <p className="text-muted">
                      Try adjusting your filters or search query
                    </p>
                  </div>
                </div>
              ) : (
                <div className="row">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                  <div className="text-center">
                    {new Array(meta.totalPage).fill(" ").map((val, idx) => {
                      return (
                        <button
                          className="btn  text-white fw-semibold  shadow"
                          style={{
                            background:
                              "linear-gradient(135deg, #007bff, #6f42c1)",
                            borderRadius: "50%",
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
                          onClick={()=>{setPage(idx+1)}}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
