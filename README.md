# <img src="frontend/public/coursehub.svg" alt="CourseHub Logo" width="80" height="80" align="left" />

#  CourseHub

[![GitHub repo](https://img.shields.io/github/repo-size/rusilkoirala/coursehub?color=blue&label=Repo%20Size)](https://github.com/rusilkoirala/coursehub)
[![Open Issues](https://img.shields.io/github/issues/rusilkoirala/coursehub?color=yellow)](https://github.com/rusilkoirala/coursehub/issues)
[![Forks](https://img.shields.io/github/forks/rusilkoirala/coursehub?style=social)](https://github.com/rusilkoirala/coursehub/fork)
[![Stars](https://img.shields.io/github/stars/rusilkoirala/coursehub?style=social)](https://github.com/rusilkoirala/coursehub)

CourseHub is a full-stack project for managing and sharing online courses. It demonstrates backend API design, authentication, course CRUD, and secure file uploads. The project is open-source and intended for learning and showcasing full-stack development skills.

---

##  Project Overview
CourseHub is built with **Express.js** (backend) and **React** (frontend). It features user authentication, course management, lesson organization, and secure video/image uploads using ImageKit. The backend exposes RESTful APIs for all major operations.

---

##  Features
-  User registration and login (JWT authentication)
-  Protected routes and role-based access (admin/user)
-  Course CRUD (admin only)
-  Course enrollment (no payment required)
-  Lesson management (video/content per course)
-  ImageKit integration for secure uploads
-  Secure cookies, CORS, Helmet for security

---

##  Tech Stack
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, Helmet, CORS, Cookie-Parser, ImageKit SDK
- **Frontend**: React, Vite, Tailwind CSS

---

##  Folder Structure
```
backend/
  config/
  controllers/
  middlewares/
  models/
  routes/
  utils/
  server.js
frontend/
  public/
  src/
    api/
    components/
    context/
    pages/
    main.jsx
  index.html
  package.json
```

---

## 🏃‍♂️ How to Run Locally
1. Clone the repo
   ```sh
   git clone https://github.com/rusilkoirala/coursehub.git
   cd coursehub
   ```
2. Setup backend:
   ```sh
   cd backend
   npm install
   npm start
   ```
   > **Important:** Create a `.env` file in the `backend` folder before starting the server. Add the following keys:
   > ```env
   > MONGO_URI=your_mongodb_connection_string
   > FRONTEND_URL=http://localhost:5173
   > IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   > IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   > IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   > JWT_SECRET=your_jwt_secret
   > PORT=5000
   > ```
   > Replace the values with your own credentials.
3. Setup frontend:
   ```sh
   cd ../frontend
   npm install
   npm run dev
   ```
4. Open browser:
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:5000](http://localhost:5000)

---


---

##  Open Source & Learning
This project is open-source and learning-oriented. Feel free to use, fork, or contribute!

---

> Maintained by [@rusilkoirala](https://github.com/rusilkoirala) • Made for learning and sharing 🚀 Made with lots of love!

BYEEE
