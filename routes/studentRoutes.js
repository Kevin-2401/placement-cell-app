const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// List all students
router.get('/', studentController.listStudents);

// Render form to create a new student
router.get('/new', studentController.createStudentForm);

// Handle form submission to create a new student
router.post('/new', studentController.createStudent);

module.exports = router;
