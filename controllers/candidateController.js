const bcrypt = require("bcrypt");
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
  const {
    password,
    first_name,
    last_name,
    marital_status,
    date_of_birth,
    gender,
    email,
    phone,
    highest_education,
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new Candidate Instance
  const newCandidate = new Candidate({
    password: hashedPassword,
    first_name: first_name,
    last_name: last_name,
    marital_status: marital_status,
    date_of_birth: date_of_birth,
    gender: gender,
    email: email,
    phone: phone,
    highest_education: highest_education,
  });

  try {
    const candidate = await newCandidate.save();
    req.session.candidate = candidate;

    res.status(200).json({
      status: "OK",
      message: "Candidate registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Failed to register candidate",
    });
  }
};

// Candidate Login
exports.loginCandidate = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the candidate by username
    const candidate = await Candidate.findOne({ email });
    if (!candidate) {
      return res.status(400).json({
        status: "ERROR",
        message: "User not found",
      });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, candidate.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "ERROR",
        message: "Invalid password",
      });
    }

    // Store candidate in session
    req.session.candidate = candidate;

    // Respond with candidate info and status
    res.status(200).json({
      status: "OK",
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Internal server error",
    });
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

// Modify the resume
exports.modifyResume = async (req, res) => {
  const { candidateId } = req.params;
  const { summary, education, experience, skills } = req.body;

  try {
    // Find the candidate by ID and update
     const updatedCandidate = await Candidate.findByIdAndUpdate(
      candidateId,
      {
        $set: {
          "resume.summary": summary,
        },
        $push: {
          "resume.education": { $each: education },
          "resume.work_experience": { $each: experience },
          "resume.skills": { $each: skills },
        },
      },
      { new: true, runValidators: true }
    );


    // Check if the candidate was found and updated
    if (!updatedCandidate) {
      return res.status(404).json({
        status: "ERROR",
        message: "Candidate not found",
      });
    }

    // Respond with updated candidate info and status
    res.status(200).json({
      status: "OK",
      message: "Candidate resume updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "An error occurred while updating the candidate resume",
      error: error.message
    });
  }
};
