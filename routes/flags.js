var express = require("express");
var router = express.Router();
var flagData = require("../data/flags.json");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("../views/flags.ejs", flagData);
});

module.exports = router;
