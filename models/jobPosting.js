const mongoose = require("mongoose");

const jobPostingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: {
      name: { type: String, required: true },
      website: { type: String },
      logo_url: { type: String },
      industry: { type: String },
    },
    location: {
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    employment_type: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract", "Temporary", "Internship"],
      required: true,
    },
    experience_level: {
      type: String,
      enum: ["Entry", "Mid", "Senior", "Director", "Executive"],
      required: true,
    },
    salary: {
      range: {
        min: { type: Number },
        max: { type: Number },
      },
      currency: { type: String, default: "not mentioned" },
      negotiable: { type: Boolean, default: false },
    },
    description: { type: String, required: true },
    responsibilities: [{ type: String }],
    qualifications: [{ type: String }],
    benefits: [{ type: String }],
    deadline: { type: String },
    status: {
      type: String,
      enum: ["Open", "Closed", "Paused"],
      default: "Open",
    },
    views: { type: Number, default: 0 },
    tags: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const JobPosting = mongoose.model("JobPosting", jobPostingSchema);

module.exports = JobPosting;
