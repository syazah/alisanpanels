import { errorHandler } from "../utils/errorHandler.utils.js";
import bcryptjs from "bcryptjs";
import { User, Verification } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
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

//SIGN UP
export const authSignup = async (req, res, next) => {
  const { name, email, number, password } = req.body;
  if (
    !name ||
    !email ||
    !number ||
    !password ||
    name === "" ||
    email === "" ||
    number === "" ||
    password === ""
  ) {
    return next(errorHandler(500, "All Fields Are Required"));
  }
  if (!validator.isEmail(email)) {
    return next(errorHandler(400, "The Email Entered Is Not Correct"));
  }
  if (password.length < 8) {
    return next(errorHandler(400, "The Password must have at least 8 letters"));
  }
  const newNum = Number(number);
  const existEmailNum = await User.findOne({
    $or: [{ email }, { number: newNum }],
  });
  if (existEmailNum) {
    return next(
      errorHandler(400, "Email Or Number Already Exist Kindly Check")
    );
  }
  const hashedPassword = await bcryptjs.hashSync(password, 10);
  const newUser = new User({
    name,
    email,
    number: newNum,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    sendOTP(newUser, res, next);
  } catch (err) {
    next(err);
  }
};
//VERIFY OTP
export const sendOTP = async ({ _id, email }, res, next) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOptions = {
      from: process.env.AUTH_MAIL,
      to: email,
      subject: "Verify Your Email - ALISAN",
      html: `<p>Enter <b>${otp}</b> to verify your email address and continue using the web app, This OTP expires in One Hour `,
    };
    const hashOtp = bcryptjs.hashSync(otp, 10);
    const newOtpVerification = new Verification({
      user: _id,
      otp: hashOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    await newOtpVerification.save();
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      status: "PENDING",
      message: "OTP SENT",
      data: { _id, email, status: 0 },
    });
  } catch (error) {
    next(error);
  }
};
export const verifyOTP = async (req, res, next) => {
  try {
    let { _id, otp } = req.body;
    if (!_id || !otp) {
      return next(errorHandler(400, "Need Complete Details"));
    }
    const otpFound = await Verification.find({ user: _id });
    if (otpFound.length === 0) {
      return next(
        errorHandler(
          400,
          "OTP Not found, The Account MustBe verified Kindly LogIn"
        )
      );
    }
    const { expiresAt } = otpFound[0];
    const hashedotp = otpFound[0].otp;
    if (expiresAt < Date.now()) {
      await Verification.deleteMany({ user: _id });
      return next(errorHandler(400, "Code Expired"));
    }
    const validOtp = await bcryptjs.compareSync(otp, hashedotp);
    if (!validOtp) {
      return next(errorHandler(400, "Entered OTP Is incorrect"));
    }
    await User.updateOne({ _id }, { verified: true });
    await Verification.deleteMany({ user: _id });
    res.json({
      success: true,
      data: {
        status: 1,
      },
    });
  } catch (error) {
    return next(error);
  }
};

//SIGN IN
export const authSignin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(500, "All Fields Are Required"));
  }

  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
      next(errorHandler(404, "User Not Found"));
    }
    const validPassword = bcryptjs.compareSync(password, existUser.password);
    if (!validPassword) {
      next(errorHandler(400, "Incorrect Password"));
    }
    const validUser = await User.findOne({ email })
      .populate("collectionsArray")
      .select("-password");
    const token = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET);
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(validUser);
  } catch (err) {
    next(err);
  }
};

//ADMIN SIGN IN

// //GOOGLE AUTH
// export const authGoogle = async (req, res, next) => {
//   const { email, name, googlePhotoUrl } = req.body;
//   try {
//     const existUser = await User.findOne({ email });
//     if (existUser) {
//       const token = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET);
//       res
//         .status(200)
//         .cookie("access_token", token, { httpOnly: true })
//         .json(existUser);
//     } else {
//       const hashedPassword = await bcryptjs.hashSync("ywugdTsgdv2y", 10);
//       const newUser = new User({
//         name,
//         email,
//         number: 123456789,
//         password: hashedPassword,
//         profileImage: googlePhotoUrl,
//       });
//       await newUser.save();
//       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
//       res
//         .status(200)
//         .cookie("access_token", token, { httpOnly: true })
//         .json(newUser);
//     }
//   } catch (err) {
//     next(err);
//   }
// };
