const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  summary: { type: String, default: "" },
  education: [
    {
      institution: { type: String, required: true },
      degree: { type: String, required: true },
      level: { type: String, required: true },
      start_date: { type: Date, required: true },
      end_date: { type: Date, required: true },
      grade: { type: String, default: "" }
    }
  ],
  work_experience: [
    {
      company_name: { type: String, required: true },
      job_title: { type: String, required: true },
      start_date: { type: Date, required: true },
      end_date: { type: Date, required: true },
      summary: { type: String, default: "" }
    }
  ],
  skills: [
    { 
      "skill": {type: String}
    }
  ],
  certifications: [
    {
      name: { type: String, required: true },
      issuing_organization: { type: String, required: true },
      issue_date: { type: Date, required: true },
      expiration_date: { type: Date }
    }
  ],
  languages_spoken: [
    {
      language_name: { type: String, required: true },
      proficiency_level: { type:String, enum:['Beginner', 'Intermediate', 'Advanced', 'Fluent'], default:'Beginner' }
    }
  ],
  projects: [
    {
      title: { type:String, required:true },
      description:{ type:String, default:"" },
      link:{ type:String, default:"" }
    }
  ]
});

const candidateSchema = new mongoose.Schema(
  {
    password: { type: String, required: true},
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    marital_status: { type: String, required: true},
    date_of_birth: { type: Date, required: true},
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    residence: { type: String, default: "" },
    highest_education: { type: String, required: true },
    resume: {type : resumeSchema},
    status: { type: Boolean, default: false }
  },
  { 
    timestamps: true 
  }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
