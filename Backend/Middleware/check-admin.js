const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    console.log(decodedToken);
    if(decodedToken.userRole === 'admin'){
      next();
    } else throw new Error('DEKA')
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};

