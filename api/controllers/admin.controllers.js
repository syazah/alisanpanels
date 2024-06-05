import { User } from "../models/user.models.js";
import { errorHandler } from "../utils/errorHandler.utils.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { PanelData } from "../models/panel.models.js";
dotenv.config();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.AUTH_MAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export const adminGetAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({});
    if (!allUsers) {
      return next(errorHandler(400, "No User Found"));
    }
    res.status(200).json({ success: true, data: allUsers });
  } catch (error) {
    next(error);
  }
};

export const adminSendEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const mailOptions = {
      from: process.env.AUTH_MAIL,
      to: email,
      subject: "Registration Completed - ALISAN",
      html: `<p>Hello,<p><br><p>You would be happy to hear that your registration at alisan is completed</p><br><p>Your Email Id : ${email}</p><br><p>Your Password : ${password}</p>`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Mail Sent" });
  } catch (error) {
    next(error);
  }
};

export const userDetailsController = async (req, res, next) => {
  try {
    const { id } = req.body;
    const existUser = await User.findOne({ _id: id })
      .select("-password")
      .populate({
        path: "collectionsArray",
      });

    const recentPanels = await PanelData.find({ author: id });
    if (!existUser) {
      return next(errorHandler(404, "User Not Found"));
    }
    res
      .status(200)
      .json({ success: true, data: existUser, panels: recentPanels });
  } catch (error) {
    next(error);
  }
};
