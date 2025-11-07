import React, { useContext } from "react";
import { wishlistContext } from "../context/WishlistContextProvider";
import { Link } from "react-router-dom";
function ViewWishlist() {
  const { wishlist, handleRemove } = useContext(wishlistContext);
  console.log(wishlist);
  return (
    <div>
      <div className="container my-4">
        <h2 className="text-center mb-4">💖 My Wishlist</h2>
        {wishlist.products?.length === 0 && (
          <p className="text-center mb-4">Product Not Found !</p>
        )}
        {
          <div className="row">
            {wishlist.products &&
              wishlist.products.map((product) => (
                <div className="col-md-4 mb-4" key={product._id}>
                  <div className="card h-100 shadow-sm">
                    <Link to={`/productDetail/${product._id}`}>
                      <img
                        src={product.pic1}
                        className="card-img-top"
                        alt={product.productname}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    </Link>

                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.productname}</h5>
                      <p className="card-text">Price: ₹{product.mrp}</p>
                      <button
                        className="btn btn-danger mt-auto"
                        onClick={() => handleRemove(product._id)}
                      >
                        ❌ Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        }
      </div>
    </div>
  );
}

export default ViewWishlist;
