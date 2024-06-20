const mongoose = require('mongoose');

// Database connection URL from environment variables or fallback to local MongoDB instance.
const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/interviewDB';

// Function to connect to the MongoDB database.
const connectDB = async () => {
    try {
        // Connect to MongoDB using Mongoose.
        await mongoose.connect(dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit the process with failure.
    }
};

module.exports = connectDB;
