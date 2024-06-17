const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../utils/authMiddleware');
const { Job } = require('../schemas/jobSchema');
const User = require('../schemas/userSchema');

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const jobs = await Job.find();
        const users = await User.find();

        res.render('index', { jobs, users });
    } catch (error) {
        res.status(500).send('Error retrieving jobs');
    }
});

module.exports = router;
