import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UpdateProduct() {
  const productId = useParams().id;
  const [product, setProduct] = useState({
    brand: "",
    discount: "",
    genericname: "",
    itemdimension: "",
    itemweight: "",
    manufacturer: "",
    mrp: "",
    netquantity: "",
    packer: "",
    pic1: "",
    pic2: "",
    pic3: "",
    pic4: "",
    productname: "",
    size: "",
    subcategory: "",
    tag: "",
    description: "",
    shortdescription: "",
    longdescription: "",
    _id: "",
  });  
  // Fetch product on mount
  useEffect(() => {
    async function getProductById(id) {
      try {
        const res = await fetch(
          `http://localhost:8000/api/getProductById/${id}`
        );
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    }

    if (productId) getProductById(productId);
  }, [productId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImagesChange = async (file, key) => {
    
    const cloudName = "dezenfhjm";         
    const uploadPreset = "shopping";   

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    try {
      
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setProduct((prev) => ({ ...prev, [key]: data.secure_url }));
    } catch (error) {
      console.log(error)
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("onUpdate :  " ,  product)
    try {
      const res = await fetch(
        `http://localhost:8000/api/updateProduct/${product._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        }
      );
      const result = await res.json();
      alert("Product updated successfully!");
      console.log(result);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  console.log("first :  " ,  product)


  return (
    <>
      <section className="tab-components">
        <div className="container-fluid">
          <div className="title-wrapper pt-30">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="title">
                  <h2>Update Products</h2>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="form-elements-wrapper">
            <div className="row">
              <div className="col-lg-6">
                <div className="card-style mb-30">
                  <div className="input-style-1">
                    <label>Product Name</label>
                    <input
                      type="text"
                      name="productname"
                      value={product.productname}
                      onChange={handleChange}
                      placeholder="Product Name"
                    />
                  </div>
                </div>

                <div className="card-style mb-30">
                  <div className="select-style-1">
                    <label>Size</label>
                    <div className="select-position">
                      <select
                        name="size"
                        value={product.size}
                        onChange={handleChange}
                      >
                        <option value="">Select Size</option>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </select>
                    </div>
                    <br />
                    <div className="input-style-1">
                      <label>MRP</label>
                      <input
                        type="text"
                        name="mrp"
                        value={product.mrp}
                        onChange={handleChange}
                        placeholder="MRP"
                      />
                    </div>
                    <div className="input-style-1">
                      <label>Discount</label>
                      <input
                        type="text"
                        name="discount"
                        value={product.discount}
                        onChange={handleChange}
                        placeholder="Discount"
                      />
                    </div>
                  </div>
                </div>

                <div className="card-style mb-30">
                  <div className="input-style-1">
                    <label>Item Weight</label>
                    <input
                      type="text"
                      name="itemweight"
                      value={product.itemweight}
                      onChange={handleChange}
                      placeholder="Item Weight"
                    />
                  </div>
                  <div className="input-style-1">
                    <label>Net quantity</label>
                    <input
                      type="text"
                      name="netquantity"
                      value={product.netquantity}
                      onChange={handleChange}
                      placeholder="Net quantity"
                    />
                  </div>
                  <div className="input-style-1">
                    <label>Item Dimensions</label>
                    <input
                      type="text"
                      name="itemdimension"
                      value={product.itemdimension}
                      onChange={handleChange}
                      placeholder="Item Dimensions"
                    />
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="col-lg-6">
                <div className="card-style mb-30">
                  <h6 className="mb-25">Description</h6>
                  <div className="input-style-1">
                    <label>Short Description</label>
                    <textarea
                      name="shortdescription"
                      value={product.shortdescription || ""}
                      onChange={handleChange}
                      placeholder="Short description"
                      rows="5"
                    ></textarea>
                  </div>

                  <div className="input-style-1">
                    <label> Long Description</label>
                    <textarea
                      name="longdescription"
                      value={product.longdescription || ""}
                      onChange={handleChange}
                      placeholder="Description"
                      rows="5"
                    ></textarea>
                  </div>

                  <div className="input-style-1">
                    <label>Generic Name</label>
                    <input
                      type="text"
                      name="genericname"
                      value={product.genericname}
                      onChange={handleChange}
                      placeholder="Generic Name"
                    />
                  </div>

                  <div className="input-style-1">
                    <label>Manufacturer</label>
                    <input
                      type="text"
                      name="manufacturer"
                      value={product.manufacturer}
                      onChange={handleChange}
                      placeholder="Manufacturer"
                    />
                  </div>

                  <div className="input-style-1">
                    <label>Packer</label>
                    <input
                      type="text"
                      name="packer"
                      value={product.packer}
                      onChange={handleChange}
                      placeholder="Packer"
                    />
                  </div>
                </div>
                <div className="card-style mb-30">
                  <h6 className="mb-25">Pictures</h6>

                  <div className="input-style-1">
                    <label>Picture 1</label>
                    <input
                      type="file"
                      onChange={(e) => handleImagesChange(e.target.files[0], "pic1")}
                    />
                  </div>

                  <div className="input-style-1">
                    <label>Picture 2</label>
                    <input
                      type="file"
                      onChange={(e) => handleImagesChange(e.target.files[0], "pic2")}
                    />
                  </div>

                  <div className="input-style-1">
                    <label>Picture 3</label>
                    <input
                      type="file"
                      onChange={(e) => handleImagesChange(e.target.files[0], "pic3")}
                    />
                  </div>

                  <div className="input-style-1">
                    <label>Picture 4</label>
                    <input
                      type="file"
                      onChange={(e) => handleImagesChange(e.target.files[0], "pic4")}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card-style mb-30">
              <ul className="buttons-group">
                <li>
                  <button
                    type="submit"
                    className="main-btn active-btn-outline square-btn btn-hover form-control"
                  >
                    Submit
                  </button>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default UpdateProduct;
