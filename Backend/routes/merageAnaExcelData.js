/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
const router = require("express").Router();
const AnaExcelData = require("../models/merageAnaExcelData.model");

router.route("/").get((req, res) => {
  AnaExcelData.findOne()
    .sort({ status: 1, createdAt: -1 })
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const numPages = req.body.numPages;
  const personalnumber = req.body.personalnumber;

  const excelDataArray = [];
  req.body.excelDataMerage.forEach((element) => {
    const excelData = {
      __EMPTY: element.__EMPTY,
      __EMPTY_1: element.__EMPTY_1,
      __EMPTY_2: element.__EMPTY_2,
      __EMPTY_3: element.__EMPTY_3,
      __EMPTY_4: element.__EMPTY_4,
      __EMPTY_5: element.__EMPTY_5,
      __EMPTY_6: element.__EMPTY_6,
      __EMPTY_7: element.__EMPTY_7,
      __EMPTY_8: element.__EMPTY_8,
      __EMPTY_9: element.__EMPTY_9,
      __EMPTY_10: element.__EMPTY_10,
      __EMPTY_11: element.__EMPTY_11,
      __EMPTY_12: element.__EMPTY_12,
    };
    excelDataArray.push(excelData);
  });

  const excelDataMerage = excelDataArray;

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

router.route("/getDataMergeFiles").get((req, res) => {
  AnaExcelData.find()
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/updateMerage").post((req, res) => {
  AnaExcelData.findOneAndUpdate()
    .then((request) => {
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
      // request.excelDataMerage = req.body.excelDataMerage;
      request.numPages = req.body.numPages;

      const excelDataArray = [];
      // console.log(req.body.excelDataMerage);
      req.body.excelDataMerage.forEach((element) => {
        const excelData = {
          __EMPTY: element.__EMPTY,
          __EMPTY_1: element.__EMPTY_1,
          __EMPTY_2: element.__EMPTY_2,
          __EMPTY_3: element.__EMPTY_3,
          __EMPTY_4: element.__EMPTY_4,
          __EMPTY_5: element.__EMPTY_5,
          __EMPTY_6: element.__EMPTY_6,
          __EMPTY_7: element.__EMPTY_7,
          __EMPTY_8: element.__EMPTY_8,
          __EMPTY_9: element.__EMPTY_9,
          __EMPTY_10: element.__EMPTY_10,
          __EMPTY_11: element.__EMPTY_11,
          __EMPTY_12: element.__EMPTY_12,
        };
        excelDataArray.push(excelData);
      });

      request.excelDataMerage = excelDataArray;

      request
        .save()
        .then(() => res.json("excelDataMerage updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
