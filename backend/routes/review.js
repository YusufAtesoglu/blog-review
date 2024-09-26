const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog"); // Blog modelini içe aktarın
const mongoose = require("mongoose");

// Yorum ekleme endpoint'i
router.post("/blogs/:blogId/reviews", async (req, res) => {
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

module.exports = router;
