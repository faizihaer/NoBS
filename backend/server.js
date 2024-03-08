require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/userRoute.js");
const emailRouter = require("./routes/email");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.get("/", (req, res) => {
  res.send("NoBS");
});

app.use("/api/user", userRoute);
app.use("/api/email", emailRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});