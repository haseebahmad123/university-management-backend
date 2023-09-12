const { student_assignment, User, Assignment } = require("../models");

const BaseController = require("./base.controller");
const Controller = new BaseController(Assignment, "Assignment");

const createAssignment = async (_req, _res) => {
  return Controller.create(
    _req,
    _res,
    {
      name: _req.body.name,
      description: _req.body.description,
      due_date: _req.body.due_date,
      instructor_id: _req.user.dataValues.id,
    },
    async (assignment) => {
      if (assignment) {
        return assignment;
      }
    }
  );
};

const updateAssignment = async (_req, _res) => {
  const body = {
    name: _req.body?.name,  
    description: _req.body?.description,
  };

  return Controller.update(_req, _res, body);
};

const getTeacherAssignments = async (_req, _res) => {
  User.findAll({
    where: { role: "teacher" }, // Assuming 'student' is the role for students
    include: [
      {
        model: Assignment,
        as: "assignemnt",
      },
    ],
  })
    .then((students) => {
      _res.status(200).json({ data: students });
    })
    .catch((error) => {
      console.error("Error retrieving students and assignments:", error);
    });
};

module.exports = {
  createAssignment,
  getTeacherAssignments,
  updateAssignment
};
