const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Render registration form
router.get('/register', (req, res) => res.render('users/register'));

// Handle registration form submission
router.post('/register', userController.registerUser);

// Render login form
router.get('/login', (req, res) => res.render('users/login'));

// Handle login form submission
router.post('/login', userController.loginUser);

// Handle user logout
router.get('/logout', userController.logoutUser);

module.exports = router;
