const express = require("express");
const {
  getCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../Controllers/course");

const route = express.Router();

route.get("/", getCourses);
route.get("/:id", getSingleCourse);
route.delete("/:id", deleteCourse);
route.put("/:id", updateCourse);
route.post("/", createCourse);

module.exports = route;
