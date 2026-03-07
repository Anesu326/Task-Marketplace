# Task Marketplace API

A FastAPI-based platform for connecting task posters with workers through a bidding system.

## Description

The Task Marketplace API allows users to post tasks with budgets and locations, while workers can bid on these tasks. The platform includes user authentication, task management, bidding functionality, and user profiles with ratings.

## Features

- User registration and authentication with JWT tokens
- Task creation and management
- Bidding system for workers
- User profiles with ratings
- SQLite database for development
- Automatic API documentation

## Tech Stack

- **Backend**: FastAPI
- **Database**: SQLAlchemy with SQLite
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **ASGI Server**: Uvicorn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Task-Marketplace
   ```

2. Create a virtual environment:
   ```bash
   python -m venv .venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```bash
     .venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source .venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r task_market/requirements.txt
   ```

## Running the Application

1. Navigate to the task_market directory:
   ```bash
   cd task_market
   ```

2. Run the application:
   ```bash
   uvicorn app.main:app --reload
   ```

3. Open your browser and go to `http://127.0.0.1:8000/docs` to access the interactive API documentation.

## API Endpoints

The API provides the following main endpoints:

- **Authentication**:
  - `POST /register` - Register a new user
  - `POST /login` - Login and get access token

- **Tasks**:
  - `POST /tasks` - Create a new task

- **Users**:
  - User management endpoints

- **Bids**:
  - Bidding functionality

For detailed API documentation, visit `/docs` when the server is running.

## Database

The application uses SQLite for development. The database file `task_market.db` will be created automatically when you run the application.

To reset the database, you can delete the `task_market.db` file and restart the application.

## Development

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.