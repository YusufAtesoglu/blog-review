const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog.js")
const verifyToken = require("../middleware/authMiddleware.js");

// Kullanıcı Oluşturma (Create - Register)
router.post("/newblog",verifyToken, async (req, res) => {
    try {
      const { user, title, text,reviews } = req.body;
    
      const newBlog = await new Blog({
        user,
        title,
        text,
        reviews,
      });
      await newBlog.save();
      res.status(201).json({
        message: "You have access to this protected route!",
        user: req.user  // JWT'den doğrulanan kullanıcı bilgileri burada
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  });

  // Tüm blogları getirme (Read - All)
router.get("/allblog", async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.status(200).json(blogs);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  });
  // Belirli bir blog getirme (Read - Single)
router.get("/:blogId", async (req, res) => {
    try {
      const blogId = req.params.blogId;
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return res.status(404).json({ error: "User not found." });
      }
      res.status(200).json(blog);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  });

  // Blog güncelleme API'si
router.put("/edit/:id", verifyToken, async (req, res) => {
    try {
      const blogId = req.params.id;
      const { title, text } = req.body;
  
      // Güncellenmek istenen blogu bul
      const blog = await Blog.findById(blogId);
  
      // Eğer blog bulunamazsa hata döndür
      if (!blog) {
        return res.status(404).json({ message: "Blog not found." });
      }
  
      // Blogun sahibi mi kontrol et
      if (blog.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "You are not allowed to edit this blog." });
      }
  
      // Blog sahibiyse güncelleme işlemi yap
      blog.title = title || blog.title;
      blog.text = text || blog.text;
  
      await blog.save();  // Blogu kaydet
      res.status(200).json({ message: "Blog updated successfully.", blog });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  });


// Blog silme API'si
router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
      const blogId = req.params.id;
  
      // Silinmek istenen blogu bul
      const blog = await Blog.findById(blogId);
  
      // Eğer blog bulunamazsa hata döndür
      if (!blog) {
        return res.status(404).json({ message: "Blog not found." });
      }
  
      // Blogun sahibi mi kontrol et
      if (blog.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "You are not allowed to delete this blog." });
      }
  
      // Blog sahibiyse silme işlemi yap
      await Blog.findByIdAndDelete(blogId);  // Blogu sil
      res.status(200).json({ message: "Blog deleted successfully." });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  });
  

  module.exports = router;