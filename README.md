# Pet Adoption Platform - Backend

This is the backend of the **Pet Adoption Platform**, which provides API services for managing pets and adoption requests.

## Description
The backend:
- Provides RESTful APIs for managing pets and adoption requests.
- Handles database operations with MongoDB.
- Integrates seamlessly with the frontend built using Next.js.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Environment Variables Management**: dotenv

## Features
- API endpoints for managing pets and adoption requests.
- Secure and structured integration with MongoDB.
- Error handling for better debugging and reliability.

## API Endpoints

### Pets
- `GET /pets`: Retrieve a list of all pets.
- `POST /pets`: Add new pet details (requires request body).
- `GET /pets/:id`: Fetch specific pet details.
- `PUT /pets/:id`: Update pet details.
- `DELETE /pets/:id`: Delete a pet record.

### Adoption Requests
- `GET /adoption-requests`: Retrieve all adoption requests.
- `POST /adoption-requests`: Submit a new adoption request (requires request body).

## Getting Started

### Prerequisites
Ensure you have:
- [Node.js](https://nodejs.org/) installed on your system.
- A MongoDB database or connection string.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pet-adoption-backend.git
