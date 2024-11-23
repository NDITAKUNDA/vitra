const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');

// Candidate Routes
router.get('/d/:action', candidateController.getDashboard)
router.get('/:action', candidateController.getSignUpPage);
router.get('/getCandidates', candidateController.getCandidates);
router.post('/signup', candidateController.createCandidate);
router.post('/login', candidateController.loginCandidate);
router.post('/edit/:candidateId', candidateController.modifyResume);

module.exports = router;
