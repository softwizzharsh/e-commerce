const express = require('express');
const Contact = require('../model/contact');
const router = express.Router();

// 📌 Create new contact message (Public)
router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const newMessage = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    res.json({ msg: "Message saved successfully", data: newMessage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// 📌 Get all messages (Admin)
router.get("/contact", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});



// 📌 Delete message
router.delete("/contact/:id", async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);

    if (!message) return res.status(404).json({ msg: "Message not found" });

    res.json({ msg: "Message deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});



module.exports = router
