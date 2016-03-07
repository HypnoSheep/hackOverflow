var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  displayName: String,
  picture: String,
  github: String,
  ghLogin: String
  // photoUrl: String,
  // created: Date,
  // posts : [{ type: Schema.Types.ObjectId, ref: "Posts"}],
  // answers: [{ type: Schema.Types.ObjectId, ref: "Answers"}]
});

module.exports = mongoose.model("User", UserSchema);
