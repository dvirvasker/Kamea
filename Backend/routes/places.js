/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */

const router = require("express").Router();
const { request } = require("express");
const places = require("../models/places.model");

router.route("/").get((req, res) => {
  places
    .findOne()
    // .sort({ status: 1, createdAt: -1 })
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  //   const user_card_number = req.body.user_card_number;
  //   const numPages = req.body.numPages;
  // try {
  const ZroaYebashaArray = [];
  // ZroaYebashaArray.push(req.body.namezroaYebasha);
  req.body.zroaYebasha.forEach((element) => {
    const ZroaYebashaplace = element;
    console.log(element);
    ZroaYebashaArray.push(ZroaYebashaplace);
  });

  const ZroaYebasha = ZroaYebashaArray;

  const NorthArray = [];
  req.body.north.forEach((element) => {
    const Northplace = element;
    console.log(element);
    NorthArray.push(Northplace);
  });
  const North = NorthArray;

  const CenterArray = [];
  req.body.center.forEach((element) => {
    const Centerplace = element;
    console.log(element);
    CenterArray.push(Centerplace);
  });
  const Center = CenterArray;
  console.log(Center);

  const SouthArray = [];
  req.body.south.forEach((element) => {
    const Southplace = element;
    console.log(element);
    SouthArray.push(Southplace);
  });
  const South = SouthArray;

  const placesVolumes = [];
  placesVolumes.push(ZroaYebasha);
  placesVolumes.push(North);
  placesVolumes.push(Center);
  placesVolumes.push(South);

  const newplaces = new places({
    placesVolumes,
    ZroaYebasha,
    North,
    Center,
    South,
  });
  //   await placess.save();
  //   res.status(201).send(multipleFiles._id);
  // } catch (error) {
  //   res.status(400).send(error.message);
  // }

  // const placesVolumes = req.body.placesVolumes;

  // const newplaces = new places({
  //   // user_card_number,
  //   placesVolumes,
  // });
  const formId = newplaces.save((err, form) => {
    if (err) {
      return res.status(400).json("Error: " + err);
    } else {
      res.send(form.id);
    }
  });
});

router.route("/:id").get((req, res) => {
  places
    .findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").delete((req, res) => {
  places
    .findOneAndDelete()
    .then(() => res.json("placesVolumes deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// router.route("/:hozlaRequestID").get((req, res) => {
//     places.find({ hozlaRequestID: req.params.hozlaRequestID })
//     .exec()
//     .then((request) => res.json(request))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

router.route("/update/:id").post((req, res) => {
  places
    .findById(req.params.id)
    .then((request) => {
      request.user_card_number = req.body.user_card_number;
      request.order_maker_card_number = req.body.order_maker_card_number;

      request.placesVolumes = placesArray;
      request
        .save()
        .then(() => res.json("placesVolumes updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/update").post((req, res) => {
  places
    .findOne()
    .then((request) => {
      const ZroaYebashaArray = [];
      req.body.zroaYebasha.forEach((element) => {
        const ZroaYebashaplace = {
          name: element,
        };
        console.log(element);
        ZroaYebashaArray.push(ZroaYebashaplace);
      });

      const NorthArray = [];
      req.body.north.forEach((element) => {
        const Northplace = {
          name: element,
        };
        console.log(element);
        NorthArray.push(Northplace);
      });

      const CenterArray = [];
      req.body.center.forEach((element) => {
        const Centerplace = {
          name: element,
        };
        console.log(element);
        CenterArray.push(Centerplace);
      });

      // console.log(Center);

      const SouthArray = [];
      req.body.south.forEach((element) => {
        const Southplace = {
          name: element,
        };
        console.log(element);
        SouthArray.push(Southplace);
      });
      const placesVolumes = [];
      placesVolumes.push(ZroaYebashaArray);
      placesVolumes.push(NorthArray);
      placesVolumes.push(CenterArray);
      placesVolumes.push(SouthArray);

      request.placesVolumes = placesVolumes;
      request.ZroaYebasha = ZroaYebashaArray;
      request.North = NorthArray;
      request.Center = CenterArray;
      request.South = SouthArray;

      request.user_card_number = req.body.user_card_number;
      request.order_maker_card_number = req.body.order_maker_card_number;

      request.placesVolumes = req.body.placesVolumes;
      request
        .save()
        .then(() => res.json("placesVolumes updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
