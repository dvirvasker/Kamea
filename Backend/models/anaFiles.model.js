const mongoose = require("mongoose");
// const user = require("./user.model");

//user_cars is the cadr id that was used to conect to the computer when the order was made
const AnaFilesSchema = new mongoose.Schema(
  {
    numOfCopyies: Number,

    rangeOfDates: String,
    dataFile: [Object],
    fileName: { type: String, default: "" },

    files_id: { type: String, default: "" },

    status: { type: Number, default: 25 },

    clientNote: { type: String, default: "" },
    personalnumber: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AnaFiles", AnaFilesSchema);
