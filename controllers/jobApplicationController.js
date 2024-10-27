const JobApplication = require("../models/jobApplication");

// Create a new job application
exports.createApplication = async (req, res) => {
  try {
    const { candidate_id, job_id, cover_letter } = req.body;

    // Creating a new instance
    const application = new JobApplication({
      candidate_id,
      job_id,
      cover_letter,
    });

    // Save the job application to the database
    await application.save();

    // Send a success response with the created application data
    res.status(201).json({
      message: "Job application submitted successfully",
      application,
    });
  } catch (error) {
    // Handle any errors that occur
    res.status(400).json({ error: error.message });
  }
};

// Get all job applications
exports.getApplications = async (req, res) => {
  try {
    // Fetch all job applications from the database
    const applications = await JobApplication.find().populate("job_id"); // Populate to get job details

    // Send a success response with the list of applications
    res.status(200).json(applications);
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ error: error.message });
  }
};
