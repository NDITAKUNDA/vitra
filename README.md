# Validating Individuals for Talent Recruitment and Assessment (VITRA)

A full-featured recruitment platform that allows companies to post job listings and candidates to apply for jobs. Built with Node.js, Express, and MongoDB.

## Features

- **Job Posting**: Companies can post detailed job listings with various attributes like job title, location, salary, and more.
- **Job Applications**: Candidates can apply for jobs with their resume, cover letter, and contact information.
- **Application Tracking**: Track the status of applications from submission to interview, acceptance, or rejection.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/NDITAKUNDA/vitra.git
    cd recruitment-platform
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Environment Variables**

    Create a `.env` file in the root directory and add your configuration details:

    ```plaintext
    PORT=3000
    MONGODB_URI=<your-mongodb-connection-string>
    ```

4. **Start the Server**

    ```bash
    npm start
    ```

    Your server should be running at `http://localhost:5f000`.

## Usage

- **API Base URL**: `http://localhost:5f000/api`

You can use tools like Postman or cURL to interact with the API endpoints.

## API Documentation

### Endpoints

#### Jobs

- `POST /api/jobs`: Create a new job posting
- `GET /api/jobs`: Retrieve all job postings

#### Applications

- `POST /api/applications`: Submit a new job application
- `GET /api/applications`: Retrieve all job applications

For detailed API usage, refer to the [API documentation](docs/API.md) (optional link if adding further docs).

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch with your feature or fix.
3. Commit your changes.
4. Open a pull request.

Please refer to `CONTRIBUTING.md` for more details on our contribution guidelines.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
