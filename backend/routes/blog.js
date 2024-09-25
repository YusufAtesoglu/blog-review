const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog.js")

// Kullanıcı Oluşturma (Create - Register)
router.post("/newblog", async (req, res) => {
    try {
      const { user, title, text,reviews } = req.body;
    
      const newBlog = await new Blog({
        user,
        title,
        text,
        reviews,
      });
      await newBlog.save();
      res.status(201).json(newBlog);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  });
  module.exports = router;