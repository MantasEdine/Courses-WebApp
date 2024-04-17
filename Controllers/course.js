const Course = require("../Schemas/schema");
const { isValidObjectId } = require("../middlewares/mongoose-validation");
const { joiValidation } = require("../middlewares/joiValidation");
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({
      number: 1,
    });
    if (Course.length === 0) {
      res.status(404).send("No courses found.");
    } else res.status(200).send(courses);
  } catch (error) {
    res.status(500).send("Internal Server Error" + error);
  }
};

const getSingleCourse = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).send("Invalid Course ID");
  }
  try {
    const single_course = await Course.findById(id).sort({ number: 1 });

    if (!single_course) {
      res.status(404).send("Not Found");
    } else {
      res.status(200).send(single_course);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error);
  }
};

const createCourse = async (req, res) => {
  const data = req.body;
  const error = joiValidation(data);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const existingCourse = await Course.findOne({
      name: data.name,
      number: data.number,
    });

    if (existingCourse) {
      return res.status(400).send("Course already exists");
    }

    const newCourse = new Course({
      name: data.name,
      number: data.number,
    });

    await newCourse.save();

    res.status(200).send(newCourse);
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error);
  }
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  if (!isValidObjectId(id)) {
    return res.status(400).send("Invalid Course ID");
  }

  try {
    const course = await Course.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).send("Course Not Found");
    }

    res.status(200).send(course);
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).send("Invalid Course ID");
  }

  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (deletedCourse) {
      res.status(200).send("Deleted Course: " + deletedCourse);
    } else {
      res.status(404).send("Course Not Found");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error" + error);
  }
};
module.exports = {
  getCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
