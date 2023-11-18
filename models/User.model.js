const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = model("User", userSchema);

module.exports = User;
