var express = require("express");
var router = express.Router();
const fs = require("fs");

var countryData = require("../data/countries.json");
/* GET users listing. */
router.get("/", function(req, res, next) {
  console.log("countries" + countryData[1]);

  res.render("../views/countries.ejs", countryData);
});

router.post("/addCountry", (req, res) => {
  console.log("it got here");
  for (var key in countryData) {
    if (countryData.hasOwnProperty(key)) {
      var val = countryData[key];
      for (var item in val) {
        if (req.body.id == item) {
          res.status(400).render("../views/idError.ejs", { id: req.body.id });
        } else {
          res.status(200).render("../views/id");
        }
      }
    }
  }
});
router.put("/updateCountry/:id", (req, res) => {
  countryData.findById(req.params.id, (err, country) => {
    if (!country) {
      res.status(404).send("No data found.");
    } else {
      res.render("../views/addCountryResult.ejs");
    }
  });
});
router.delete("/deleteCountry/id", (req, res) => {
  countryData.findById(req.params.id, (err, country) => {
    if (!country) {
      res.status(404).send("No data found.");
    } else {
      res.render("../views/addCountryResult.ejs");
    }
  });
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
  console.log("slashid" + JSON.stringify(countryData.countries[req.params.id]));
  if (countryData.countries[req.params.id] != null) {
    res.render("../views/country.ejs", {
      country: countryData.countries[req.params.id]
    });
  } else {
    res.status(404).render("../views/error.ejs", {
      error: {
        message: "Country with ID '" + req.params.id + "' not found.",
        status: 404
      }
    });
  }
});
module.exports = router;
