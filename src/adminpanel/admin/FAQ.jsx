import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_API } from "../../backendApi";
// const BACKEND_API = "http://localhost:5000/api/faq";

const FaqAdmin = () => {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch FAQ
  const fetchFaqs = async () => {
    try {
      const res = await axios.get(`${BACKEND_API}/api/faq`);
      setFaqs(res.data);
    } catch (error) {
        console.log(error);
        
      setMessage("Failed to load FAQs");
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  // Add or Update FAQ
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim() || !answer.trim()) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      if (editingId) {
        // Update FAQ
        await axios.put(`${BACKEND_API}/api/faq/${editingId}`, { question, answer });
        setMessage("FAQ Updated Successfully");
      } else {
        // Add FAQ
        await axios.post(`${BACKEND_API}/api/faq`, { question, answer });
        setMessage("FAQ Added Successfully");
      }

      setQuestion("");
      setAnswer("");
      setEditingId(null);
      fetchFaqs();

    } catch (error) {
      setMessage("Error saving FAQ");
    }
  };

  // Delete FAQ
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;

    try {
      await axios.delete(`${BACKEND_API}/api/faq/${id}`);
      setMessage("FAQ Deleted Successfully");
      fetchFaqs();
    } catch (error) {
      setMessage("Failed to delete FAQ");
    }
  };

  // Edit FAQ
  const handleEdit = (faq) => {
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setEditingId(faq._id);
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center mb-4">FAQ Management</h2>

      {message && (
        <div className="alert alert-info text-center">{message}</div>
      )}

      {/* Form */}
      <div className="card p-4 shadow mb-5">
        <h4 className="mb-3">{editingId ? "Edit FAQ" : "Add FAQ"}</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Question</label>
            <input
              type="text"
              className="form-control"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter question"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Answer</label>
            <textarea
              className="form-control"
              rows="3"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter answer"
            ></textarea>
          </div>

          <button className="btn btn-primary w-100">
            {editingId ? "Update FAQ" : "Add FAQ"}
          </button>
        </form>
      </div>

      {/* FAQ Table */}
      <div className="card p-4 shadow">
        <h4 className="fw-bold mb-3">All FAQs</h4>

        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Answer</th>
              <th width="200px">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-3">
                  No FAQs Found
                </td>
              </tr>
            ) : (
              faqs.map((faq, index) => (
                <tr key={faq._id}>
                  <td>{index + 1}</td>
                  <td>{faq.question}</td>
                  <td>{faq.answer}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(faq)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(faq._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FaqAdmin;
