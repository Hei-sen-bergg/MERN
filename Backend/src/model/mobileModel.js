const { default: mongoose } = require("mongoose");

const mobileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Mobile = mongoose.model("Mobile", mobileSchema);

module.exports = Mobile;
