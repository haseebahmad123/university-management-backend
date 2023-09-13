const { student_assignment, User, Assignment } = require("../models");

const BaseController = require("./base.controller");
const Controller = new BaseController(student_assignment, "student_assignment");

const createStudentAssignment = async (_req, _res) => {
  const { assignment_id } = _req.body;
  try {
    const assignment = await Assignment.findByPk(assignment_id);
    console.log('assignment------------------', assignment);
  
    const allStudents = await User.findAll({
      where: {
        role: 'student',
      },
    });
  
    let student_ids = allStudents.map(student => student.dataValues.id);
    console.log("allStudents", student_ids);
  
    if (!assignment) {
      console.log("inisde not assignment");
      _res.status(404).json({ message: "Assignment not found" });
    }
    console.log("outside not assignment");


    for (const student of allStudents) {
      const data = await student_assignment.create({
        assignment_id: assignment.id,
        instructor_id: _req.user.dataValues.id,
        student_id: student.dataValues.id, // Access 'id' from 'dataValues'
      });
      console.log('data----------------------', data);
      const existingAssignment = await student_assignment.findOne({
        where: {
          assignment_id: assignment.id,
          student_id: student.dataValues.id, // Access 'id' from 'dataValues'
        },
      });
      if (!existingAssignment) {
        console.log("not existingAssignment");
        const newData = await student_assignment.create({
          assignment_id: assignment.id,
          instructor_id: _req.user.dataValues.id,
          student_id: student.dataValues.id, // Access 'id' from 'dataValues'
        });
        console.log('newData----------------------', newData);
      }
    }

    console.log("outside not  existingAssignment");


    // Send the success response here
    _res.status(200).json({ message: 'Assignment assigned to students successfully' });
  
  } catch (error) {
    console.error('Error assigning assignment:', error);

    _res.status(500).json({ message: 'Internal server error' });
  }
  
};

const getStudentsAssignments = async (_req, _res) => {
  User.findAll({
    where: { 
      id: _req.user.dataValues.id,
      role: 'student' 
    },
    include: [
      {
        model: student_assignment,
        as: 'student_assignemnt',
        include: [
          {
            model: Assignment,
            as: 'assignments',
          },
        ]
      },
    ],
  })
    .then((studentAssignments) => {
      _res.status(200).json({data: studentAssignments})
    })
    .catch((error) => {
      console.error('Error retrieving students and assignments:', error);
    });
}


module.exports = {
  createStudentAssignment,
  getStudentsAssignments
};
