require("dotenv").config();
const express = require("express");
const app = express();

const mobileRoutes = require("./src/routes/mobileRoutes");
const userRoutes = require("./src/routes/userRoutes");
const connectDB = require("./config/db");
const errorHandler = require("./src/error/errorHandling");
const cookieParser = require("cookie-parser");
const cors = require('cors');



const PORT = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true,
}));

app.use("/users", userRoutes);
app.use("/mobiles", mobileRoutes);

app.use(errorHandler);
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
