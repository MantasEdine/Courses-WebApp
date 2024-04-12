const Course = require("../Schemas/schema");

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    if (Course.length === 0) {
      res.status(404).send("No courses found.");
    } else res.status(200).send(courses);
  } catch (error) {
    res.status(500).send("Internal Server Error" + error);
  }
};

const getSingleCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const single_course = await Course.findById(id);

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
  try {
  } catch (error) {
    res.status(500).send("Internal Server Error" + error);
  }
};
const deleteCourse = async (req, res) => {
  try {
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
