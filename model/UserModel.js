const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: false }, 
  lastName: { type: String, required: false }, 
  address: { type: String, required: false }, 
  state: { type: String, required: false }, 
  city: { type: String, required: false }, 
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);