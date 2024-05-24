import express from "express";
import {
  changeProfileImage,
  signOutUser,
} from "../controllers/user.controllers.js";
import { singleUpload } from "../utils/multer.utils.js";
const router = express.Router();

router.post("/signout", signOutUser);
router.post("/profileimage", singleUpload, changeProfileImage);

export default router;
