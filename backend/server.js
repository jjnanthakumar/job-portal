import express, { json } from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import passport from "./lib/passportConfig.js";
import cors from "cors";
import { existsSync, mkdirSync } from "fs";
import routes from './routes/index.js'
// MongoDB
mongoose.connect("mongodb://localhost:27017/jobPortal", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// initialising directories
if (!existsSync("./public")) {
  mkdirSync("./public");
}
if (!existsSync("./public/resume")) {
  mkdirSync("./public/resume");
}
if (!existsSync("./public/profile")) {
  mkdirSync("./public/profile");
}

const app = express();
const port = 4444;

// app.use(bodyparser._json()); // support json encoded bodies
app.use(bodyparser.urlencoded({ extended: true })); // support encoded bodies
// Setting up middlewares
app.use(cors());
app.use(json());
app.use(passport.initialize());

// Routing
app.use("/auth", routes.authRoutes);
app.use("/api", routes.apiRoutes);
app.use("/upload", routes.uploadRoutes);
app.use("/host", routes.downloadRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
