const Course = require("../Schemas/schema");
async function checkExist(data) {
  const existingCourse = await Course.findOne({
    name: data.name,
  });

  const existingCourse02 = await Course.findOne({
    number: data.number,
  });

  if (existingCourse || existingCourse02) {
    return "Course Already Exists";
  }
}

module.exports = { checkExist };
