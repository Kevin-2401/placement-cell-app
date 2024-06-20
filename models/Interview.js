const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
    company: String,
    date: Date,
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

const Interview = mongoose.model('Interview', InterviewSchema);

module.exports = Interview;
