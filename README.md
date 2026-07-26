<div align="Left">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />

  <br />
  <br />
<div align="Left">
# 🚀 Crewline Workforce OS

"Because spreadsheets were starting to think they were HR."

### Modern Role-Based Employee Management System

A scalable, enterprise-inspired **MERN Stack Employee Management System** built with **MongoDB, Express.js, React, and Node.js**, featuring **JWT Authentication**, **Role-Based Access Control (RBAC)**, **Employee Management**, **Attendance Tracking**, **Task Management**, and a modern responsive dashboard.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8?logo=tailwind-css)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

</div>



# 📖 About the Project

**Crewline Workforce OS** is a full-stack Employee Management System designed to simplify workforce management through a secure, scalable, and modern web application.

The system provides administrators with complete control over employees, attendance records, task assignments, notifications, and organizational data, while employees have their own dedicated workspace to manage assigned work and monitor their progress.

Originally developed as a frontend prototype, the application has been transformed into a complete **MERN Stack application** with secure authentication, MongoDB integration, REST APIs, and role-based authorization.

The application follows modern software architecture principles with reusable components, modular backend structure, responsive layouts, and a professional dashboard UI suitable for real-world HR and workforce management.



# ✨ Features

## 🔐 Authentication & Authorization

- Secure JWT Authentication
- Password encryption using bcrypt
- Role-Based Access Control (RBAC)
- Protected API routes
- Persistent login sessions
- Secure logout functionality



## 👨‍💼 Employee Management

Administrators can:

- Add new employees
- Edit employee information
- Delete employees
- Activate/Deactivate employees
- View employee profiles
- Search employees instantly
- Manage departments and designations

Employee records include:

- Name
- Email
- Phone Number
- Department
- Designation
- Joining Date
- Salary
- Employment Status



## 📅 Attendance Management

Built-in attendance module supporting:

- Employee Check-In
- Employee Check-Out
- Working Hours Calculation
- Present / Late / Absent Status
- Daily Attendance Records
- Attendance History

Attendance information stores:

- Date
- Check-In Time
- Check-Out Time
- Working Hours
- Attendance Status

Future enhancements include:

- Attendance Analytics
- Attendance Reports
- Monthly Attendance Summary
- CSV & PDF Export



## ✅ Task Management

Admins can:

- Create Tasks
- Assign Tasks
- Set Categories
- Set Deadlines
- Monitor Progress

Task statuses include:

- Pending
- In Progress
- Completed
- Failed

---

## 📊 Dashboard

Modern dashboard displaying:

- Total Employees
- Active Employees
- Tasks Assigned
- Pending Tasks
- Completed Tasks
- Attendance Overview
- Recent Activities
- Notifications

Future analytics:

- Department Performance
- Monthly Reports
- Employee Productivity
- Attendance Charts

---

## 🔔 Notifications

Built-in notification system:

- Task Assigned
- Task Updated
- Attendance Alerts
- System Notifications
- Important Announcements

---

## 🔎 Search & Filtering

Fast search functionality for:

- Employees
- Tasks
- Attendance

Advanced filtering by:

- Department
- Status
- Date
- Employee

---

## 🎨 Modern User Interface

Designed with a clean enterprise dashboard inspired by modern SaaS applications.

Features include:

- Responsive Layout
- Professional Sidebar Navigation
- Clean Dashboard Cards
- Beautiful Data Tables
- Animated Components
- Consistent Design System
- Dark/Light Ready Architecture
- Mobile Friendly Layout

---

# 🛠 Technology Stack

## Frontend

- React 19
- Vite
- Tailwind CSS v4
- React Router DOM
- Context API
- Lucide React Icons
- Axios

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- dotenv
- cors

---

## Database

MongoDB Atlas

Collections include:

- Users
- Tasks
- Attendance
- Departments
- Notifications
- Projects

---

# 📂 Project Structure

```text
Employee-Management-System/
│
├── Frontend/
│   ├── src/
│   │
│   ├── components/
│   │   ├── Auth/
│   │   ├── Dashboard/
│   │   ├── Employees/
│   │   ├── Attendance/
│   │   ├── Tasks/
│   │   ├── Notifications/
│   │   └── Shared/
│   │
│   ├── pages/
│   ├── context/
│   ├── hooks/
│   ├── utils/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── seed.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Install:

- Node.js (v18 or later)
- MongoDB Atlas Account
- Git
`

---

# Backend Setup

```bash
cd backend

npm install
```

Create a `.env`

```env
PORT=5001

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Start backend

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

Open

```
http://localhost:5173
```

---

# Default Admin Login

```text
Email:
anjali@gmail.com

Password:
Anjali@123
```

> Replace these with your own seeded admin credentials if you've customized them.

---

# API Features

Authentication

```
POST /api/auth/login
POST /api/auth/register
```

Employees

```
GET /api/employees

POST /api/employees

PUT /api/employees/:id

DELETE /api/employees/:id
```

Attendance

```
GET /api/attendance/:employeeId

POST /api/attendance/:employeeId/mark

POST /api/attendance/check-in

POST /api/attendance/check-out
```

Tasks

```
GET /api/tasks

POST /api/tasks

PUT /api/tasks/:id

DELETE /api/tasks/:id
```

---

# Security Features

- JWT Authentication
- Password Hashing
- Protected Routes
- Role-Based Authorization
- Environment Variables
- Secure API Architecture

---

# Future Improvements

- Employee Dashboard
- Admin Dashboard Analytics
- Attendance Charts
- Leave Management
- Payroll Module
- Performance Reviews
- Project Management
- Team Calendar
- Email Notifications
- File Uploads
- Profile Pictures
- Report Generation
- PDF & Excel Export
- Two-Factor Authentication
- Dark Mode


---

# Deployment

- Render

---

# Contributing

Contributions are welcome.

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/FeatureName
```

3. Commit your changes

```bash
git commit -m "Added Feature"
```

4. Push to GitHub

```bash
git push origin feature/FeatureName
```

5. Open a Pull Request

---


<div align="Left">

 ⭐ If you like this project, don't forget to star the repository!

**Built with ❤️ using React, Node.js, Express, MongoDB & Tailwind CSS**

</div>
