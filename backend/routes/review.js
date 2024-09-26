const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog.js"); // Blog modelini içe aktarın
const Review = require("../models/Blog.js");
const verifyToken = require("../middleware/authMiddleware.js");
const mongoose = require("mongoose");

// Yorum ekleme api si
router.post("/blogs/:blogId/reviews",verifyToken, async (req, res) => {
  const { blogId } = req.params; // Blog ID'yi route parametresinden al
  const { text, rating, user } = req.body; // userId yerine user alıyoruz

  try {
    // Blog'u ID ile bul
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog bulunamadı." });
    }

    // Yeni yorum (review) oluştur
    const newReview = {
      text,
      rating,
      user:new mongoose.Types.ObjectId(user), // user'ı ObjectId'ye çevir
    };

    // Yorumları blog'a ekle
    blog.reviews.push(newReview);

    // Blog'u kaydet
    await blog.save();

    res.status(201).json({ message: "Yorum başarıyla eklendi.", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Yorum eklenirken bir hata oluştu.", error });
  }
});



  // Belirli bir blog un yorumlarını listeleme getirme (Read - Single)
  router.get("/blogs/:blogId/reviews", async (req, res) => {
    try {
      const blogId = req.params.blogId;
      const blog = await Blog.findById(blogId);
      
      if (!blog) {
        return res.status(404).json({ error: "User not found." });
      }
      res.status(200).json(blog.reviews);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  });

  // Yorum silme endpoint'i
router.delete("/delete/:blogId/reviews/:reviewId",verifyToken, async (req, res) => {
    const { blogId, reviewId } = req.params; // Route parametrelerinden postId ve commentId'yi alıyoruz
  
    try {
      // Post'u bul
      const blog = await Blog.findById(blogId);
  
      if (!blog) {
        return res.status(404).json({ message: "Blog gönderisi bulunamadı." });
      }
  
      // Yorumu bul ve sil
      const commentIndex = blog.reviews.findIndex(
        (review) => review._id.toString() === reviewId
      );
  
      if (commentIndex === -1) {
        return res.status(404).json({ message: "Yorum bulunamadı." });
      }
  
      // Yorumu sil
      blog.reviews.splice(commentIndex, 1);
  
      // Blog'u kaydet
      await blog.save();
  
      res.status(200).json({ message: "Yorum başarıyla silindi." });
    } catch (error) {
      console.error("Yorum silme sırasında hata:", error);
      res.status(500).json({ message: "Yorum silinirken bir hata oluştu.", error });
    }
  });
module.exports = router;
