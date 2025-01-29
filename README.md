# QuadB Tech Documentation

## Table of Contents
 
- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the QuadB Tech](#running-the-project)
- [Scripts](#scripts)
- [Notes](#notes)

---

## Overview

This project consists of a frontend built with React.js and a backend built with Node.js. The project is designed to deliver seamless client-server communication, enabling a modern web application experience.

---

## Technologies Used

### Frontend:
- React.js
- CSS Framework (e.g., styled-component,css)
- Axios for API calls

### Backend:
- Node.js
- Express.js
- Database (MongoDB)

---

## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd QuadB Tech
    ```

2. Install dependencies for both frontend and backend:

    **Frontend:**
    ```bash
    cd frontend
    npm install
    ```

    **Backend:**
    ```bash
    cd ../backend
    npm install
    ```

---

## Running the QuadB Tech

1. Start the backend server:
    ```bash
    cd backend
    nodemon index.js
    ```

2. Start the frontend development server:
    ```bash
    cd ../frontend
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000` (or the port specified for the frontend) to view the application.

---

## Scripts

### Frontend Scripts

- `npm start`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm test`: Runs the test suite.

### Backend Scripts

- `nodemon index.js`: Starts the backend server

---

## Notes

- Ensure that the environment variables required by the backend are set up correctly. (e.g., `.env` file in the `backend` folder).
- Verify that the frontend and backend are configured to communicate properly (e.g., proxy settings in `frontend/package.json`).
- Admin Credentials:
  - **Username:** `abhishek@admin.com`
  - **Password:** `admin`

Feel free to contribute by submitting pull requests or reporting issues!
