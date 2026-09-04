# Med-X

**Med-X** is a medical blood-report analysis platform under development.

The project is being developed as a structured platform for handling blood-report information and presenting medically meaningful information to patients and healthcare professionals.

> **Current status:** The repository currently contains the working web foundation, authentication flow, role-oriented UI, and mock Med-X data. Blood-report extraction, persistent medical data storage, and AI/ML analysis are planned future layers and are not yet implemented.

---

## Overview

Med-X is being developed around a research-driven understanding of blood-report components and their medical interpretation.

The current application provides the web foundation required for the platform, including:

- Patient-oriented dashboard
- Healthcare-professional dashboard
- Blood-report UI
- Health information UI
- Monitoring UI
- Alerts UI
- Medicines UI
- Devices UI
- Ask Med-X UI
- Profile UI
- Google OAuth authentication
- Role-oriented navigation
- Mock data for current frontend development

The medical research and blood-report scope are maintained separately from the current implementation layer.

---

## Current Status

| Area | Status |
|---|---|
| React web application | Implemented |
| Patient-oriented UI | Implemented |
| Professional-oriented UI | Implemented |
| Google OAuth | Implemented |
| JWT-based authentication flow | Implemented |
| Blood-report UI | Implemented with mock data |
| Health / monitoring / alerts UI | Implemented with current mock data |
| Medical report extraction | Planned |
| Persistent medical database | Planned |
| Longitudinal report history | Planned |
| AI/ML analysis | Planned |
| Dedicated AI service | Planned |

The current repository should therefore be understood as the **web foundation of Med-X**, not as the completed medical-analysis system.

---

## Technology Stack

### Frontend

- React 18
- React Router 6
- Axios
- Create React App / `react-scripts`

### Backend

- Node.js
- Express
- Passport
- Google OAuth 2.0
- JSON Web Token (JWT)
- Express Session
- CORS
- dotenv

### Planned Future Layers

The broader Med-X development plan includes:

- Persistent medical data storage
- Blood-report data extraction
- Longitudinal report handling
- Python-based AI services
- FastAPI
- AI/ML analysis

These components are **not currently implemented in this repository**.

---

## Repository Structure

```text
Med-X/
├── backend/
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── server.js
│
├── public/
│   ├── index.html
│   └── logo.png
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── features/
│   │   ├── ai/
│   │   ├── alerts/
│   │   ├── dashboard/
│   │   ├── devices/
│   │   ├── health/
│   │   ├── medicines/
│   │   ├── monitoring/
│   │   ├── professional/
│   │   ├── profile/
│   │   └── reports/
│   ├── mock/
│   └── pages/
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```
Prerequisites

Install the following before running the project:

Node.js
npm
Git

The repository's package files are the authoritative source for the JavaScript dependency versions.

Environment Configuration
Frontend

Create a local .env file in the repository root based on .env.example.

Example:

REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_OAUTH_URL=http://localhost:5000
Backend

Create:

backend/.env

using:

backend/.env.example

The backend requires configuration for:

Port
Frontend URL
Session secret
JWT secret
Google OAuth client ID
Google OAuth client secret
Google OAuth callback URL

Never commit real .env files or secret values.

Installation

Clone the repository and enter its directory:

git clone <repository-url>
cd <repository-directory>

Install frontend dependencies:

npm install

Install backend dependencies:

cd backend
npm install
cd ..

Configure the required environment files before starting authentication-dependent functionality.

Running the Frontend

From the repository root:

npm start

The Create React App development server normally runs at:

http://localhost:3000
Running the Backend

Open a terminal in the repository root:

cd backend
npm start

The backend normally runs at:

http://localhost:5000

For development with nodemon:

npm run dev
Backend Health Check

The backend exposes:

GET /health

A successful local health check returns:

{
  "ok": true
}
Authentication

The current authentication implementation uses Google OAuth through Passport.

The local Google OAuth callback is:

http://localhost:5000/auth/google/callback

The backend authentication endpoints currently include:

GET  /auth/google
GET  /auth/google/callback
GET  /auth/me
POST /auth/logout
POST /auth/login
POST /auth/register
PUT  /auth/updateprofile

The email/password login, registration, and profile-update endpoints currently contain placeholder/not-implemented behavior where applicable. They should not be considered fully implemented authentication functionality.

Application Routes

The current frontend routes include:

/
 /dashboard
 /health
 /reports
 /monitoring
 /alerts
 /medicines
 /devices
 /ask-medx
 /profile
 /reports/:id

 /professional
 /professional/patients
 /professional/reports
 /professional/monitoring
 /professional/alerts
 /professional/ask-medx

 /login
 /register
 /auth/callback
Medical Research Foundation

The implementation is being developed from a separate research and specification process covering blood-report components, their biological meaning, relationships, interpretation boundaries, and extraction requirements.

The research establishes what Med-X needs to understand and preserve from blood-report information.

The implementation repository should not be treated as the source of truth for the medical research scope.

Likewise, future implementation work must follow the established research and specification documents rather than inventing medical interpretation rules independently.

Security

This project handles a domain involving potentially sensitive healthcare information.

Development rules include:

Never commit .env files.
Never commit real OAuth secrets.
Never commit JWT or session secrets.
Never place credentials in source code.
Never commit real patient records or sensitive healthcare data.
Use synthetic/non-sensitive data during development.
Keep local database data and generated artifacts out of version control.
Rotate credentials if they are accidentally exposed.

The repository includes example environment files containing placeholders only.

Current Limitations

The current repository is a web foundation and prototype-stage implementation.

It does not currently provide:

Automated blood-report OCR
Automated blood-report extraction
Production medical interpretation
Persistent medical-record storage
Longitudinal patient history storage
Production AI/ML analysis
A dedicated production AI service
Production-grade clinical decision support

These capabilities belong to future development stages.

Development Principles

Med-X development follows these principles:

Research before implementation
Medical behavior should follow the established research and specifications.
Preserve medical meaning
Blood-report observations must retain the information necessary for later interpretation.
Separate research from implementation
Research scope and implementation decisions should remain independently traceable.
Do not invent medical conclusions
The application should not claim medical conclusions that are not supported by the established specifications.
Protect sensitive information
Secrets and healthcare data must remain outside version control.
Prefer controlled changes
Repository changes should be focused and traceable rather than introducing unrelated refactoring.
Future Direction

The current web foundation will eventually connect with the broader Med-X system, including:

Structured blood-report ingestion
Blood-report component extraction
Persistent medical data
Longitudinal report handling
Medical information relationships
AI-assisted analysis
Dedicated AI services

Those layers will be introduced according to the project's established research, specifications, and implementation contracts.

License

License information will be added when the project's distribution terms are finalized.

Project Status

Med-X is an active development project.

The current repository should be considered a development-stage web foundation and should not be represented as a completed clinical or diagnostic system.
