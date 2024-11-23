const bcrypt = require("bcrypt");
const Candidate = require("../models/candidate");
const session = require("express-session");

// Get sign up page
exports.getSignUpPage = (req, res) => {
  const action = req.params.action;
  title = action;
  if (action === "signup") {
    title = "Welcome to VITRA! Create an account to get started.";
  } else if (action === "login") {
    title = "Welcome Back! Enter your details and lets find that dream job.";
  } else if (action === "reset") {
    title = "Forgot your password, Let's help you log in.";
  } else {
    title = "Welcome to VITRA";
  }
  res.render("candidate/authentication", { section: action, title: title });
};

exports.getDashboard = (req, res) => {
  // Retrieve candidate data from the session
  const candidate = req.session.candidate;

  if (!candidate) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  // Example applications array
  const applications = [
    {
      title: "Junior Web Developer",
      company: "ABC Corp",
      status: "In progress",
    },
    {
      title: "Junior Software Developer",
      company: "XYZ Corp",
      status: "Rejected",
    },
    {
      title: "Lead UI/UX Designer",
      company: "ABC Corp",
      status: "Interview scheduled",
    },
  ];

  const action = req.params.action;
  res.render("candidate/dashboard", {
    candidate,
    applications,
    section: action,
    title: action,
  });
};

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
  try {
    // Collect the user input
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
    const candidate = await newCandidate.save();

    req.session.candidate = candidate;
    res.redirect("/candidate/d/dashboard/");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Candidate Login
exports.loginCandidate = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the candidate by username
    const candidate = await Candidate.findOne({ username });
    if (!candidate) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, candidate.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    req.session.candidate = candidate;
    res.redirect("/candidate/d/dashboard/");
  } catch (error) {
    res.status(500).json({ message: error.message });
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
          "resume.education": education,
          "resume.work_experience": experience,
          "resume.skills": skills,
        },
      },
      { new: true, runValidators: true }
    );

    // Check if the candidate was found and updated
    if (!updatedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Respond with the updated candidate document
    res
      .status(200)
      .json({ message: "Candidate updated successfully", updatedCandidate });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "An error occurred while updating the candidate",
        error: error.message,
      });
  }
};
