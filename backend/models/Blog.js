const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
  text: { type: String, required: true },
  rating: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required:true},
});

const BlogSchema = mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId,ref:"User", required:true },
      title: { type: String, required: true },
      text: { type: String, required: true },
      reviews:[ReviewSchema],
    },
    { timestamps: true }
  );
  const Blog = mongoose.model("Blog", BlogSchema);

  module.exports = Blog;