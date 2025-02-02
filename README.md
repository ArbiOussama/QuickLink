# QuickLink Project

QuickLink is a web application that allows users to shorten URLs and manage their shortened URLs. The project consists of a backend built with Node.js , Express and mongoDB, and a frontend built with React.

## Project Structure

### Backend

- **app.js**: Main application file where Express app is configured.
- **routes/**: Contains route definitions for authentication and URL management.
- **models/**: Contains Mongoose models for MongoDB collections.
- **middleware/**: Contains middleware functions for authentication.

### Frontend

- **src/**: Contains React components, hooks, and utilities.
- **public/**: Contains static assets and the main HTML file.

## Setup Instructions

### Backend

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the backend directory and add the following environment variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    BASE_URL=http://localhost:5000
    JWT_SECRET=your_secret_key
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the frontend development server:
    ```bash
    npm start
    ```

## API Endpoints

### Authentication

- **POST /auth/register**: Register a new user.
    - Request body: `{ "username": "string", "email": "string", "password": "string" }`
    - Response: `{ "message": "User registered successfully!" }`

- **POST /auth/login**: Login a user.
    - Request body: `{ "email": "string", "password": "string" }`
    - Response: `{ "token": "string" }`

- **GET /auth/userInfo**: Get user information.
    - Headers: `{ "Authorization": "Bearer token" }`
    - Response: `{ "username": "string", "email": "string" }`

### URL Management

- **POST /urls/shorten**: Shorten a URL.
    - Request body: `{ "originalUrl": "string" }`
    - Headers: `{ "Authorization": "Bearer token" }`
    - Response: `{ "userId": "string", "originalUrl": "string", "shortId": "string" }`

- **GET /urls/user-urls**: Get user's URLs.
    - Headers: `{ "Authorization": "Bearer token" }`
    - Response: `[ { "userId": "string", "originalUrl": "string", "shortId": "string" } ]`

- **GET /urls/:shortId**: Redirect to the original URL.
    - Response: Redirects to the original URL.



## Running Tests

To run the tests, use the following command:

```bash
npm test
```


