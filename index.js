const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookiePasrser = require("cookie-parser");

dotenv.config();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("DB connected...!");
    // Start the server after the database connection is established
    app.listen(5000, () => {
      console.log('Server running...!');
    });
  })
  .catch((error) => {
    console.error("DB connection error:", error);
  });

app.use(cookiePasrser());

app.use(express.json());
// Routes
app.use("/api/user", authRoutes);



