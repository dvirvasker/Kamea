/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
const router = require("express").Router();
const AnaExcelData = require("../models/merageAnaExcelData.model");

router.route("/").get((req, res) => {
  AnaExcelData.find()
    .sort({ status: 1, createdAt: -1 })
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  console.log(req.body);
  const numPages = req.body.numPages;
  const personalnumber = req.body.personalnumber;
  const excelDataMerage = req.body.excelDataMerage;

  const newAnaExcelData = new AnaExcelData({
    numPages,
    personalnumber,
    excelDataMerage,
  });

  const formId = newAnaExcelData.save((err, form) => {
    if (err) {
      return res.status(400).json("Error: " + err);
    } else {
      res.send(form.id);
    }
  });
});

router.route("/requestBy/:personalnumber").get((req, res) => {
  // console.log(req.body);
  // console.log(req.params);
  const personalnumber = req.params.personalnumber;
  // const personalnumber = "7654321";
  AnaExcelData.findOne({ personalnumber: personalnumber })
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/updateMerage/:personalnumber").post((req, res) => {
  console.log(req.body);
  const personalnumber = req.params.personalnumber;
  AnaExcelData.find({ personalnumber: personalnumber })
    .then((request) => {
      //   request.user_card_number = req.body.user_card_number;
      //   request.numPages = req.body.numPages;
      request.excelDataMerage = req.body.excelDataMerage;
      request.numPages = req.body.numPages;
      request
        .save()
        .then(() => res.json("excelDataMerage updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  AnaExcelData.findById(req.params.id)
    .then((request) => {
      request.user_card_number = req.body.user_card_number;
      //   request.numPages = req.body.numPages;
      request.excelDataMerage = req.body.excelDataMerage;
      request.numPages = req.body.numPages;
      request
        .save()
        .then(() => res.json("excelDataMerage updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
