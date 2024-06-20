const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: String,
    college: String,
    status: { type: String, enum: ['placed', 'not_placed'] },
    dsaScore: Number,
    webDScore: Number,
    reactScore: Number,
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
