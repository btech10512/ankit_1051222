# Task Management System (Kanban Based)

A full‑stack **Task Management System** built using the **MERN stack**, featuring user authentication and a Kanban‑style board for managing tasks across different statuses.

This project was developed as part of an **SDE Assignment** with a focus on clean code, reusability, and end‑to‑end functionality.

---

## 📌 Project Overview

The application allows users to:
- Register, login, and logout securely
- Manage their profile
- Create, update, delete, and view tasks
- Organize tasks using a **Kanban board** with three columns:
  - Pending
  - In Progress
  - Completed
- Drag and drop tasks between columns with state persistence

Each user has **user‑specific tasks**, and all protected routes require authentication.

---

## 🛠 Tech Stack

### Frontend
- **React** (with Vite)
- **React Router DOM** – client‑side routing
- **Context API** – global state management
- **Axios** – API communication
- **@hello‑pangea/dnd** – drag & drop functionality
- **CSS / Tailwind CSS** – styling

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose)
- **JWT** – authentication
- **bcrypt** – password hashing
- **cors** – cross‑origin handling

---

## 📂 Project Structure

```
root/
│
├── backend/      # Express + MongoDB backend
├── frontend/     # React frontend
└── README.md
```

---

## ⚙️ Backend Setup Instructions

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
ACCESS_TOKEN_EXPIRY=1d
CORS_ORIGIN=http://localhost:5173
```

4. Start the backend server:

```bash
npm run dev
```

The backend will run at:
```
http://localhost:5000
```

---

## ⚙️ Frontend Setup Instructions

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the frontend root:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

4. Start the frontend development server:

```bash
npm run dev
```

The frontend will run at:
```
http://localhost:5173
```

---

## 🔐 Environment Variables Configuration

### Backend (`.env`)
| Variable | Description |
|--------|-------------|
| PORT | Backend server port |
| MONGO_URI | MongoDB connection string |
| ACCESS_TOKEN_SECRET | JWT secret key |
| ACCESS_TOKEN_EXPIRY | Token expiration time |
| CORS_ORIGIN | Allowed frontend URL |

### Frontend (`.env`)
| Variable | Description |
|--------|-------------|
| VITE_API_URL | Base API URL for backend |

---

## 📡 API Overview

### Auth Routes
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/v1/auth/register` | Register a new user |
| POST | `/api/v1/auth/login` | Login user |
| POST | `/api/v1/auth/logout` | Logout user |
| GET | `/api/v1/auth/me` | Get current user |

### Task Routes (Protected)
| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/api/v1/tasks` | Get all user tasks |
| POST | `/api/v1/tasks` | Create a new task |
| PATCH | `/api/v1/tasks/:id` | Update task |
| DELETE | `/api/v1/tasks/:id` | Delete task |

Tasks support filtering by status using query params.

---

## 🖼 Screenshots / Demo

> Screenshots or a deployed demo link can be added here.

Example:
```
Login Page
Kanban Dashboard
Task Drag & Drop
```

---

## ✅ Features Checklist

- [x] User Authentication (JWT)
- [x] Protected Routes
- [x] Task CRUD Operations
- [x] Kanban Board UI
- [x] Drag & Drop Tasks
- [x] User‑specific Data
- [x] Clean Folder Structure

---

## 🚀 Future Improvements

- Role‑based access control
- Task priorities & labels
- Due date reminders
- Unit & API testing
- Deployment (Vercel / Render)

---

## 👨‍💻 Author

**Ankit Kumar**  
B.Tech – BIT Mesra  

---

## 📄 License

This project is for educational and evaluation purposes.

