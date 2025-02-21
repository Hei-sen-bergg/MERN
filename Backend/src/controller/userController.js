

const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = generateToken(newUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,                   //enable in production
      sameSite: "none",
      
    });

    res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};



const logIn = async (req, res, next) => {
  const { email, password } = req.body;

 try {
   const user = await User.findOne({ email });
   if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
   }
   const isPasswordMatch = await user.matchPassword(password);
   if(!isPasswordMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
   }
   const token = generateToken(user._id);
   res.cookie("token", token, {
    httpOnly: true,
    secure: true,                   //enable in production
    sameSite: "none",
   
  });
   res.status(200).json({
    message: "Login successful",
    success: true,
   });
  
 } catch (error) {
  next(error);
 }

}


const getUserProfile = async (req, res, next) => {

try {
  const user = await User.findById(req.userId).select("name email");
  if(!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    message: "User profile fetched successfully",
    success: true,
    data: user,
  });

} catch (error) {
  next(error)
}

}



  module.exports = { signUp, logIn, getUserProfile };







