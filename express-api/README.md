# Express API with JWT Authentication

This is a RESTful API built with Express.js and TypeScript that includes JWT-based authentication.

## Features

- User registration and login
- JWT-based authentication
- Access token and refresh token mechanism
- Protected routes
- SQLite database

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```
4. Update the `.env` file with your own values, especially the JWT secrets
5. Build the project:
   ```
   npm run build
   ```
6. Start the server:
   ```
   npm start
   ```

For development, you can use:

```
npm run dev
```

## API Endpoints

### Authentication

- `POST /users/register` - Register a new user

  - Request body: `{ "username": "user", "email": "user@example.com", "password": "password" }`
  - Response: `{ "accessToken": "token", "refreshToken": "refresh-token", "user": { ... } }`

- `POST /users/login` - Login a user

  - Request body: `{ "email": "user@example.com", "password": "password" }`
  - Response: `{ "accessToken": "token", "refreshToken": "refresh-token", "user": { ... } }`

- `POST /users/refresh-token` - Refresh an access token

  - Request body: `{ "refreshToken": "refresh-token" }`
  - Response: `{ "accessToken": "new-token" }`

- `GET /users/profile` - Get the current user's profile (protected route)
  - Headers: `Authorization: Bearer token`
  - Response: `{ "id": 1, "username": "user", "email": "user@example.com", "created_at": "..." }`

### Groups (Protected Routes)

- `GET /groups` - Get all groups
- `GET /groups/:id` - Get a specific group
- `POST /groups` - Create a new group
- `PUT /groups/:id` - Update a group
- `DELETE /groups/:id` - Delete a group

## Authentication Flow

1. User registers or logs in and receives an access token and refresh token
2. The access token is used for API requests (short-lived)
3. When the access token expires, the refresh token can be used to get a new access token
4. The refresh token has a longer lifespan than the access token

## Security Considerations

- JWT secrets should be kept secure and not committed to version control
- Access tokens have a short lifespan (1 hour by default)
- Refresh tokens have a longer lifespan (7 days by default)
- Passwords are hashed using bcrypt
- CORS is configured to allow requests only from specific origins
