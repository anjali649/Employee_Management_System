const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
const getToken = () => localStorage.getItem('token');

const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

export const loginRequest = (email, password) =>
  apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const getMeRequest = () => apiFetch('/auth/me');

export const getEmployeesRequest = () => apiFetch('/employees');
export const createEmployeeRequest = (employeeData) =>
  apiFetch('/employees', {
    method: 'POST',
    body: JSON.stringify(employeeData),
  });


export const updateEmployeeRequest = (id, employeeData) =>
  apiFetch(`/employees/${id}`, {
    method: "PUT",
    body: JSON.stringify(employeeData),
  });

export const deleteEmployeeRequest = (id) =>
  apiFetch(`/employees/${id}`, {
    method: "DELETE",
  });

export const createTaskRequest = (employeeId, taskData) =>
  apiFetch(`/tasks/${employeeId}`, {
    method: 'POST',
    body: JSON.stringify(taskData),
  });

export const updateTaskRequest = (employeeId, taskId, taskData) =>
  apiFetch(`/tasks/${employeeId}/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(taskData),
  });

export const deleteTaskRequest = (employeeId, taskId) =>
  apiFetch(`/tasks/${employeeId}/${taskId}`, {
    method: 'DELETE',
  });

export default apiFetch;
