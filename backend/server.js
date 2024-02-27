require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./routes/userRoute.js");

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("Connected to MONGODB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.get("/", (req, res) => {
  res.send("NoBS");
});

app.use("/api/route", route);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
