const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
  name: { type: String, required: true },
  email : {type: String, required: true},
  address : {type: String},
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
