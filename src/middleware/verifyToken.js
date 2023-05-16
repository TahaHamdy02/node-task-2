const jwt = require("jsonwebtoken");
//verify token
function verifyToken(req, res, next) {
  const authToken = req.headers.authorization;
  if (authToken) {
    const token = authToken.split(" ")[1];
    try {
      const decodedPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decodedPayload;
      next();
    } catch (error) {
      return res.status(401).json({ message: "invalid token ,access denied" });
    }
  } else {
    return res.status(401).json({ message: "no token provided,access denied" });
  }
}
module.exports = verifyToken;
