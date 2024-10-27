const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    candidate_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPosting",
      required: true,
    },
    cover_letter: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Interview", "Accepted", "Rejected"],
      default: "Pending",
    },
    notes: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

module.exports = JobApplication;
