const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
require("dotenv").config();
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");

const candidateRoutes = require("./routes/candidateRoutes");
const jobPostingRoutes = require("./routes/jobPostingRoutes");
const jobApplicationRoutes = require("./routes/jobApplicationRoutes");

const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");


// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,        
  saveUninitialized: true, 
  cookie: { 
    maxAge: 24 * 60 * 60 * 1000,
    secure: false
  }
}));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/candidate", candidateRoutes);
app.use("/api/jobs", jobPostingRoutes);
app.use("/api/applications", jobApplicationRoutes);

// Start the server once database connection is successful
const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1);
  });

// npx tailwindcss -i ./public/css/input.css -o ./public/css/styles.css --watch
