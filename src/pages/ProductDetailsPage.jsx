import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SimilarProducts from "../components/SimilarProducts";
import { addToCartContext } from "../context/AddToCartContextProvider";
import { wishlistContext } from "../context/WishlistContextProvider";
import { useNavigate } from "react-router-dom";
const ProductDetailsPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [product, setProducts] = useState({});
  const { id } = useParams();
  const { addProductToCart } = useContext(addToCartContext);
  const { addToWishlist } = useContext(wishlistContext);
  const navigate = useNavigate();
  useEffect(() => {
    let getProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/productDetail/${id}`
        );
        if (res.data.data == null) {
          alert("product id not match ! ");
          navigate("/");
        } else {
          setProducts(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (id.length == 24) {
      getProduct();
    }else{
       navigate("/");
    }
    window.scrollTo(0, 0);
  }, [id]);

  const images = [product.pic1, product.pic2, product.pic3, product.pic4];
  const discountedPrice = Math.round(
    product.mrp * (1 - product.discount / 100)
  );
  const savings = product.mrp - discountedPrice;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleImageChange = (index) => {
    setSelectedImage(index);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const styles = `
    <style>
      @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
      @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
      @import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');
      
      :root {
        --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        --success-gradient: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        --warning-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        --bg-gradient: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      }

      .fade-in-up {
        animation: fadeInUp 0.8s ease-out;
      }

      .fade-in-left {
        animation: fadeInLeft 1s ease-out;
      }

      .fade-in-right {
        animation: fadeInRight 1s ease-out;
      }

      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes fadeInLeft {
        from { opacity: 0; transform: translateX(-30px); }
        to { opacity: 1; transform: translateX(0); }
      }

      @keyframes fadeInRight {
        from { opacity: 0; transform: translateX(30px); }
        to { opacity: 1; transform: translateX(0); }
      }

      .product-image-container {
        position: relative;
        overflow: hidden;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        transition: transform 0.3s ease;
        background: white;
      }

      .product-image-container:hover {
        transform: scale(1.02);
      }

      .product-image {
        width: 100%;
        height: 500px;
        object-fit: cover;
        transition: transform 0.5s ease;
      }

      .product-image-container:hover .product-image {
        transform: scale(1.05);
      }

      .popular-tag {
        position: absolute;
        top: 15px;
        left: 15px;
        background: var(--warning-gradient);
        color: white;
        padding: 8px 16px;
        border-radius: 25px;
        font-size: 0.875rem;
        font-weight: bold;
        animation: pulse 2s infinite;
        z-index: 2;
      }

      .nav-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255,255,255,0.9);
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 2;
        cursor: pointer;
      }

      .product-image-container:hover .nav-arrow {
        opacity: 1;
      }

      .nav-arrow.left { left: 15px; }
      .nav-arrow.right { right: 15px; }

      .thumbnail {
        width: 80px;
        height: 80px;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid transparent;
        object-fit: cover;
      }

      .thumbnail.active {
        border-color: #0d6efd;
        transform: scale(1.1);
      }

      .thumbnail:hover {
        border-color: #6c757d;
      }

      .price-card {
        background: linear-gradient(135deg, #e8f5e8 0%, #e3f2fd 100%);
        border-radius: 20px;
        padding: 2rem;
        border: none;
      }

      .discount-badge {
        background: var(--success-gradient);
        animation: bounce 2s infinite;
      }

      .btn-primary-gradient {
        background: var(--primary-gradient);
        border: none;
        border-radius: 15px;
        padding: 15px 30px;
        font-weight: bold;
        transition: all 0.3s ease;
        color: white;
      }

      .btn-primary-gradient:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        color: white;
      }

      .feature-card {
        background: white;
        border-radius: 15px;
        padding: 1rem;
        text-align: center;
        border: none;
        box-shadow: 0 5px 15px rgba(0,0,0,0.08);
        transition: transform 0.3s ease;
        height: 100%;
      }

      .feature-card:hover {
        transform: translateY(-5px);
      }

      .detail-card {
        background: white;
        border-radius: 20px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.08);
        border: none;
        transition: all 0.3s ease;
      }

      .detail-card:hover {
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      }

      .quantity-control {
        border: 1px solid #dee2e6;
        border-radius: 10px;
        overflow: hidden;
        display: inline-flex;
      }

      .quantity-btn {
        border: none;
        background: white;
        padding: 10px 15px;
        transition: background-color 0.3s ease;
        cursor: pointer;
      }

      .quantity-btn:hover {
        background: #f8f9fa;
      }

      .quantity-display {
        padding: 10px 20px;
        border-left: 1px solid #dee2e6;
        border-right: 1px solid #dee2e6;
        background: white;
        min-width: 60px;
        text-align: center;
      }

      .wishlist-btn {
        transition: all 0.3s ease;
      }

      .wishlist-btn.active {
        background: #ffe6e6 !important;
        color: #dc3545 !important;
        border-color: #dc3545 !important;
      }

      .star-rating {
        color: #ffc107;
      }

      @media (max-width: 768px) {
        .product-image { height: 300px; }
        .thumbnail { width: 60px; height: 60px; }
      }
    </style>
  `;

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: styles }} />
      <div
        style={{ background: "var(--bg-gradient)", minHeight: "100vh" }}
        className="pb-5"
      >
        {/* Navigation Breadcrumb */}
        <div
          className={`bg-white shadow-sm border-bottom ${
            isVisible ? "fade-in-up" : ""
          }`}
        >
          <div className="container py-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <a href="#" className="text-decoration-none text-muted">
                    Home
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#" className="text-decoration-none text-muted">
                    {product.maincategory?.maincategory}
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#" className="text-decoration-none text-muted">
                    {product.category?.title}
                  </a>
                </li>
                <li
                  className="breadcrumb-item active text-dark fw-medium"
                  aria-current="page"
                >
                  {product.productname}
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container my-5">
          <div className="row g-5">
            {/* Image Gallery Section */}
            <div className={`col-lg-6 ${isVisible ? "fade-in-left" : ""}`}>
              <div className="sticky-top" style={{ top: "2rem" }}>
                {/* Main Product Image */}
                <div className="product-image-container mb-4">
                  <img
                    src={images[selectedImage]}
                    // src=""
                    alt={product.productname}
                    className="product-image"
                  />
                  <div className="popular-tag">
                    <i className="fas fa-fire me-1"></i>
                    {product.tag?.tagname}
                  </div>
                  <button className="nav-arrow left" onClick={prevImage}>
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button className="nav-arrow right" onClick={nextImage}>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>

                {/* Thumbnail Gallery */}
                <div className="d-flex gap-3 justify-content-center">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      className={`thumbnail ${
                        selectedImage === index ? "active" : ""
                      }`}
                      onClick={() => handleImageChange(index)}
                      alt={`${product.productname} ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className={`col-lg-6 ${isVisible ? "fade-in-right" : ""}`}>
              {/* Brand and Title */}
              <div className="mb-4">
                <div className="d-flex align-items-center mb-2">
                  <span className="text-primary fw-bold fs-5 me-3">
                    {product.brand?.brandname}
                  </span>
                  <div className="d-flex align-items-center">
                    <div className="star-rating me-2">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                    <span className="text-muted small">(4.8/5)</span>
                  </div>
                </div>
                <h1 className="display-5 fw-bold text-dark mb-2">
                  {product.productname}
                </h1>
                <p className="text-muted fs-5">{product.shortdescription}</p>
              </div>

              {/* Pricing */}
              <div className="price-card mb-4">
                <div className="d-flex align-items-baseline mb-2">
                  <span className="display-4 fw-bold text-dark me-3">
                    ₹{discountedPrice}
                  </span>
                  <span className="fs-4 text-muted text-decoration-line-through me-3">
                    ₹{product.mrp}
                  </span>
                  <span className="badge discount-badge px-3 py-2 rounded-pill text-white">
                    {product.discount}% OFF
                  </span>
                </div>
                <p className="text-success fw-medium mb-0">
                  You save ₹{savings}!
                </p>
              </div>

              {/* Categories */}
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <div className="card detail-card p-3">
                    <div className="small text-muted mb-1">Category</div>
                    <div className="fw-semibold">
                      {product.category?.title} -{" "}
                      {product.subcategory?.subcategoryname}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card detail-card p-3">
                    <div className="small text-muted mb-1">For</div>
                    <div className="fw-semibold">
                      {product.maincategory?.maincategory}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <span className="fw-medium me-3">Quantity:</span>
                  <div className="quantity-control">
                    <button
                      className="quantity-btn"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <div className="quantity-display">{quantity}</div>
                    <button
                      className="quantity-btn"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-3 mb-4">
                  <button
                    className="btn btn-primary-gradient flex-fill"
                    onClick={() => {
                      addProductToCart(product._id, quantity);
                    }}
                  >
                    <i className="fas fa-shopping-cart me-2"></i>Add to Cart
                  </button>
                  <button
                    className={`btn btn-outline-secondary ${
                      isWishlisted ? "wishlist-btn active" : "wishlist-btn"
                    }`}
                    onClick={() => {
                      addToWishlist(product._id);
                      setIsWishlisted(!isWishlisted);
                    }}
                  >
                    <i
                      className={`${isWishlisted ? "fas" : "far"} fa-heart`}
                    ></i>
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="card detail-card p-4 mb-4">
                <h5 className="fw-semibold mb-3">Why Choose This Product?</h5>
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="feature-card text-success">
                      <i className="fas fa-truck fs-4 mb-2"></i>
                      <div className="small fw-medium">Free Delivery</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="feature-card text-info">
                      <i className="fas fa-shield-alt fs-4 mb-2"></i>
                      <div className="small fw-medium">2 Year Warranty</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="feature-card text-warning">
                      <i className="fas fa-undo fs-4 mb-2"></i>
                      <div className="small fw-medium">Easy Returns</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="card detail-card p-4 mb-4">
                <h5 className="fw-semibold mb-3">Product Details</h5>
                <div className="table-responsive">
                  <table className="table table-borderless">
                    <tbody>
                      <tr className="border-bottom">
                        <td className="text-muted py-2">Generic Name:</td>
                        <td className="fw-medium py-2">
                          {product.genericname}
                        </td>
                      </tr>
                      <tr className="border-bottom">
                        <td className="text-muted py-2">Manufacturer:</td>
                        <td className="fw-medium py-2">
                          {product.manufacturer}
                        </td>
                      </tr>
                      <tr className="border-bottom">
                        <td className="text-muted py-2">Weight:</td>
                        <td className="fw-medium py-2">{product.itemweight}</td>
                      </tr>
                      <tr className="border-bottom">
                        <td className="text-muted py-2">Dimensions:</td>
                        <td className="fw-medium py-2">
                          {product.itemdimension}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-muted py-2">Quantity:</td>
                        <td className="fw-medium py-2">
                          {product.netquantity}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Description */}
              <div className="card detail-card p-4">
                <h5 className="fw-semibold mb-3">Description</h5>
                <p className="text-muted lh-lg mb-0">
                  {product.longdescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <SimilarProducts
          subCategory={product.subcategory?._id}
        ></SimilarProducts>
      </div>
    </>
  );
};

export default ProductDetailsPage;
