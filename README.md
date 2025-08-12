# ToDo Backend API

A RESTful backend API for ToDo application, built with Node.js, Express, and MongoDB (Mongoose).

---

## Repository

**Frontend Repository**: https://github.com/ThePremkumar/todo-frontend.git  
**Backend Repository**: https://github.com/ThePremkumar/todo-backend.git

*Note: Frontend and backend are maintained in separate repositories for independent deployment to different hosting providers.*

---

## Features

- Register and authenticate users (JWT/email/password)
- User-specific task storage (each user sees only their tasks)
- Full CRUD for tasks (`create/read/update/delete`)
- Task fields: title, description, status, priority, due date, completion status
- Robust CORS/JSON/JWT middleware
- Modular Express structure (routes/controllers/models)
- Input validation and error handling
- Secure password hashing with bcrypt
- Token verification middleware

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) installed locally or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- npm or yarn package manager

---

## Getting Started

1. **Clone this repository:**
    ```sh
    git clone https://github.com/ThePremkumar/todo-backend.git
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Setup environment variables:**
   - Create a `.env` file in the project root:
    ```env
    PORT=7001
    MONGO_URI=mongodb://localhost:27017/tododb
    JWT_SECRET=your_very_secure_jwt_secret_here_make_it_long_and_random
    NODE_ENV=development
    ```

4. **Ensure MongoDB is running:**
   - **Local MongoDB:** Start your MongoDB service
   - **MongoDB Atlas:** Use your Atlas connection string in `MONGO_URI`

5. **Start the development server:**
    ```sh
    npm run dev
    ```
    Or for production:
    ```sh
    npm start
    ```
    The server runs at `http://localhost:7001` by default.

---

## Available Scripts

- `npm start` — Start production server
- `npm run dev` — Start development server with nodemon
- `npm test` — Run test suite (if configured)
- `npm run lint` — Run ESLint for code quality

---

## Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js         # MongoDB connection config
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   └── taskController.js   # Task CRUD operations
│   ├── middleware/
│   │   └── auth.js            # JWT verification middlewa
│   ├── models/
│   │   ├── User.js            # User schema and model
│   │   └── Task.js            # Task schema and model
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   └── tasks.js           # Task routes
│   |
│   └── index.js              # App entry point
├── .env                       # Environment variables
├── .gitignore                 # Git ignore rules
├── package.json               # Project dependencies
└── README.md                  # This file
```

---

## API Documentation

### **Base URL**
- Development: `http://localhost:7001`
- Production: `https://your-backend-domain.com`

### **Authentication Endpoints**

#### Register User
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

#### Login User
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

#### Verify Token
- **GET** `/api/auth/verify`
- **Headers:** `x-auth-token: <jwt_token>`
- **Response:**
  ```json
  {
    "success": true,
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

### **Task Endpoints** 
*All endpoints require header: `x-auth-token: <jwt_token>`*

#### Get All Tasks
- **GET** `/api/tasks`
- **Response:**
  ```json
  {
    "success": true,
    "tasks": [
      {
        "_id": "task_id",
        "title": "Complete project",
        "description": "Finish the todo app",
        "status": "pending",
        "priority": "high",
        "completed": false,
        "dueDate": "2025-08-20T10:00:00Z",
        "createdAt": "2025-08-12T08:30:00Z",
        "updatedAt": "2025-08-12T08:30:00Z"
      }
    ]
  }
  ```

#### Create New Task
- **POST** `/api/tasks`
- **Body:**
  ```json
  {
    "title": "New Task",
    "description": "Task description here",
    "status": "pending",
    "priority": "medium",
    "dueDate": "2025-08-25T15:00:00Z"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "task": {
      "_id": "new_task_id",
      "title": "New Task",
      "description": "Task description here",
      "status": "pending",
      "priority": "medium",
      "completed": false,
      "dueDate": "2025-08-25T15:00:00Z",
      "user": "user_id",
      "createdAt": "2025-08-12T09:15:00Z",
      "updatedAt": "2025-08-12T09:15:00Z"
    }
  }
  ```

#### Update Task
- **PUT** `/api/tasks/:id`
- **Body:** (any fields to update)
  ```json
  {
    "title": "Updated Task Title",
    "completed": true,
    "priority": "low"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "task": {
      "_id": "task_id",
      "title": "Updated Task Title",
      "completed": true,
      "priority": "low",
      // ... other fields
    }
  }
  ```

#### Delete Task
- **DELETE** `/api/tasks/:id`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Task deleted successfully"
  }
  ```

---

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Port for API server | No | 7001 |
| `MONGO_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | Secret for JWT signing | Yes | - |
| `NODE_ENV` | Environment mode | No | development |

### Example `.env` file:
```env
PORT=7001
MONGO_URI=mongodb://localhost:27017/tododb
JWT_SECRET=your_super_secure_jwt_secret_key_make_it_very_long_and_random_123456789
NODE_ENV=development

# For MongoDB Atlas (alternative to local MongoDB)
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tododb?retryWrites=true&w=majority
```

---

## Database Schema

### User Model
```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed with bcrypt
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### Task Model
```javascript
{
  title: { type: String, required: true },
  description: { type: String, default: "" },
  status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
  priority: { type: String, enum: ["low", "medium", "high", "critical"], default: "medium" },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date },
  user: { type: ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

---

## CORS Configuration

The backend is configured to allow requests from the frontend:

```javascript
app.use(cors({
  origin: ["http://localhost:5173", "https://your-frontend-domain.com"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "x-auth-token"]
}));
```

**For production:** Update the `origin` array to include your deployed frontend URL.

---

## Security Features

- **Password Hashing**: Uses bcrypt to hash passwords before storing
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Validates all incoming data
- **CORS Protection**: Configured to allow specific origins only
- **Environment Variables**: Sensitive data stored in `.env` file
- **Error Handling**: Proper error responses without exposing system details

---

## Deployment

### Environment Setup for Production

1. **Set environment variables:**
   ```env
   PORT=80
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tododb
   JWT_SECRET=super_secure_production_secret_key
   NODE_ENV=production
   ```

2. **Install production dependencies:**
   ```sh
   npm ci --only=production
   ```

### Popular Hosting Options

#### Heroku
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Connect to MongoDB Atlas
4. Deploy with Git push

#### Railway
1. Connect your GitHub repository
2. Set environment variables
3. Automatic deployment on push

#### DigitalOcean App Platform
1. Create new app from GitHub
2. Configure environment variables
3. Set build and run commands

#### AWS EC2 / VPS
1. Set up Node.js environment
2. Use PM2 for process management
3. Configure nginx as reverse proxy

---

## Connecting Your Frontend

### Frontend Configuration

Set your frontend's API base URL to point to this backend:

**Development:**
```javascript
const API_URL = 'http://localhost:7001';
```

**Production:**
```javascript
const API_URL = 'https://your-backend-domain.com';
```

### Authentication Headers

All authenticated requests must include the JWT token:

```javascript
fetch(`${API_URL}/api/tasks`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': localStorage.getItem('token')
  }
});
```

---

## Development

### Adding New Routes

1. Create route handler in `/src/routes/`
2. Add controller logic in `/src/controllers/`
3. Update models if needed in `/src/models/`
4. Register route in main server file

### Testing API Endpoints

Use tools like:
- **Postman** - GUI for testing APIs
- **curl** - Command line tool
- **Insomnia** - Alternative to Postman
- **VS Code REST Client** - Extension for testing

Example curl command:
```bash
curl -X POST http://localhost:7001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

---

## Troubleshooting

### Common Issues

**MongoDB Connection Error**
```
MongoNetworkError: failed to connect to server
```
- Check if MongoDB is running
- Verify `MONGO_URI` in `.env` file
- For Atlas: Check network access and credentials

**JWT Authentication Error**
```
401 Unauthorized: No token provided
```
- Ensure `x-auth-token` header is included
- Check token format and expiration
- Verify `JWT_SECRET` is set correctly

**CORS Error**
```
Access-Control-Allow-Origin error
```
- Update CORS origins to include your frontend URL
- Check if credentials are properly configured

**Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::7001
```
- Change port in `.env` file
- Kill existing process: `sudo lsof -ti:7001 | xargs kill -9`

**Validation Errors**
- Check request body format
- Ensure all required fields are provided
- Verify data types match schema requirements

### Debug Mode

Enable debug logging by setting:
```env
DEBUG=app:*
NODE_ENV=development
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Add tests for new functionality
5. Commit changes: `git commit -am 'Add new feature'`
6. Push to branch: `git push origin feature-name`
7. Submit a pull request

### Code Style

- Use ESLint for code formatting
- Follow RESTful API conventions
- Add JSDoc comments for functions
- Write descriptive commit messages

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

---

## Support

For questions or issues:
- **Issues**: [GitHub Issues](https://github.com/ThePremkumar/todo-backend/issues)
- **Documentation**: Check this README and inline code comments
- **Email**: [your-email@example.com]

---

## Related

- **Frontend Repository**: [ToDo Frontend](https://github.com/ThePremkumar/todo-frontend)
- **API Documentation**: Available via Postman collection (link if available)
- **Live Demo**: [Backend API](https://your-backend-domain.com) (if deployed)

---

**Happy Coding! 🚀**