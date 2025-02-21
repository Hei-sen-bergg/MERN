const Mobile = require("../model/mobileModel");

const getAllMobiles = async (req, res) => {
  try {
    const mobiles = await Mobile.find();
    res.status(200).json({
      message: "Mobiles fetched successfully",
      success: true,
      data: mobiles,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMobileById = async (req, res) => {
  try {
    const mobile = await Mobile.findById(req.params.id);
    res.status(200).json({
      message: "Mobile fetched successfully",
      success: true,
      data: mobile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMobile = async (req, res, next) => {
  const { name, year, price } = req.body;

  try {
    if (!name || !year || !price) {
      const error = new Error();
      error.statusCode = 400;
      error.message = "All fields needed";
      return next(error);
    }

    const newMobile = new Mobile({ name, year, price });
    await newMobile.save();
    res.status(201).json(newMobile);
  } catch (error) {
    next(error);
  }
};

const updateMobile = async (req, res, next) => {
  const { name, year, price } = req.body;
  try {
    const updatedMobile = await Mobile.findByIdAndUpdate(
      req.params.id,
      { name, year, price },
      { new: true }
    );

    if (!updatedMobile)
      return res.status(404).json({ message: "Mobile not found" });
    res.status(200).json({
      message: "Mobile updated successfully",
      success: true,
      data: updatedMobile,
    });
  } catch (error) {
    next(error);
  }
};

const searchMobile = async (req, res) => {
  const { name, year } = req.query;

  let query = {};

  if (name) query.name = { $regex: name, $options: "i" };
  if (year) query.year = parseInt(year);

  try {
    const result = await Mobile.find(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMobile = async (req, res) => {
  try {
    const deletedMobile = await Mobile.findByIdAndDelete(req.params.id);
    if (!deletedMobile)
      return res.status(404).json({ message: "Mobile not found" });
    res.status(200).json({
      message: "Mobile deleted successfully",
      success: true,
      data: deletedMobile,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete mobile" });
  }
};

module.exports = {
  getAllMobiles,
  getMobileById,
  createMobile,
  updateMobile,
  deleteMobile,
  searchMobile,
};
