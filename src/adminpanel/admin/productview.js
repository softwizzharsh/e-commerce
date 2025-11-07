import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Productview() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/showProducts")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct([...data.data]);
        } else if (!data.success) {
          console.log("res error " + data.message);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  function deleteProduct(e) {
    const { id } = e.target;
    fetch("http://localhost:8000/api/deleteProduct", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ _id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct([...data.data]);
        }
      })
      .catch((error) => console.log(error));
  }
  
  return (
    <>
      {product.length > 0 ? (
        <>
          <section className="section">
            <div className="container-fluid">
              <div className="card-style mb-30">
                <h6 className="mb-10">Product</h6>
                <div className="table-wrapper table-responsive">
                  {product.map((product) => {
                    return (
                      <div className="card border-3 mb-2 p-2" key={product._id}>
                        <div className="d-flex gap-3">
                          <img src={product.pic1} alt="" width={200} />
                          <img src={product.pic2} alt=""width={200} />
                          <img src={product.pic3} alt=""width={200} />
                          <img src={product.pic4} alt=""width={200} />
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">Name : {product.productname}</h5>
                          <p> <strong>Short Description :</strong>  {product.shortdescription}</p>
                          <p> <strong>long Description :</strong>  {product.longdescription}</p>
                          <div className="d-flex gap-3 justify-content-between ">
                          <div>

                           <p className="card-text">
                            <strong>Main Category:</strong> {product.maincategory.maincategory}
                          </p>
                           <p className="card-text">
                            <strong> Category:</strong> {product.category.title}
                          </p>
                           <p className="card-text">
                            <strong> Subcategory:</strong> {product.subcategory.subcategoryname}
                          </p>
                          <p className="card-text">
                            <strong>Brand:</strong> {product.brand.brandname}
                          </p>
                           <p className="card-text">
                            <strong>Tag:</strong> {product.tag.tagname}
                          </p>
                          <p className="card-text">
                            <strong>Generic Name:</strong> {product.genericname}
                          </p>
                          <p className="card-text">
                            <strong>Manufacturer:</strong>{" "}
                            {product.manufacturer}
                          </p>
                         
                          </div>
                          <div>

                          <p className="card-text">
                            <strong>Item Weight:</strong> {product.itemweight}g
                          </p>
                          <p className="card-text">
                            <strong>Item Dimension:</strong>{" "}
                            {product.itemdimension}
                          </p>
                          <p className="card-text">
                            <strong>Packer:</strong> {product.packer}
                          </p>
                          <p className="card-text">
                            <strong>Size:</strong> {product.size}
                          </p>
                           <p className="card-text">
                            <strong>MRP(Rs.):</strong>  {product.mrp}
                          </p>
                          <p className="card-text">
                            <strong>Discount:</strong> {product.discount}%
                          </p>
                          <p className="card-text">
                            <strong>Net Quantity:</strong> {product.netquantity}
                          </p>
                          </div>
                          <div className="text-end border-2">
                            <button
                            id={product._id}
                            onClick={deleteProduct}
                            className="btn btn-danger my-3"
                          >
                            DeleteProduct
                          </button>
                          <br/>
                          <Link to={`/admin/productUpdate/${product._id}`}>  <button
                            className="btn btn-dark "
                          >
                            update Product
                          </button> </Link>
                          </div>
                          </div>

                          
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="h-100 d-flex align-items-center justify-content-center border">
          <h2> product not found ...!</h2>
        </div>
      )}
    </>
  );
}