import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { BACKEND_API } from "../backendApi";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${BACKEND_API}/api/blog/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!blog) return <div className="text-center mt-5 text-danger">Blog not found</div>;

  return (
    <div className="container my-5">
      <div className="card shadow-lg rounded-4 overflow-hidden">
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="card-img-top"
            style={{ objectFit: "cover" }}
          />
        )}

        <div className="card-body p-4">
          <h2 className="card-title fw-bold mb-3">{blog.title}</h2>
          <p className="text-muted mb-3">
            Posted on: {new Date(blog.postOn).toLocaleDateString()}
          </p>
          <p className="card-text fs-5">{blog.description}</p>

          <Link to="/blogs" className="btn btn-outline-primary mt-4">
            ← Back to Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
