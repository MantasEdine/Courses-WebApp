const mongoose = require("mongoose");
const schema = mongoose.Schema;

const courseSchema = new schema(
  {
    name: String,
    number: Number,
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
