import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatarUrl: String,
  username: { type: String, required: true, unique: true },
  socialOnly: { type: Boolean, default: false },
  password: { type: String },
  email: { type: String, required: true, unique: true },
  location: String,
  comments: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" },
  ],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});
const User = mongoose.model("User", userSchema);

export default User;
