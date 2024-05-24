import express from "express";
import { authSignin, authSignup } from "../controllers/auth.controllers.js";
const router = express.Router();

router.post("/signup", authSignup);
router.post("/signin", authSignin);
// router.post("/google-auth", authGoogle);

export default router;
