# Blog Platform API

A comprehensive RESTful API for a blog platform built with Node.js, Express.js, and MongoDB. This API provides complete functionality for user authentication, blog post management, and commenting system.

## 🌐 Live Demo

The API is deployed and available at: [https://blog-platform-api-assignment.vercel.app](https://blog-platform-api-assignment.vercel.app)

## 🚀 Features

- **User Authentication & Authorization**

  - User registration and login
  - JWT-based authentication
  - Password hashing with bcrypt
  - Protected routes with middleware

- **Blog Management**

  - Create, read, update, and delete blog posts
  - Blog posts with title, description, tags, and author
  - Automatic timestamps for creation and updates

- **Comment System**

  - Add comments to blog posts
  - View all comments for a specific blog post
  - Delete comments (author only)
  - User-comment relationship tracking

- **Data Validation**
  - Input validation using express-validator
  - Custom validation middleware
  - Error handling with detailed messages

## 🛠️ Technology Stack

- **Backend Framework:** Node.js with Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT)
- **Password Security:** bcryptjs
- **Validation:** express-validator
- **Environment Management:** dotenv
- **Development:** Nodemon for hot reloading

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ashutosh-88/blog-platform-api-assignment
   cd blog-platform-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blog-platform
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system or update the connection string for MongoDB Atlas.

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in your environment variables).

**🌐 Live API:** The API is also available online at [https://blog-platform-api-assignment.vercel.app](https://blog-platform-api-assignment.vercel.app)

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint    | Description         | Auth Required |
| ------ | ----------- | ------------------- | ------------- |
| POST   | `/register` | Register a new user | No            |
| POST   | `/login`    | User login          | No            |

### Blog Routes (`/api/blogs`)

| Method | Endpoint | Description              | Auth Required     |
| ------ | -------- | ------------------------ | ----------------- |
| GET    | `/`      | Get all blog posts       | No                |
| GET    | `/:id`   | Get a specific blog post | No                |
| POST   | `/`      | Create a new blog post   | Yes               |
| PUT    | `/:id`   | Update a blog post       | Yes (Author only) |
| DELETE | `/:id`   | Delete a blog post       | Yes (Author only) |

### Comment Routes (`/api/blogs/:blogId/comments`)

| Method | Endpoint      | Description                 | Auth Required     |
| ------ | ------------- | --------------------------- | ----------------- |
| GET    | `/`           | Get all comments for a blog | No                |
| POST   | `/`           | Add a comment to a blog     | Yes               |
| DELETE | `/:commentId` | Delete a comment            | Yes (Author only) |

### User Routes (`/api/users`)

| Method | Endpoint   | Description         | Auth Required |
| ------ | ---------- | ------------------- | ------------- |
| GET    | `/profile` | Get user profile    | Yes           |
| PUT    | `/profile` | Update user profile | Yes           |

## 📝 API Usage Examples

### User Registration

```json
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "Password123",
  "confirmPassword":"Password123"
}
```

### User Login

```json
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

### Create Blog Post

```json
POST /api/blogs
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "My First Blog Post",
  "description": "This is the content of my blog post...",
  "tags": ["technology", "programming", "nodejs"]
}
```

### Add Comment

```json
POST /api/blogs/:blogId/comments
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "text": "Great blog post! Thanks for sharing."
}
```

## 🗂️ Project Structure

```
blog-platform-api/
├── config/
│   ├── auth.js              # Authentication configuration
│   └── database.js          # Database connection setup
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── blogController.js    # Blog management logic
│   ├── commentController.js # Comment management logic
│   └── userController.js    # User management logic
├── middleware/
│   ├── authMiddleware.js    # JWT authentication middleware
│   ├── errorHandler.js      # Global error handling
│   └── validationHandler.js # Input validation middleware
├── models/
│   ├── Blog.js              # Blog post schema
│   ├── Comment.js           # Comment schema
│   └── User.js              # User schema
├── postman/
│   ├── Blog Platform API.postman_collection.json
│   └── Blog Platform API Environment.postman_environment.json
├── routes/
│   ├── authRoutes.js        # Authentication routes
│   ├── blogRoutes.js        # Blog and comment routes
│   └── userRoutes.js        # User routes
├── utils/
│   ├── appError.js          # Custom error class
│   └── catchAsync.js        # Async error handling utility
├── validators/
│   ├── blogValidator.js     # Blog validation rules
│   ├── commentValidator.js  # Comment validation rules
│   └── userValidator.js     # User validation rules
├── app.js                   # Express app configuration
├── server.js                # Server entry point
├── package.json             # Project dependencies
└── vercel.json              # Vercel deployment configuration
```

## 🔧 Data Models

### User Schema

- `username` (String, required, unique)
- `email` (String, required, unique)
- `password` (String, required, hashed)
- `timestamps` (createdAt, updatedAt)

### Blog Schema

- `title` (String, required)
- `description` (String, required)
- `author` (ObjectId, ref: User)
- `comments` (Array of ObjectIds, ref: Comment)
- `tags` (Array of Strings)
- `timestamps` (createdAt, updatedAt)

### Comment Schema

- `text` (String, required)
- `blog` (ObjectId, ref: Blog)
- `user` (ObjectId, ref: User)
- `timestamps` (createdAt, updatedAt)

## 🧪 Testing with Postman

The project includes Postman collection and environment files in the `postman/` directory:

1. Import `Blog Platform API.postman_collection.json` into Postman
2. Import `Blog Platform API Environment.postman_environment.json`
3. Set up your environment variables (base URL, auth token)
4. Test all endpoints using the provided collection

## 🔒 Security Features

- **Password Hashing:** All passwords are hashed using bcryptjs
- **JWT Authentication:** Secure token-based authentication
- **Input Validation:** All inputs are validated using express-validator
- **Error Handling:** Comprehensive error handling with proper HTTP status codes
- **Route Protection:** Protected routes require valid JWT tokens
- **404 Handling:** Undefined routes return proper 404 error responses
- **Global Error Handling:** Centralized error handling for all uncaught errors

## 🌟 API Response Format

### Success Response

```json
{
  "status": "success",
  "data": {
    // Response data
  }
}
```

### Error Response

```json
{
  "status": "error",
  "message": "Error description",
  "errors": [
    // Validation errors if any
  ]
}
```

### 404 Error Response (Undefined Routes)

```json
{
  "status": "error",
  "message": "Route /api/undefined-route not found"
}
```

## 🚀 Deployment

### Live Deployment

The API is currently deployed on Vercel and accessible at:
**[https://blog-platform-api-assignment.vercel.app](https://blog-platform-api-assignment.vercel.app)**

### Vercel Configuration

The project includes a `vercel.json` file configured for serverless deployment:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
JWT_EXPIRES_IN=7d
```

### Docker Deployment (Optional)

You can containerize this application using Docker. Create a `Dockerfile` in the root directory for deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📞 Support

For any questions or issues, please contact the development team or create an issue in the repository.

---

**Technical Assignment by EBpearls - Successfully completed by [Ashutosh-88](https://github.com/Ashutosh-88)** - A comprehensive blog platform API demonstrating modern backend development practices with Node.js and Express.js.

**Author:** [Ashutosh-88](https://github.com/Ashutosh-88)
