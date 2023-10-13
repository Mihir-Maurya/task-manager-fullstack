const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const jwtSecret = process.env.JWT_SECRET;
dotenv.config();
const registerUser = async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      return response.status(400).json({ massage: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    return response
      .status(200)
      .json({ message: "User registerd successfully" });
  } catch (error) {
    return response.status(500).json({ massage: error.message });
  }
};

const loginUser = async (request, response) => {
  const { email, password } = request.body;
  const isUserExists = await User.findOne({ email });
  if (!isUserExists) {
    return response.status(404).json({ massage: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, isUserExists.password);
  if (!isMatch) {
    return response.status(401).json({ massage: "Password not match" });
  }
  // If the user is found and the password is correct, generate a JWT token
  const payload = {
    user: {
      id: isUserExists.id,
    },
  };

  jwt.sign(
    payload,
    jwtSecret,
    { expiresIn: 3600 }, // Token expires in 1 hour (adjust as needed)
    (err, token) => {
      if (err) {
        return response.status(500).json({ message: "Error generating token" });
      }

      // Send the token as part of the response along with a 200 status code
      response.status(200).json({ token });
    }
  );
};

module.exports = { loginUser, registerUser };
