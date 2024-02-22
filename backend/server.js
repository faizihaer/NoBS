require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const goalRoutes = require('./routes/goalRoutes');

const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
})
  .then(() => {
    console.log("Were in the MIX");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

  app.get('/', (req, res) => {
    res.send('NoBS');
  });

app.use('/api/goals', goalRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
