"use strict";

const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const courseAPI = require("./Routes/course");
const cors = require("cors");
dotenv.config();

const phoneNumberRegex =
  /(?:(\+7)[ -])?\(?(?<firstpart>[489]d{2})\)?[ -]?(?<secondpart>d{3})[ -]?(?<thirdpart>d{2})[ -]?(?<fourthpart>d{2})/gm;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
// API
app.use("/api/courses", courseAPI);
const port = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/courses").then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
