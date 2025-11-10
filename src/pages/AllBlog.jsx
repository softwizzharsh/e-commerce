import React from "react";
import { AuthContext } from "../context/AuthProviderContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
function AllBlog() {
  const { blogs } = useContext(AuthContext);
  return (
    <section id="latest-blog" class="py-5">
      <div class="container-fluid">
        <div class="row">
          <div class="section-header d-flex align-items-center justify-content-between my-5">
            <h2 class="section-title">Our Recent Blog</h2>
            <div class="btn-wrap align-right">
              <a href="#" class="d-flex align-items-center nav-link">
                 All Articles{" "}
                <svg width="24" height="24">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="row">
          {blogs.map((blog) => {
            return (
              <div class="col-md-4">
                <article class="post-item card border-0 shadow-sm p-3">
                  <div class="image-holder zoom-effect">
                    <Link to={`/blog/${blog._id}`} >
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
                        <Link to={`/blog/${blog._id}`} class="text-decoration-none">
                          {blog.title}
                        </Link>
                      </h3>
                      <p>{blog.description}</p>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AllBlog;
