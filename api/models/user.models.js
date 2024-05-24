import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    collectionsArray: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Collection",
    },
    profileImage: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_640.png",
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
