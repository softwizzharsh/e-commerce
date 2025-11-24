import React, { useState } from "react";
import axios from "axios";
import { BACKEND_API } from "../backendApi";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${BACKEND_API}/api/contact`,
        formData
      );

      alert("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again.");
    }
  };
  return (
    <div>
      {/* <!-- Single Page Header start --> */}
      {/* <div class="container-fluid page-header py-5">
        <h1
          class="text-center text-white display-6 wow fadeInUp"
          data-wow-delay="0.1s"
        >
          Contact Us
        </h1>
        <ol
          class="breadcrumb justify-content-center mb-0 wow fadeInUp"
          data-wow-delay="0.3s"
        >
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item">
            <Link to="/">Pages</Link>
          </li>
          <li class="breadcrumb-item active text-white">Contact</li>
        </ol>
      </div> */}
      {/* <!-- Single Page Header End --> */}
      <>
        {/* Contact Section */}
        <div className="container-fluid contact py-5">
          <div className="container py-5">
            <div className="p-5 bg-light rounded">
              <div className="row g-4">
                {/* Header */}
                <div
                  className="col-12 text-center mx-auto"
                  style={{ maxWidth: "900px" }}
                >
                  <h4 className="text-primary border-bottom border-primary border-2 d-inline-block pb-2">
                    Get in touch
                  </h4>
                  <p className="mb-5 fs-5 text-dark">
                    We are here for you! How can we help?
                  </p>
                </div>

                {/* Form */}
                <div className="col-lg-7">
                  <h5 className="text-primary">Let’s Connect</h5>
                  <h1 className="display-5 mb-4">Send Your Message</h1>

                  <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                      <div className="col-lg-12 col-xl-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                          />
                          <label htmlFor="name">Your Name</label>
                        </div>
                      </div>

                      <div className="col-lg-12 col-xl-6">
                        <div className="form-floating">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                          />
                          <label htmlFor="email">Your Email</label>
                        </div>
                      </div>

                      <div className="col-lg-12 col-xl-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Your Phone"
                          />
                          <label htmlFor="phone">Your Phone</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Subject"
                          />
                          <label htmlFor="subject">Subject</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            id="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Message"
                            style={{ height: "160px" }}
                          />
                          <label htmlFor="message">Message</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <button
                          className="btn btn-primary w-100 py-3"
                          type="submit"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Map */}
                <div className="col-lg-5">
                  <iframe
                    className="rounded w-100"
                    style={{ height: "100%" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1694259649153!5m2!1sen!2sbd"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d90940.68091200692!2d74.87628449870093!3d30.208892742455287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39173297173abbcd%3A0xa00033c0a58a5ac8!2sBathinda%2C%20Punjab!5e1!3m2!1sen!2sin!4v1763531934094!5m2!1sen!2sin"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default ContactPage;
