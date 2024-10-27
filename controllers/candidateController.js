const Candidate = require("../models/candidate");

// Get all candidates
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new candidate
exports.createCandidate = async (req, res) => {
  // Collect the user input
  const {
    first_name,
    last_name,
    marital_status,
    date_of_birth,
    email,
    phone,
    residence,
    highest_education,
    resume,
  } = req.body;

  // Create new Candidate Instance
  const newCandidate = new Candidate({
    first_name,
    last_name,
    marital_status,
    date_of_birth,
    email,
    phone,
    residence,
    highest_education,
    resume,
  });

  // Save new Candidate
  try {
    const candidate = await newCandidate.save();
    res.status(201).json(candidate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update candidate by ID
exports.updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!candidate)
      return res.status(404).json({ message: "Candidate not found" });
    res.status(200).json(candidate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete candidate by ID
exports.deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate)
      return res.status(404).json({ message: "Candidate not found" });
    res.status(200).json({ message: "Candidate deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
