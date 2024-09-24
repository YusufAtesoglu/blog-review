const express=require("express");
const router=express.Router();

//Diğer rota dosyalarını içeriye aktarıyoruz
const authRoute = require("./auth.js");

//Her rotayı ilgili yol altında kullanıyoruz

router.use("/users",authRoute);

module.exports=router;