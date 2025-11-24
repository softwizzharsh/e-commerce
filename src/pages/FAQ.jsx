import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { BACKEND_API } from "../backendApi";
import axios from "axios";
const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  // Fetch FAQ
  const fetchFaqs = async () => {
    try {
      const res = await axios.get(`${BACKEND_API}/api/faq`);
      setFaqs(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load FAQs");
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);
  return (
    <div className="container py-5">
      <h1 className="mb-4 fw-bold text-center">Frequently Asked Questions</h1>
      <p className="text-center text-muted mb-5">
        Find answers to the most common questions about shopping on Lolipop.
      </p>

      <Accordion defaultActiveKey="0" alwaysOpen className="shadow-sm">
        {faqs.map((val, idx) => (
          <Accordion.Item eventKey={idx}>
            <Accordion.Header>
              {idx + 1}. {val.question}
            </Accordion.Header>
            <Accordion.Body>{val.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
