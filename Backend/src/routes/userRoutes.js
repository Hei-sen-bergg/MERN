// const express = require("express");
// const router = express.Router();
// const { signUp, logIn, getUserProfile, logout } = require("../controller/userController");
// const authMiddleware = require("../middleware/authMiddleware");

// // Sign-Up Route
// router.post("/register", signUp);

// // Log-In Route
// router.post("/login", logIn);

// // Profile Route (protected)
// router.get("/profile", authMiddleware, getUserProfile); // Protect this route with authMiddleware

// router.post("/logout", logout)

// module.exports = router;


const express = require("express");
const router = express.Router();
const {signUp, logIn, getUserProfile, logout} = require("../controller/userController")
const authMiddleware = require("../middleware/authMiddleware");


router.post("/register", signUp)
router.post("/login", logIn)
router.get("/profile", authMiddleware, getUserProfile)

module.exports = router