require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4001;
const cors = require("cors");
const router = require("./Routers/Router");
const errHandling = require("./Middlewares/err_handler");
const URL = process.env.DB_URL;
mongoose
  .connect(URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
console.log("Starting server...");
app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  next();
});
app.use(
  cors({
    origin: "https://sellerkin-keywordvolume-ugah.vercel.app",
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use("https://sellerkin-keywordvolume.vercel.app/api", router);
app.use((err, req, res, next) => {
  err = errHandling(err.status, err.message);
  res.status(err.status).json({ err: err.message, success: false });
});

app.get("/", (req, res) => {
  res.json("hello");
});
app.listen(PORT, () => {
  console.log(`Served on ${PORT}`);
});
