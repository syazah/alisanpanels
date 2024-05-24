import { errorHandler } from "../utils/errorHandler.utils.js";
import bcryptjs from "bcryptjs";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

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
    next(errorHandler(500, "All Fields Are Required"));
  }
  const hashedPassword = await bcryptjs.hashSync(password, 10);
  const newNum = Number(number);
  const newUser = new User({
    name,
    email,
    number: newNum,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.json({ success: true, message: "Sign Up Successful" });
  } catch (err) {
    next(err);
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
