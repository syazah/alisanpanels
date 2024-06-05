import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import panelRouter from "./routes/panel.routes.js";
import adminRouter from "./routes/admin.routes.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import path from "path";
const __dirname = path.resolve();
//INITIAL CONFIGURATIONS
dotenv.config();
const app = express();
cloudinary.config({
  cloud_name: "azhmad",
  api_key: "859757362296148",
  api_secret: "AmJhNTKPQhobkkbJRI5jNAN9rvc",
});

//UTIL MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

//ROUTES
app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", panelRouter);
app.use("/api/v1", adminRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});
//ERROR HANDLE
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

//SERVER AND DB
const port = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Database Is Connected And Server is listening on ${port}`);
    });
  })
  .catch((err) => console.log(err));
