const mongoose = require("mongoose");
// const user = require("./user.model");

//user_cars is the cadr id that was used to conect to the computer when the order was made
const MerageAnaExcelData = new mongoose.Schema(
  {
    // user_card_number: String,

    // order_maker_card_number: String,

    // numPages: { type: Number, default: 1 },
    personalnumber: { type: String, required: true },
    excelDataMerage: [Object],
  },
  { timestamps: true }
);

module.exports = mongoose.model("MerageAnaExcelData", MerageAnaExcelData);
