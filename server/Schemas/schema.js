const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
      //  match: /pattern/,
    },
    number: { type: Number, required: true, unique: true },
    date: { type: Date, default: Date.now },
    isPublished: { type: Boolean, default: true },
    Price: Number,

    category: {
      type: String,
      required: true,
      enum: ["web", "mobile", "networking"],
      lowercase: true,
    },
    author: { type: String, unique: true },
    tags: {
      type: Array,
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "A Course Should At Least Have One Tag",
      },
    },
  },
  { timestamps: true }
);
const authorSchema = new Schema(
  {
    id: Number,
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
      unique: true,
    },
    bio: { type: String, required: false, minlength: 30, maxlength: 150 },
    hasPublished: Boolean,
    website: {
      type: String,
      required: function () {
        return this.hasPublished;
      },
    },
  },
  { timestamps: true }
);
const Course = mongoose.model("Course", courseSchema);
const Author = mongoose.model("Author", authorSchema);
module.exports = { Course, Author };
