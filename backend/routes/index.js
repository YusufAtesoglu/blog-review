const express=require("express");
const router=express.Router();


//Diğer rota dosyalarını içeriye aktarıyoruz
const authRoute = require("./auth.js");
const blogRoute=require("./blog.js")
const reviewRoute=require("./review.js")
//Her rotayı ilgili yol altında kullanıyoruz
router.use("/users",authRoute);
router.use("/blog",blogRoute);
router.use("/review",reviewRoute);

module.exports=router;