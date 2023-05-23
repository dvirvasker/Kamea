const mongoose = require("mongoose");
// const user = require("./user.model");

//user_cars is the cadr id that was used to conect to the computer when the order was made
const placesSchema = new mongoose.Schema(
  {
    // user_card_number: String,
    numPages: { type: Number, default: 1 },
    // toraHeilitVolumes: { type: Object },
    placesVolumes: [Object],
    ZroaYebasha: [Object],
    North: [Object],
    Center: [Object],
    South: [Object],
    // personalnumber: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("places", placesSchema);
