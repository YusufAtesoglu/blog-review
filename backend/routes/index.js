const express=require("express");
const router=express.Router();


//Diğer rota dosyalarını içeriye aktarıyoruz
const authRoute = require("./auth.js");
const blogRoute=require("./blog.js")

//Her rotayı ilgili yol altında kullanıyoruz
router.use("/users",authRoute);
router.use("/blog",blogRoute);

module.exports=router;