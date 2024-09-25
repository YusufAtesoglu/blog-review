const jwt = require('jsonwebtoken');

// JWT doğrulama middleware'i
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // "Bearer <token>" şeklinde alınır

  if (!token) {
    return res.status(403).json({ error: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);  // Token doğrulaması
    req.user = verified;  // Doğrulanmış kullanıcıyı isteğe ekle
    next();  // Sonraki middleware ya da route'a geç
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = verifyToken;
 