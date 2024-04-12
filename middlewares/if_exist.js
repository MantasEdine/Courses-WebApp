const Course = require("../Schemas/schema");
const if_course_exist = async (name, number) => {
  console.log(name);
  const course_name = await Course.findOne({ name: name });
  const course_age = await Course.findOne({ number: number });
  if (course_name || course_age) {
    throw new Error("Course Already Exist");
  }
};

module.exports = { if_course_exist };
