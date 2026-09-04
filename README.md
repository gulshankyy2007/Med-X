# Med-X

**Med-X** is a medical blood-report analysis platform currently under development.

The project is being built as a research-driven healthcare platform for organizing blood-report information, preserving medically meaningful observations, and presenting health information to patients and healthcare professionals.

> **Current status:** Med-X currently contains the working web foundation, role-oriented interfaces, Google OAuth authentication, and mock application data. Automated blood-report extraction, persistent medical-data storage, longitudinal report handling, and AI/ML analysis are planned future layers.

---

## Table of Contents

- [Overview](#overview)
- [Current Status](#current-status)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Verifying the Backend](#verifying-the-backend)
- [Authentication](#authentication)
- [Application Routes](#application-routes)
- [Medical Research Foundation](#medical-research-foundation)
- [Security](#security)
- [Current Limitations](#current-limitations)
- [Development Principles](#development-principles)
- [Future Direction](#future-direction)
- [License](#license)
- [Project Status](#project-status)

---

## Overview

Med-X is being developed around a structured understanding of blood-report components, their biological meaning, relationships, and interpretation boundaries.

The current application provides the web foundation for the broader platform.

### Current application areas

- Patient dashboard
- Healthcare-professional dashboard
- Blood reports
- Health information
- Monitoring
- Alerts
- Medicines
- Devices
- Ask Med-X
- Profile
- Google OAuth authentication
- Role-oriented navigation
- Mock Med-X data

The medical research and blood-report specifications are maintained separately from the application implementation.

---

## Current Status

| Area | Status |
|---|---|
| React web application | Implemented |
| Patient-oriented UI | Implemented |
| Professional-oriented UI | Implemented |
| Google OAuth | Implemented |
| JWT/session authentication foundation | Implemented |
| Blood-report UI | Implemented with mock data |
| Health UI | Implemented with mock data |
| Monitoring UI | Implemented with mock data |
| Alerts UI | Implemented with mock data |
| Medicines UI | Implemented with mock data |
| Devices UI | Implemented with mock data |
| Ask Med-X UI | Implemented with mock data |
| Automated blood-report extraction | Planned |
| Persistent medical database | Planned |
| Longitudinal report history | Planned |
| AI/ML analysis | Planned |
| Dedicated AI service | Planned |

The repository should therefore be understood as the **current Med-X web foundation**, not as the completed medical-analysis system.

---

## Technology Stack

### Frontend

- React 18
- React Router 6
- Axios
- Create React App
- `react-scripts`

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

The broader Med-X system is expected to introduce additional layers such as:

- Structured blood-report ingestion
- Blood-report data extraction
- Persistent medical-data storage
- Longitudinal report handling
- Python-based services
- FastAPI
- AI/ML analysis

These layers are **not currently implemented** in this repository.

---

## Project Structure

```text
Med-X/
│
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
│   │   ├── Breadcrumb.js
│   │   ├── Breadcrumbs.js
│   │   ├── Footer.js
│   │   ├── Modal.js
│   │   └── Navbar.js
│   │
│   ├── context/
│   │   └── AuthContext.js
│   │
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
│   │
│   ├── mock/
│   │   └── medxData.js
│   │
│   └── pages/
│       ├── AuthCallback.js
│       ├── Login.js
│       └── Register.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
Getting Started
Prerequisites

Install the following before starting:

Node.js
npm
Git

Check that they are available:

node --version
npm --version
git --version

The repository's package.json and lock files are the authoritative source for the JavaScript dependency versions.

Clone the Repository

Clone the repository and enter the project directory:

git clone https://github.com/gulshankyy2007/Med-X.git
cd Med-X

The repository currently uses the feature/medx-ui branch for the active Med-X implementation.

To explicitly check it out:

git checkout feature/medx-ui
Environment Configuration

Med-X uses separate environment configuration for the frontend and backend.

Never commit real .env files or secret values.

1. Frontend Environment

From the project root:

cp .env.example .env

The root .env.example contains the frontend configuration.

Expected local configuration:

REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_OAUTH_URL=http://localhost:5000
2. Backend Environment

Create the backend environment file:

cp backend/.env.example backend/.env

The backend environment contains configuration for:

Server port
Frontend URL
Session secret
JWT secret
Google OAuth client ID
Google OAuth client secret
Google OAuth callback URL

The actual secret values must be supplied locally.

Do not place credentials directly into source files.

Installation

Install frontend dependencies from the project root:

npm install

Then install backend dependencies:

cd backend
npm install
cd ..

At this point the project dependencies are installed.

Running the Application

The frontend and backend run as separate processes.

You should use two terminal windows.

Terminal 1 — Start the Backend

From the project root:

cd backend
npm start

The backend normally starts at:

http://localhost:5000

For development with automatic restart:

cd backend
npm run dev
Terminal 2 — Start the Frontend

From the project root:

npm start

The React development server normally starts at:

http://localhost:3000

Open the application in your browser:

http://localhost:3000

Verifying the Backend

The backend exposes a health endpoint:

GET /health

With the backend running, execute:

curl http://localhost:5000/health

A successful response should look like:

{
  "ok": true
}

This confirms that the Express backend is running.

Authentication

The current authentication foundation uses Google OAuth through Passport.

Google OAuth flow

The backend OAuth entry point is:

http://localhost:5000/auth/google

The configured local callback URL is:

http://localhost:5000/auth/google/callback

The Google OAuth credentials must be configured in:

backend/.env

The callback URL configured in the Google Cloud credentials must match the backend callback URL exactly.

Current authentication endpoints
GET  /auth/google
GET  /auth/google/callback
GET  /auth/me
POST /auth/logout
POST /auth/login
POST /auth/register
PUT  /auth/updateprofile

The email/password login, registration, and profile-update endpoints currently contain placeholder/not-implemented behavior where applicable.

They should not be considered production-ready authentication functionality.

Application Routes

The current frontend application includes the following routes.

General
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
Healthcare Professional
/professional
/professional/patients
/professional/reports
/professional/monitoring
/professional/alerts
/professional/ask-medx
Authentication
/login
/register
/auth/callback
Medical Research Foundation

The Med-X implementation is being developed from a separate research and specification process covering:

Blood-report components
Biological meaning
Component relationships
Interpretation boundaries
Report information requirements
Extraction requirements

The research establishes what Med-X needs to understand and preserve from blood-report information.

The implementation repository should not be treated as the source of truth for the medical research scope.

Future implementation work must follow the established research and specification documents rather than independently inventing medical interpretation rules.

Security

Med-X operates in a domain involving potentially sensitive healthcare information.

Development rules include:

Never commit .env files.
Never commit real OAuth credentials.
Never commit JWT or session secrets.
Never place credentials directly in source code.
Never commit real patient records.
Never commit sensitive healthcare information.
Use synthetic/non-sensitive data during development.
Keep local database data outside version control.
Keep generated artifacts outside version control.
Rotate credentials immediately if they are accidentally exposed.

Example environment files contain placeholders only.

Current Limitations

The current repository is a development-stage web foundation.

It does not currently provide:

Automated blood-report OCR
Automated blood-report extraction
Production medical interpretation
Persistent medical-record storage
Longitudinal patient-history storage
Production AI/ML analysis
A dedicated production AI service
Production-grade clinical decision support

These capabilities belong to future development stages.

Development Principles

Med-X development follows several principles.

1. Research before implementation

Medical behavior should follow the established research and specifications.

2. Preserve medical meaning

Blood-report observations must retain the information necessary for later interpretation.

3. Separate research from implementation

Research scope and implementation decisions should remain independently traceable.

4. Do not invent medical conclusions

The application should not claim medical conclusions that are unsupported by the established specifications.

5. Protect sensitive information

Secrets and healthcare data must remain outside version control.

6. Prefer controlled changes

Repository changes should be focused, traceable, and aligned with the current project scope.

Future Direction

The current web foundation will eventually connect with the broader Med-X system.

Planned future layers include:

Blood-report ingestion
        ↓
Report/component extraction
        ↓
Structured medical data
        ↓
Persistent medical storage
        ↓
Longitudinal report history
        ↓
Medical information relationships
        ↓
AI-assisted analysis
        ↓
Dedicated AI services

These layers will be introduced according to the project's established research, specifications, and implementation contracts.

License

License information will be added when the project's distribution terms are finalized.

Project Status

Med-X is an active development project.

The current repository represents the web foundation and prototype-stage implementation of the broader Med-X platform.

It should not be represented as a completed clinical, diagnostic, or production medical-analysis system.

Development Branch

The current active implementation is maintained on:

feature/medx-ui
Repository

GitHub:

https://github.com/gulshankyy2007/Med-X
