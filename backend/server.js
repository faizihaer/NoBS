require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/userRoute.js");
const userRouteByEmail = require("./routes/userRouteByEmail.js");
const groupRoute = require("./routes/groupRoute.js");
const taskRoute = require("./routes/taskRoute.js");
const emailRouter = require("./routes/email");
const userTaskRoute = require("./routes/userTaskRoute.js");
const checkBoxRoute = require("./routes/checkBoxRoute.js");


const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
//connect to mongodb, has error catches as well
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("Connected to MongoDB....");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.get("/", (req, res) => {
  res.send("NoBS");
});

app.use("/api/user", userRoute);
app.use("/api/task", taskRoute);
app.use("/api/byemail", userRouteByEmail);
app.use("/api/email", emailRouter);
app.use("/api/group", groupRoute);
app.use("/api/userTaskRoute", userTaskRoute);
app.use("/api/checkBoxRoute", checkBoxRoute );

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
