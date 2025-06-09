const express = require("express");
const { check } = require("express-validator");

const userControllers = require("../controllers/users-controllers");
const fileUpload = require('../middleware/file-upload');

const routers = express.Router();

routers.get("/", userControllers.getUsers);

routers.post(
  "/signup",
  fileUpload.single('image') ,
  [
    check("name").not().isEmpty(),
    check("email")
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  userControllers.signup
);

routers.post("/login", userControllers.login);

module.exports = routers;
