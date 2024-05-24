import cloudinary from "cloudinary";
import { User } from "../models/user.models.js";
import { getDataUri } from "../utils/features.utils.js";
import jwt from "jsonwebtoken";

export const signOutUser = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ success: true, message: "User Signed Out" });
  } catch (err) {
    next(err);
  }
};

export const changeProfileImage = async (req, res, next) => {
  try {
    const { access_token } = req.cookies;
    const { id } = await jwt.verify(access_token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: id }).select("-password");
    const file = getDataUri(req.file);
    const url = await cloudinary.uploader.upload(file.content);
    user.profileImage = url.url;
    await user.save();
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
