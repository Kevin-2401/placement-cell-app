const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');

// List all interviews
router.get('/', interviewController.listInterviews);

// Render form to create a new interview
router.get('/new', interviewController.createInterviewForm);

// Handle form submission to create a new interview
router.post('/new', interviewController.createInterview);

// Render form to allocate a student to an interview
router.get('/allocate', interviewController.allocateStudentForm);

// Handle form submission to allocate a student to an interview
router.post('/allocate', interviewController.allocateStudent);

// Handle result update for an interview
router.post('/updateResult', interviewController.updateResult);

module.exports = router;
