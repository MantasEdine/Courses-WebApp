const { Course, Author } = require("../Schemas/schema");
const { isValidObjectId } = require("../middlewares/mongoose-validation");
const { joiValidation } = require("../middlewares/joiValidation");
const { checkExist } = require("../middlewares/existValidation");
const getCourses = async (req, res) => {
  const page = req.query.page || 0;
  const booksPerPage = 3;
  try {
    const courses = await Course.find()
      .sort({
        number: 1,
      })
      .skip(page * booksPerPage)
      .limit(3);
    if (courses.length === 0) {
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
    const check = checkExist(data);
    if (!check) {
      return res.status(400).send("Course already exists");
    }

    const newCourse = new Course({
      name: data.name,
      number: data.number,
      price: data.price,
      category: data.category,
      tags: data.tags,
    });

    await newCourse.validate();

    await newCourse.save();

    res.status(200).send(newCourse);
  } catch (error) {
    if (error.name === "ValidationError") {
      let errorMessage = "";
      Object.values(error.errors).forEach((err) => {
        errorMessage += err.message + "n";
      });
      return res.status(400).send(errorMessage);
    } else if (error.code === 11000) {
      res.status(400).send("Hey, this name already exists!");
    } else {
      res.status(500).send("An error occurred: " + error.message);
    }
  }
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  if (!isValidObjectId(id)) {
    return res.status(400).send("Invalid Course ID");
  }
  const check = checkExist(data);
  if (!check) {
    return res.status(400).send("Course already exists");
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
    if (error.code === 11000) {
      res.status(400).send("Hey, this name already exists!");
    } else {
      res.status(500).send("An error occurred: " + error.message);
    }
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
