import express from "express";
import {
  adminGetAllUsers,
  adminSendEmail,
  userDetailsController,
} from "../controllers/admin.controllers.js";

const routes = express.Router();

routes.get("/view-users", adminGetAllUsers);
routes.post("/send-email", adminSendEmail);
routes.post("/user-details", userDetailsController);

export default routes;
