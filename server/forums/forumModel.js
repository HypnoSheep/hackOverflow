var mongoose = require("mongoose");

var ForumSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Forum", ForumSchema);
