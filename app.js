const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Passport configuration
require('./config/passport')(passport);

// Connect to database
connectDB();

// EJS template engine
app.set('view engine', 'ejs');

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables for flash messages
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Static files
app.use(express.static('public'));

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/userRoutes'));
app.use('/students', require('./routes/studentRoutes'));
app.use('/interviews', require('./routes/interviewRoutes'));

// Server port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
