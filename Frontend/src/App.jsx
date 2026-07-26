import React, { useEffect, useState, useContext } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from './context/AuthProvider.jsx'
import ProtectedRoute from './components/routes/ProtectedRoute.jsx'
import './App.css'
import Login from './components/Auth/Login.jsx'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard.jsx'
import AdminDashboard from './components/Dashboard/AdminDashboard.jsx'
import EmployeesPage from './pages/EmployeesPage.jsx'
import TasksPage from './pages/TasksPage.jsx'
import AttendancePage from './pages/AttendancePage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import { loginRequest, getEmployeesRequest } from './utils/api.js'

export const App = () => {
  const { userData, setUserData, loading } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async (email, password) => {
    try {
      const data = await loginRequest(email, password)
      localStorage.setItem('token', data.token)
      
      if (data.role === 'admin') {
        try {
            const employees = await getEmployeesRequest();
            data.employees = employees;
        } catch (err) {
            console.error("Failed to fetch employees", err);
            data.employees = [];
        }
      }

      setUserData(data)
      navigate(data.role === 'admin' ? '/admin' : '/employee')
    } catch (err) {
      alert(err.message || 'Login failed. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-background text-text-main animate-pulse">
        Loading EMS...
      </div>
    )
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to={userData ? (userData.role === 'admin' ? '/admin' : '/employee') : '/login'}
            replace
          />
        }
      />

      <Route
        path="/login"
        element={
          !userData
            ? <Login handleLogin={handleLogin} />
            : <Navigate to={userData.role === 'admin' ? '/admin' : '/employee'} replace />
        }
      />

      <Route element={<ProtectedRoute user={userData} allowedRole="admin" />}>
        <Route path="/admin" element={<AdminDashboard data={userData} />} />
        <Route path="/admin/employees" element={<EmployeesPage />} />
        <Route path="/admin/tasks" element={<TasksPage data={userData} />} />
        <Route path="/admin/attendance" element={<AttendancePage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
      </Route>

      <Route element={<ProtectedRoute user={userData} allowedRole="employee" />}>
        <Route path="/employee" element={<EmployeeDashboard data={userData} />} />
        <Route path="/employee/tasks" element={<TasksPage data={userData} />} />
        <Route path="/employee/attendance" element={<AttendancePage />} />
        <Route path="/employee/settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}