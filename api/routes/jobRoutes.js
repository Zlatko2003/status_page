const express = require('express');
const router = express.Router();
const { Job } = require('../schemas/jobSchema');
const { isAuthenticated } = require('../utils/authMiddleware');

router.post('/add', isAuthenticated, async (req, res) => {
    const { jobTitle, jobLocation, jobDate, jobDescription, isJobActive } = req.body;

    try {
        const existingJob = await Job.findOne({ jobTitle, jobLocation });

        if (existingJob) {
            res.status(409).send('Job already exists');
        } else {
            await Job.create({
                jobTitle,
                jobLocation,
                jobDate,
                jobDescription,
                isJobActive: isJobActive === 'true'
            });
            res.redirect('/');
        }
    } catch (error) {
        res.status(500).send('Error adding job');
    }
});

router.post('/delete', isAuthenticated, async (req, res) => {
    const { jobId } = req.body;

    try {
        await Job.findByIdAndRemove(jobId);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error deleting job');
    }
});

router.get('/jobs', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving jobs', error });
    }
});

module.exports = router;
