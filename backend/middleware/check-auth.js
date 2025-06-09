const jwt = require('jsonwebtoken');
const HttpError = require("../models/http-errors");

module.exports = (req, res, next) => {
    if(req.method === "OPTIONS") return next() ;
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization : 'Bearer Token'
    if (!token) {
      throw new Error("papa ki pari toh mai hu hi");
    }
    const decodedToken = jwt.verify(token , "supersecret_dont_share" );
    req.userData = {userId : decodedToken.userId};
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed", 403);
    return next(error);
  }
};
