const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
require("dotenv").config();

const candidateRoutes = require("./routes/candidateRoutes");
const jobPostingRoutes = require("./routes/jobPostingRoutes");
const jobApplicationRoutes = require("./routes/jobApplicationRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/candidates", candidateRoutes);
app.use('/api/jobs', jobPostingRoutes);
app.use('/api/applications', jobApplicationRoutes);

// Start the server once database connection is successful
const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1);
  });
