const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const path = require("path");
const seedData = require("./seed");
const errorLogger = require("./middlewares/errorLogger");
const logger = require("./utils/logger");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const userRoutes = require("./routes/userRoutes");
const cardRoutes = require("./routes/cardRoutes");

const app = express();
app.use(logger);
const corsOptions = {
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"], //allow cors only for localhost on port 3000
};

app.use(cors(corsOptions));

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

connectDB();

app.use("/users", userRoutes);
app.use("/cards", cardRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "File not found" });
});

app.use(errorLogger);

app.listen(port, () => {
  // seedData(); //generate 3 cards 3 users
  console.log(`Server running on http://localhost:${port}`);
});
