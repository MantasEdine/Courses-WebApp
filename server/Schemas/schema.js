const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    number: { type: Number, required: true, unique: true },
    date: { type: Date, default: Date.now },
    isPublished: { type: Boolean, default: true },
    Price: {
      type: Number,
      required: function () {
        return this.isPublished;
      },
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
