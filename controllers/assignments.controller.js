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
        console.log("assignmentassignment", assignment);
        const allStudents = await User.findAll({
          where: {
            role: "student",
          },
        });

        for (const student of allStudents) {
          const data = await student_assignment.create({
            assignment_id: assignment.dataValues.id,
            instructor_id: _req.user.dataValues.id,
            student_id: student.dataValues.id, // Access 'id' from 'dataValues'
          });
        }

        // Send the response after the loop is finished
        _res.status(200).json({
          statusCode: 200,
          msg: "assignment created and assigned successfully",
        });
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

const submitAssignment = async (_req, _res) => {
  const assignemnt = await Assignment.findOne({
    where: {
      id: _req.query.assignemnt_id,
    },
  });

  const due_date = assignemnt?.dataValues.due_date;
  const submission_date = _req.body?.submission_date;

  if (new Date(submission_date) < new Date(due_date)) {
    console.log("inside", _req.query.assignemnt_id);

    const body = {
      submission_date: _req.body?.submission_date,
      submission_status: "submitted",
    };

    let updatedResult = await student_assignment.update(body, {
      where: {
        assignment_id: _req.query.assignemnt_id,
        student_id: _req.user.dataValues.id,
      },
    });
    _res.status(200).json({ data: updatedResult });
  }
};

const getTeacherAssignments = async (_req, _res) => {
  User.findAll({
    where: { role: "teacher", id: _req.user.dataValues.id },
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

const GetSubmissionDetailByInstructorId = async (_req, _res) => {
  student_assignment
    .findAll({
      where: {
        instructor_id: _req.user.dataValues.id,
        assignment_id: _req.query.assignment_id,
      }, // Assuming 'student' is the role for students
      include: [
        {
          model: Assignment,
          as: "assignments",
        },
        {
          model: User,
          as: "student_assignments",
        },
      ],
    })
    .then((GetSubmissionDetail) => {
      _res.status(200).json({ data: GetSubmissionDetail });
    })
    .catch((error) => {
      console.log("Error retrieving students and assignments:", error);
    });
};

const GetAssignemntById = async (_req, _res) => {
  student_assignment
    .findOne({
      where: { assignment_id: _req.query.assignment_id }, // Assuming 'student' is the role for students
      include: [
        {
          model: Assignment,
          as: "assignments",
        },
      ],
    })
    .then((assignmentDetail) => {
      _res.status(200).json({ data: assignmentDetail });
    })
    .catch((error) => {
      console.error("Error retrieving students and assignments:", error);
    });
};

const getOne = async (_req, _res) => Controller.getOne(_req, _res);

module.exports = {
  createAssignment,
  getTeacherAssignments,
  updateAssignment,
  getOne,
  submitAssignment,
  GetSubmissionDetailByInstructorId,
  GetAssignemntById,
};
