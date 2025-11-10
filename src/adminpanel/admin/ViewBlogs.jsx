import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { BACKEND_API } from "../../backendApi";

const ViewBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [editBlog, setEditBlog] = useState(null); // for update modal
  const [form, setForm] = useState({
    title: "",
    description: "",
    postOn: "",
    image: null,
  });

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${BACKEND_API}/api/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    await axios.delete(`${BACKEND_API}/api/blogs/${id}`);
    fetchBlogs();
  };

  // Open edit modal
  const openEdit = (blog) => {
    setEditBlog(blog);
    setForm({
      title: blog.title,
      description: blog.description,
      postOn: blog.postOn.slice(0, 10),
      image: null,
    });
  };

  // Handle update form change
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
          setForm({ ...form, image: data.url });
        });
    } else setForm({ ...form, [name]: value });
  };

  // Update blog
  const handleUpdate = async (e) => {
    await axios.put(`${BACKEND_API}/api/blogs/${editBlog._id}`, form);
    setEditBlog(null);
    fetchBlogs();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center fw-bold">All Blogs</h2>

      <div className="row">
        {blogs.map((blog) => (
          <div className="col-md-4 mb-4" key={blog._id}>
            <div className="card shadow-sm rounded-4">
              <img
                src={blog.image}
                alt={blog.title}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">{blog.title}</h5>
                <p className="card-text">
                  {blog.description.substring(0, 100)}...
                </p>
                <small className="text-muted">
                  Post On: {new Date(blog.postOn).toLocaleDateString()}
                </small>
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-sm btn-warning fw-bold"
                    onClick={() => openEdit(blog)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger fw-bold"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {editBlog && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content p-3 rounded-3">
              <h5 className="fw-bold mb-3">Edit Blog</h5>
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  className="form-control mb-2"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Title"
                  required
                />
                <textarea
                  className="form-control mb-2"
                  name="description"
                  rows="3"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description"
                  required
                ></textarea>
                <input
                  type="date"
                  className="form-control mb-2"
                  name="postOn"
                  value={form.postOn}
                  onChange={handleChange}
                  required
                />
                <input
                  type="file"
                  className="form-control mb-3"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                />
                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditBlog(null)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBlogs;
