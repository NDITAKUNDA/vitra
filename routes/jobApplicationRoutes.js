const express = require('express');
const router = express.Router();
const jobApplicationController = require('../controllers/jobApplicationController');

router.get('/', jobApplicationController.getApplications);
router.post('/', jobApplicationController.createApplication);

module.exports = router;
