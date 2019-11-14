var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Contact = require("../models/contact");

// var countryData = require("../data/countries.json");
/* GET users listing. */
router.get("/", function(req, res, next) {
  // console.log("countries" + countryData[1]);
  var contactsMap = {};

  Contact.find({}, (err, contacts) => {
    contacts.forEach(contact => {
      contactsMap[contact.id] = contact;
    });
    // res.send(contactsMap);
    var contactArray = [];

    for (var i in contactsMap) {
      contactArray.push([i, JSON.stringify(contactsMap[i][0])]);
    }

    console.log({ contacts: contactArray });
    res.render("../views/contacts.ejs", { contacts: contactArray });
  });

  // res.render("../views/countries.ejs", countryMap);
});

router.post("/addContact", (req, res) => {
  console.log("it got here");
  const contact = new Contact({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
    friendGroups: req.body.friendGroups
  });
  contact
    .save()
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));

  res.status(201).json({
    message: "Adding contact..."
  });
  // for (var key in countryData) {
  //   if (countryData.hasOwnProperty(key)) {
  //     var val = countryData[key];
  //     for (var item in val) {
  //       if (req.body.id == item) {
  //         res.status(400).render("../views/idError.ejs", { id: req.body.id });
  //       } else {
  //         res.status(200).render("../views/id");
  //       }
  //     }
  //   }
  // }
});
router.put("/updateContact/:id", (req, res) => {
  // countryData.findById(req.params.id, (err, country) => {
  //   if (!country) {
  //     res.status(404).send("No data found.");
  //   } else {
  //     res.render("../views/addCountryResult.ejs");
  //   }
  // });
});
router.delete("/deleteContact/:id", (req, res) => {
  Contact.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      res.send("Error in deleting").status(500);
    } else {
      res.send("Succesfully deleted").status(204);
    }
  });
  // res.status(200);

  // countryData.findById(req.params.id, (err, country) => {
  //   if (!country) {
  //     res.status(404).send("No data found.");
  //   } else {
  //     res.render("../views/addCountryResult.ejs");
  //   }
  // });
});

// res.render();
//     //just have error handling, check if ID exists, no need to do file stuff, fake it out

//   fs.readFile("../data/countries.json", function(err, data) {
//     var json = JSON.parse(data);
//     json.push(req.body);
//     fs.writeFile("results.json", JSON.stringify(json));
//   });
// });

router.get("/:id", (req, res) => {
  var contactsMap = {};
  Contact.find({ _id: req.params.id }, (err, contacts) => {
    console.log(req.params.id);
    contacts.forEach(contact => {
      contactsMap[contact.id] = contact;
    });
    res.send(contactsMap);
  });

  // console.log("slashid" + JSON.stringify(countryData.countries[req.params.id]));
  // if (countryData.countries[req.params.id] != null) {
  //   res.render("../views/country.ejs", {
  //     country: countryData.countries[req.params.id]
  //   });
  // } else {
  //   res.status(404).render("../views/error.ejs", {
  //     error: {
  //       message: "Country with ID '" + req.params.id + "' not found.",
  //       status: 404
  //     }
  //   });
  // }
});
module.exports = router;
