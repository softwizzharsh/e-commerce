import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_API } from "../../backendApi";
const ViewContact = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${BACKEND_API}/api/contact`);
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      await axios.delete(`${BACKEND_API}/api/contact/${id}`);
      fetchMessages();
    } catch (err) {
      console.log(err);
    }
  };



  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Contact Messages</h2>

      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {messages.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">No messages found</td>
            </tr>
          ) : (
            messages.map((msg) => (
              <tr key={msg._id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.phone}</td>
                <td>{msg.subject}</td>
                <td style={{ maxWidth: "300px" }}>{msg.message}</td>
                <td>
                  

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteMessage(msg._id)}
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
  );
};

export default ViewContact;

