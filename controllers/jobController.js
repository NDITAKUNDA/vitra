const JobPosting = require("../models/jobPosting");

// Create a new job posting
exports.createJob = async (req, res) => {
  try {
    // Gather the data form the post request
    const {
      title,
      company,
      location,
      employment_type,
      experience_level,
      salary,
      description,
      responsibilities,
      qualifications,
      benefits,
      deadline,
      status,
      postedAt,
      expiresAt,
      views,
      tags,
    } = req.body;

    // Create a new JobPosting instance from the request body
    const job = new JobPosting({
      title,
      company,
      location,
      employment_type,
      experience_level,
      salary,
      description,
      responsibilities,
      qualifications,
      benefits,
      deadline,
      status,
      postedAt,
      expiresAt,
      views,
      tags,
    });

    // Save the job posting to the database
    await job.save();

    // Send a success response with the created job posting data
    res.status(201).json({
      message: "Job posting created successfully",
      job,
    });
  } catch (error) {
    // Handle any errors that occur
    res.status(400).json({ error: error.message });
  }
};

// Get all job postings (optionally with query filters)
exports.getJobs = async (req, res) => {
  try {
    // Use query parameters to filter jobs (e.g., by title, location, employment_type)
    const filters = req.query;

    // Fetch jobs from the database based on the filters
    const jobs = await JobPosting.find(filters);

    // Send a success response with the list of job postings
    res.status(200).json(jobs);
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ error: error.message });
  }
};
