
---

# Node.js User and Card Management API

## Overview
This project is a RESTful API built using **Node.js**, **Express**, and **MongoDB**. It manages users and business cards with basic CRUD operations.

### Key Entities:
- **Users**: Admin, Business, and Regular users.
- **Cards**: Business cards created by Business users.
  - Business users can create, update, and delete cards.
  - Admin users have additional permissions to manage users and cards.

## Features
### User Management:
- Create a new user (Admin, Business, Regular)
- Update user details
- Delete a user
- Retrieve user details
- Lock user

### Card Management:
- Create a new business card
- Update card information
- Delete a card
- Retrieve cards by user or card ID

> **Note**: Only Business users can create cards, and only the card creator can update or delete them.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Environment Variables
Create a `.env` file in the root of the project and add the following variables:

```bash
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/
PORT=5000
JWT_SECRET=<your_jwt_secret>
```

Replace `<username>`, `<password>`, `<cluster-url>`, and `<your_jwt_secret>` with your actual MongoDB credentials and a secure JWT secret.

## Running the Application

### Development Mode:
```bash
npm run dev
```

### Production Mode:
```bash
npm run prod
```

The server will start on `http://localhost:5000`.

## API Endpoints

### User Management
- **Create User**: `POST /users/create`
- **Get All Users**: `GET /users`
- **Get User by ID**: `GET /users/:id`
- **Update User**: `PUT /users/:id`
- **Delete User**: `DELETE /users/:id`

### Card Management
- **Create Card**: `POST /cards/create`
- **Get All Cards**: `GET /cards`
- **Get Card by ID**: `GET /cards/:id`
- **Update Card**: `PUT /cards/:id`
- **Delete Card**: `DELETE /cards/:id`

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **Axios** (for seeding data)
- **Nodemon** (for development)
- **CORS** (for cross-origin requests)

## Testing
You can import the Postman collection and environment variables provided in the `postman` folder to test the API locally.

## License
This project is licensed under the MIT License.

---