const express = require('express');
const router = express.Router();

// Render home page
router.get('/', (req, res) => res.render('index'));

module.exports = router;
