import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { BACKEND_API } from "../../backendApi";
const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    postOn: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "shopping");
      data.append("cloud_name", "dezenfhjm");
      fetch("https://api.cloudinary.com/v1_1/dezenfhjm/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setFormData({ ...formData, image: data.url });
        })
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_API}/api/blogs`, formData,);
      alert("Blog added successfully!");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to add blog");
    }
    
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 rounded-4">
        <h2 className="text-center mb-4">Add New Blog</h2>
        <form onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div className="mb-3">
            <label className="form-label fw-bold">Image</label>
            <input
              type="file"
              className="form-control"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>
          {/* Title */}
          <div className="mb-3">
            <label className="form-label fw-bold">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label fw-bold">Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write your blog content here..."
              required
            ></textarea>
          </div>

          {/* Post On */}
          <div className="mb-3">
            <label className="form-label fw-bold">Post On</label>
            <input
              type="date"
              className="form-control"
              name="postOn"
              value={formData.postOn}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
