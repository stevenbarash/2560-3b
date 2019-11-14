const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  phone: String,
  email: String,
  friendGroups: Object
});
module.exports = mongoose.model("Contact", contactSchema);
