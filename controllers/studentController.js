const Student = require('../models/Student');

// List all students
exports.listStudents = async (req, res) => {
    const students = await Student.find();
    res.render('students/index', { students });
};

// Render form to create a new student
exports.createStudentForm = (req, res) => {
    res.render('students/new');
};

// Create a new student
exports.createStudent = async (req, res) => {
    const { name, college, status, dsaScore, webDScore, reactScore } = req.body;
    const newStudent = new Student({ name, college, status, dsaScore, webDScore, reactScore });
    await newStudent.save();
    res.redirect('/students');
};
