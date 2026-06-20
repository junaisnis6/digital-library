# 📚 Digital Library

A full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** web application that allows users to register, log in, add books, browse available books, send borrow requests, and manage their own digital library.

---

## 🚀 Features

- 🔐 User Authentication (JWT-based Login & Registration)
- 📚 Add, Edit, and Delete Books
- 🖼️ Upload Book Cover Images
- 🔍 Browse All Available Books
- 📖 View and Manage Your Books
- 🤝 Send Borrow Requests
- ✅ Accept or Reject Borrow Requests
- 🛡️ Protected Routes for Authenticated Users
- 📱 Responsive UI built with React and Vanilla CSS

---

## 🛠️ Tech Stack

### Frontend

- React.js (Vite)
- React Router DOM
- Axios
- Vanilla CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (File Uploads)
- bcrypt.js

---

## 📂 Project Structure

```
digital-library/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── router.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/junaisnis6/digital-library.git
cd digital-library
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm run dev
```

The backend will run on:

```
http://localhost:5000
```

---

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:

```
http://localhost:5173
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

### Books

| Method | Endpoint              | Description                |
| ------ | --------------------- | -------------------------- |
| GET    | `/api/books`          | Get all books              |
| GET    | `/api/books/:id`      | Get book by ID             |
| GET    | `/api/books/my-books` | Get logged-in user's books |
| POST   | `/api/books`          | Add a new book             |
| PUT    | `/api/books/:id`      | Update a book              |
| DELETE | `/api/books/:id`      | Delete a book              |

### Requests

| Method | Endpoint                   | Description            |
| ------ | -------------------------- | ---------------------- |
| POST   | `/api/requests`            | Create borrow request  |
| GET    | `/api/requests`            | View received requests |
| PUT    | `/api/requests/accept/:id` | Accept request         |
| PUT    | `/api/requests/reject/:id` | Reject request         |

---

## 🔒 Authentication

This project uses **JSON Web Tokens (JWT)** for authentication.

After logging in:

- The JWT token is stored in `localStorage`.
- Protected routes require a valid token.
- Axios automatically includes the token in request headers.

---

## 📸 Screens

- Home Page
- Login
- Register
- Add Book
- My Books
- Edit Book
- Borrow Requests

---

## 🌟 Future Improvements

- 🔍 Search books by title or author
- 🏷️ Filter by genre and availability
- ❤️ Wishlist/Favorites
- 📅 Borrow history
- 🔔 Notifications for request updates
- 🌙 Dark mode
- 📊 User dashboard with statistics

---

## 👨‍💻 Author

**Junais Nissar**

Built as a MERN Stack project for learning full-stack web development.

---

## 📄 License

This project is for educational purposes and may be modified or extended as needed.
