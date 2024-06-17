const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    jobLocation: {
        type: String,
        required: true
    },
    jobDate: {
        type: Date,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    isJobActive: {
        type: Boolean,
        required: true
    }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = {
    Job
};
