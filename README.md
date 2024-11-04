# BlogApp in Node.js

This is a blog system developed using Node.js, Express, Passport, and MongoDB. The application allows users to create, read, update, and delete blog posts while managing user authentication.

## Features

- User authentication with Passport.js
- Create, edit, and delete blog posts
- View all blog posts
- Commenting feature
- Admin Privilegues 
- Responsive design using Handlebars and CSS

## Technologies Used

- **Node.js**: JavaScript runtime for server-side programming
- **Express**: Web application framework for Node.js
- **Passport**: Middleware for authentication
- **MongoDB**: NoSQL database for storing blog posts and user data
- **Handlebars**: Templating engine for generating HTML views

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- MongoDB installed locally or use a cloud instance (e.g., MongoDB Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Dadyze/BlogApp-in-NodeJS.git
   cd BlogApp-in-NodeJS
2. Install the dependencies:
   ```bash
   npm install
3. Make sure that the connection string fields point to your MongoDB local or cloud instance in the configuration file.
4. Start the application:
      ```bash
   npm start
5. Open your browser and navigate to http://localhost:3000.

## Usage
Register a new user account to start creating blog posts.
Use the navigation to view all blog posts or edit existing ones.
## Project Structure
- app.js: Main application file where the server is set up.
- config/: Configuration files, including database connection settings.
- models/: Database models for MongoDB.
- routes/: Express routes for handling HTTP requests.
- views/: Handlebars templates for rendering the UI.
- public/: Static assets including CSS styles.
## Contributing
Contributions are welcome! Feel free to submit issues or pull requests if you have suggestions or improvements.
## Acknowledgments
This application serves as a practical demonstration of building a full-stack web application using modern JavaScript technologies.
