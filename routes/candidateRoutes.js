const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');

// Candidate Routes
router.get('/', candidateController.getCandidates);
router.post('/', candidateController.createCandidate);
router.put('/:id', candidateController.updateCandidate);
router.delete('/:id', candidateController.deleteCandidate);

module.exports = router;
