const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Register a new user
exports.registerUser = async (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // Validate required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    // Check if passwords match
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    // Check password length
    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    // If there are errors, render the registration form again with errors
    if (errors.length > 0) {
        res.render('users/register', { errors, name, email, password, password2 });
    } else {
        const user = await User.findOne({ email: email });
        if (user) {
            errors.push({ msg: 'Email already exists' });
            res.render('users/register', { errors, name, email, password, password2 });
        } else {
            const newUser = new User({ name, email, password });

            // Hash the password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            req.flash('success_msg', 'You are now registered and can log in');
                            res.redirect('/users/login');
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    }
};

// Log in a user
exports.loginUser = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
};

// Log out a user
exports.logoutUser = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
};
