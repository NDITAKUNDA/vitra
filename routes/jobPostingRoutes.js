const express = require('express');
const router = express.Router();
const jobPosting = require('../controllers/jobController');

// Candidate Routes
router.get('/', jobPosting.getJobs);
router.post('/', jobPosting.createJob);

module.exports = router;
