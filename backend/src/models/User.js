import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 128,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 128,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
