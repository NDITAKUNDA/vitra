const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    marital_status: { type: String, required: true},
    date_of_birth: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    residence: { type: String, required: true},
    highest_education: { type: String, required: true },
    resume: { type: String },
    status: { type: Boolean, default: false }
  },
  { 
    timestamps: true 
  }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
