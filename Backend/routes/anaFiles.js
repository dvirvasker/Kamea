/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
const router = require("express").Router();
const AnaFiles = require("../models/anaFiles.model");
const { upload } = require("../helpers/filehelper");
const MultipleFile = require("../models/fileuploader/multipleFile");
// const referenceId = 1;

router.route("/").get((req, res) => {
  AnaFiles.find()
    .sort({ status: 1, createdAt: -1 })
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/activeRequests").get((req, res) => {
  AnaFiles.find({ status: { $lte: 100 } })
    .sort({ createdAt: -1 })
    .exec()
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/archivedRequests").get((req, res) => {
  AnaFiles.find({ status: { $gte: 125 } })
    .sort({ createdAt: -1 })
    .exec()
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const typeRequest = req.body.typeRequest;
  const user_card_number = req.body.user_card_number;
  const numOfCopyies = Number(req.body.numOfCopyies);
  const files_id = req.body.files_id;
  const status = req.body.status;
  const personalnumber = req.body.personalnumber;
  const clientNote = String(req.body.clientNote);
  const rangeOfDates = req.body.rangeOfDates;
  const fileName = req.body.fileName;

  // const dataFile = req.body.dataFile;

  const excelDataArray = [];
  console.log(req.body.excelDataMerage);
  req.body.dataFile.forEach((element) => {
    const excelData = {
      ["היסטוריית אירועים"]: element["היסטוריית אירועים"],
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

  const dataFile = excelDataArray;

  const newAnaFiles = new AnaFiles({
    rangeOfDates,
    dataFile,
    user_card_number,
    numOfCopyies,
    files_id,
    status,
    personalnumber,
    clientNote,
    fileName,
  });

  const formId = newAnaFiles.save((err, form) => {
    if (err) {
      return res.status(400).json("Error: " + err);
    } else {
      res.send(form.id);
    }
  });
});

router.route("/requestByPersonalnumber/:personalnumber").get((req, res) => {
  // console.log(req.body);
  // console.log(req.params);
  const personalnumber = req.params.personalnumber;
  // const personalnumber = "7654321";
  AnaFiles.find({ personalnumber: personalnumber })
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  AnaFiles.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getExcelData/:formid").get((req, res) => {
  // console.log(req);
  let excelData = "";
  let rangeOfDates = "";
  let createdAt = "";
  // let amountOfAlertsNum = 1;

  AnaFiles.findById(req.params.formid)
    .then((request) => {
      // res.json(JSON.stringify(request.dataFile));
      excelData = request.dataFile;
      rangeOfDates = request.rangeOfDates;
      createdAt = request.createdAt;
      // console.log(request.dataFile);
      // console.log(request.rangeOfDates);
      // request.dataFile.forEach((element) => {
      //   amountOfAlertsNum += 1;
      // });
    })
    .then(() => res.json({ createdAt, excelData, rangeOfDates }))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/deleteUploadFile/:id").delete((req, res) => {
  AnaFiles.findByIdAndDelete(req.params.id)
    .then(() => res.json("AnaFiles deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  AnaFiles.findById(req.params.id)
    .then((request) => {
      request.user_card_number = req.body.user_card_number;
      request.numOfCopyies = Number(req.body.numOfCopyies);
      request.files_id = req.body.files_id;
      request.clientNote = String(req.body.clientNote);
      request.status = req.body.status;
      request.personalnumber = req.body.personalnumber;
      request.rangeOfDates = req.body.rangeOfDates;
      // request.dataFile = req.body.dataFile;
      request.fileName = req.body.fileName;

      const excelDataArray = [];
      console.log(req.body.excelDataMerage);
      req.body.dataFile.forEach((element) => {
        const excelData = {
          ["היסטוריית אירועים"]: element["היסטוריית אירועים"],
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

      request.dataFile = excelDataArray;

      request
        .save()
        .then(() => res.json("AnaFiles updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/updateNameReciver/:id").post((req, res) => {
  AnaFiles.findById(req.params.id)
    .then((request) => {
      request.fullNameReciver = req.body.fullNameReciver;
      request
        .save()
        .then(() => res.json("AnaFiles updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/updateNumVolume/:id").post((req, res) => {
  AnaFiles.findById(req.params.id)
    .then((request) => {
      request.toraHeilitVolumes = req.body.toraHeilitVolumes;
      request
        .save()
        .then(() => res.json("AnaFiles updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/sameRequest/:id").get((req, res) => {
  const getDaysDiff = (dateToCheck) => {
    const day = new Date().getDate();
    const mounth = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const currentDate = Date.parse(`${year}-${mounth}-${day}`);

    // console.log(dateToCheck);
    // console.log(`${year}-${mounth}-${day}`);
    // console.log(currentDate);
    // console.log(Date.parse(dateToCheck));
    const diff =
      Math.abs(currentDate - Date.parse(dateToCheck)) / (1000 * 3600 * 24);
    // console.log(diff);
    return diff;
  };
  // let message = "";
  // var unit = "";
  AnaFiles.findById(req.params.id)
    .then((request) => {
      const unitName = request.unit;
      const dataToraHeilit = request.toraHeilitVolumes;
      const day = request.workGivenDate.getDate();
      const mounth = request.workGivenDate.getMonth() + 1;
      const year = request.workGivenDate.getFullYear();
      const dateSent = Date.parse(`${year}-${mounth}-${day}`);

      let message = false;
      // console.log(unitName);
      // console.log(dataToraHeilit);
      AnaFiles.find({ unit: unitName, toraHeilitVolumes: dataToraHeilit })
        .then((requestData) => {
          requestData.map((tora) => {
            const day = tora.workGivenDate.getDate();
            const mounth = tora.workGivenDate.getMonth() + 1;
            const year = tora.workGivenDate.getFullYear();
            const dateTora = Date.parse(`${year}-${mounth}-${day}`);
            const diff =
              Math.abs(dateSent - Date.parse(tora.workGivenDate)) /
              (1000 * 3600 * 24);
            if (
              // tora.toraHeilitVolumes === dataToraHeilit &&
              tora.id !== req.params.id &&
              dateTora <= dateSent &&
              diff <= 365
            ) {
              console.log("Same Data");
              console.log(diff);
              // unit = tora.unit;
              message = true;
            }
          });
          console.log(dateSent);

          {
            message === true
              ? res.json({ message: "בקשה זו כבר נשלחה בשנה האחרונה" })
              : res.json({ message: "" });
          }
          // console.log(`received: ${received}`);
          // console.log(`inprint: ${inprint}`);
          // console.log(`ended: ${ended}`);
          // console.log(`readyForTakeIn: ${readyForTakeIn}`);
          // console.log(`archive: ${archive}`);
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/statusUpdate/:id").post((req, res) => {
  // console.groupCollapsed(`handleStatusChange -------- Axios.then`);
  // console.log(req.params.id);

  AnaFiles.findById(req.params.id)
    .then((request) => {
      // console.log(request.status);
      request.status = Number(req.body.status);
      // console.log(request.status);
      // console.log(req.body.status);
      // if (req.body.status >= 125) {
      //   request.files_id = "";
      // }
      request
        .save()
        .then(() => res.json("AnaFiles status updated!"))
        .catch((err) => {
          // console.log(err);

          res.status(400).json("Error: " + err);
        });
    })
    .catch((err) => res.status(400).json("Error: " + err));
  console.groupEnd();
});

// router.route("/deleteUploadFile/:id").delete((req, res) => {

// });

module.exports = router;
