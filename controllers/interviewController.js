const Interview = require('../models/Interview');
const Student = require('../models/Student');
const Result = require('../models/Result');

// List all interviews
exports.listInterviews = async (req, res) => {
    const interviews = await Interview.find().populate('students');
    res.render('interviews/index', { interviews });
};

// Render form to create a new interview
exports.createInterviewForm = (req, res) => {
    res.render('interviews/new');
};

// Create a new interview
exports.createInterview = async (req, res) => {
    const { company, date } = req.body;
    const newInterview = new Interview({ company, date });
    await newInterview.save();
    res.redirect('/interviews');
};

// Render form to allocate a student to an interview
exports.allocateStudentForm = async (req, res) => {
    const students = await Student.find();
    const interviews = await Interview.find();
    res.render('interviews/allocate', { students, interviews });
};

// Allocate a student to an interview
exports.allocateStudent = async (req, res) => {
    const { interviewId, studentId } = req.body;
    const interview = await Interview.findById(interviewId);
    interview.students.push(studentId);
    await interview.save();
    res.redirect('/interviews');
};

// Update the result of an interview for a student
exports.updateResult = async (req, res) => {
    const { interviewId, studentId, result } = req.body;
    const interview = await Interview.findById(interviewId);
    const student = await Student.findById(studentId);

    // Find existing result or create a new one
    let existingResult = await Result.findOne({ interview: interviewId, student: studentId });
    if (!existingResult) {
        existingResult = new Result({ interview: interviewId, student: studentId, result });
    } else {
        existingResult.result = result;
    }

    await existingResult.save();
    res.redirect(`/interviews/${interviewId}`);
};
