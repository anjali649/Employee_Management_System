import React, { useContext, useState } from 'react';
import { createEmployeeRequest, getEmployeesRequest, updateEmployeeRequest, deleteEmployeeRequest } from '../utils/api';
import DashboardLayout from '../components/ui/DashboardLayout';
import Card from '../components/ui/Card';
import { AuthContext } from '../context/AuthProvider';
import { Search } from 'lucide-react';

const EmployeesPage = () => {
  const { userData, setUserData  } = useContext(AuthContext);
  const employees = userData?.employees || [];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showEditEmployee, setShowEditEmployee] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
  name: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  role: "employee",
  skills: "",
  emergencyContact: {
    name: "",
    relation: "",
    phone: "",
  },
});

const [editEmployee, setEditEmployee] = useState({
  _id: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  role: "employee",
  skills: "",
  emergencyContact: {
    name: "",
    relation: "",
    phone: "",
  },
});

const handleAddEmployee = async () => {
  try {
    await createEmployeeRequest({
      ...newEmployee,
      skills: newEmployee.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    });

    // Refresh employee list
    const employees = await getEmployeesRequest();

    setUserData({
      ...userData,
      employees,
    });

    // Reset form
    setNewEmployee({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      role: "employee",
      skills: "",
      emergencyContact: {
        name: "",
        relation: "",
        phone: "",
      },
    });

    // Close popup
    setShowAddEmployee(false);

    alert("Employee added successfully!");
  } catch (err) {
    alert(err.message);
  }
};

const handleUpdateEmployee = async () => {
  try {
    await updateEmployeeRequest(editEmployee._id, {
      ...editEmployee,
      skills: editEmployee.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    });

    const employees = await getEmployeesRequest();

    setUserData({
      ...userData,
      employees,
    });

    setShowEditEmployee(false);

    alert("Employee updated successfully!");

  } catch (err) {
    console.error(err);
    alert("Failed to update employee.");
  }
};

const handleDeleteEmployee = async () => {
  if (!selectedEmployee) return;

  const confirmDelete = window.confirm(
    `Are you sure you want to delete ${selectedEmployee.name}?`
  );

  if (!confirmDelete) return;

  try {
    await deleteEmployeeRequest(selectedEmployee._id);

    const employees = await getEmployeesRequest();

    setUserData({
      ...userData,
      employees,
    });

    setSelectedEmployee(null);

    alert("Employee deleted successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to delete employee.");
  }
};

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">

    <h2 className="text-2xl font-bold">
        Employee Directory
    </h2>

    <div className="flex items-center gap-3">

        <div className="relative">
            <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />

            <input
                type="text"
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg bg-surface border border-border text-sm w-64"
            />
        </div>

        <button
         onClick={() => setShowAddEmployee(true)}
            className="bg-primary hover:opacity-90 text-white px-4 py-2 rounded-lg font-medium transition"
        >
            + Add Employee
        </button>

    </div>

</div>

      <Card noPadding>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-muted uppercase border-b border-border bg-surface-hover/50">
              <tr>
                <th className="px-6 py-4">Employee Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4 text-center">Active Tasks</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => {
                const activeTasks = emp.tasks?.filter(t => !t.completed && t.active).length || 0;
                return (
                  <tr key={emp._id} onClick={() => setSelectedEmployee(emp)} className="border-b border-border hover:bg-surface-hover/50 transition-colors cursor-pointer">
                    <td className="px-6 py-4 font-medium flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                        {emp.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                      {emp.name}
                    </td>
                    <td className="px-6 py-4 text-text-muted">{emp.email}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-primary/10 text-primary py-1 px-3 rounded-full text-xs font-bold">
                        {activeTasks} Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-emerald-500/10 text-emerald-400 py-1 px-3 rounded-full text-xs font-bold">
                        Active
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-text-muted">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      {selectedEmployee && (
  <Card className="mt-6">
    <div className="flex justify-between items-center mb-4">

        <h3 className="text-xl font-bold">
          Employee Details
        </h3>

    <div className="flex gap-2">
      <button
        onClick={() => {
          setEditEmployee({
            ...selectedEmployee,
            skills: selectedEmployee.skills?.join(", ") || "",
          });

          setShowEditEmployee(true);
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        ✏️ Edit
      </button>

      <button
        onClick={handleDeleteEmployee}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
      >
        🗑 Delete
      </button>
    </div>

    </div>

    <div className="grid grid-cols-2 gap-6">

      <div>
        <p><strong>Name:</strong> {selectedEmployee.name}</p>
        <p><strong>Email:</strong> {selectedEmployee.email}</p>
        <p><strong>Phone:</strong> {selectedEmployee.phone || "Not Added"}</p>
        <p><strong>Address:</strong> {selectedEmployee.address || "Not Added"}</p>
      </div>

      <div>
        <p>
          <strong>Skills:</strong>{" "}
          {selectedEmployee.skills?.length
            ? selectedEmployee.skills.join(", ")
            : "No Skills"}
        </p>

        <p className="mt-3 font-semibold">
          Emergency Contact
        </p>

        <p>
          {selectedEmployee.emergencyContact?.name || "Not Added"}
        </p>

        <p>
          {selectedEmployee.emergencyContact?.relation || ""}
        </p>

        <p>
          {selectedEmployee.emergencyContact?.phone || ""}
        </p>
      </div>

    </div>

    <div className="mt-6">
      <h4 className="font-bold mb-2">
        Assigned Tasks
      </h4>

      {selectedEmployee.tasks?.map((task) => (
        <div
          key={task._id}
          className="border rounded-lg p-3 mb-2"
        >
          <p className="font-semibold">
            {task.taskTitle}
          </p>

          <p className="text-sm">
            {task.taskDescription}
          </p>

          <p className="text-xs text-gray-500">
            {task.category}
          </p>
        </div>
      ))}
    </div>
  </Card>
)}
    
  
  {showAddEmployee && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-surface border border-border rounded-xl w-full max-w-2xl p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          Add Employee
        </h2>

        <button
          onClick={() => setShowAddEmployee(false)}
          className="text-xl"
        >
          ✕
        </button>
      </div>

      <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2">

  <h3 className="text-lg font-semibold">Personal Information</h3>

  <input
    type="text"
    placeholder="Employee Name"
    value={newEmployee.name}
    onChange={(e) =>
      setNewEmployee({ ...newEmployee, name: e.target.value })
    }
    className="w-full p-3 rounded-lg bg-surface-hover border border-border"
  />

  <input
    type="email"
    placeholder="Email"
    value={newEmployee.email}
    onChange={(e) =>
      setNewEmployee({ ...newEmployee, email: e.target.value })
    }
    className="w-full p-3 rounded-lg bg-surface-hover border border-border"
  />

  <input
    type="password"
    placeholder="Password"
    value={newEmployee.password}
    onChange={(e) =>
      setNewEmployee({ ...newEmployee, password: e.target.value })
    }
    className="w-full p-3 rounded-lg bg-surface-hover border border-border"
  />

  <input
    type="text"
    placeholder="Phone Number"
    value={newEmployee.phone}
    onChange={(e) =>
      setNewEmployee({ ...newEmployee, phone: e.target.value })
    }
    className="w-full p-3 rounded-lg bg-surface-hover border border-border"
  />

  <textarea
    placeholder="Address"
    value={newEmployee.address}
    onChange={(e) =>
      setNewEmployee({ ...newEmployee, address: e.target.value })
    }
    className="w-full p-3 rounded-lg bg-surface-hover border border-border"
    rows={3}
  />

  <select
    value={newEmployee.role}
    onChange={(e) =>
      setNewEmployee({ ...newEmployee, role: e.target.value })
    }
    className="w-full p-3 rounded-lg bg-surface-hover border border-border"
  >
    <option value="employee">Employee</option>
    <option value="admin">Admin</option>
  </select>

  <input
    type="text"
    placeholder="Skills (React, Node.js, Python)"
    value={newEmployee.skills}
    onChange={(e) =>
      setNewEmployee({ ...newEmployee, skills: e.target.value })
    }
    className="w-full p-3 rounded-lg bg-surface-hover border border-border"
  />

  <hr className="border-border my-2" />

  <h3 className="text-lg font-semibold">Emergency Contact</h3>

  <input
    type="text"
    placeholder="Contact Name"
    value={newEmployee.emergencyContact.name}
    onChange={(e) =>
      setNewEmployee({
        ...newEmployee,
        emergencyContact: {
          ...newEmployee.emergencyContact,
          name: e.target.value,
        },
      })
    }
    className="w-full p-3 rounded-lg bg-surface-hover border border-border"
  />

  <input
    type="text"
    placeholder="Relation"
    value={newEmployee.emergencyContact.relation}
    onChange={(e) =>
      setNewEmployee({
        ...newEmployee,
        emergencyContact: {
          ...newEmployee.emergencyContact,
          relation: e.target.value,
        },
      })
    }
    className="w-full p-3 rounded-lg bg-surface-hover border border-border"
  />

  <input
    type="text"
    placeholder="Emergency Contact Phone"
    value={newEmployee.emergencyContact.phone}
    onChange={(e) =>
      setNewEmployee({
        ...newEmployee,
        emergencyContact: {
          ...newEmployee.emergencyContact,
          phone: e.target.value,
        },
      })
    }
    className="w-full p-3 rounded-lg bg-surface-hover border border-border"
  />

</div>
<div className="flex justify-end gap-3 mt-6">

  <button
    onClick={() => setShowAddEmployee(false)}
    className="px-4 py-2 rounded-lg border border-border"
  >
    Cancel
  </button>

  <button
    onClick={handleAddEmployee}
    className="bg-primary text-white px-4 py-2 rounded-lg"
  >
    Add Employee
  </button>

</div>
    </div>

  </div>
)}

{showEditEmployee && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-surface border border-border rounded-xl w-full max-w-2xl p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          Save Changes
        </h2>

        <button
          onClick={() => setShowEditEmployee(false)}
          className="text-xl"
        >
          ✕
        </button>
      </div>

      <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2">

  <h3 className="text-lg font-semibold">Personal Information</h3>

  <input
    type="text"
    placeholder="Employee Name"
    value={editEmployee.name}
    onChange={(e) =>
      setEditEmployee({ ...editEmployee, name: e.target.value })
    }
    className="w-full p-3 rounded-lg bg-surface-hover border border-border"
  />

  <input
    type="password"
    placeholder="Password"
    value={editEmployee.password}
    onChange={(e) =>
      setEditEmployee({ ...editEmployee, password: e.target.value })
    }
    className="w-full p-3 rounded-lg bg-surface-hover border border-border"
  />

  <input
    type="text"
    placeholder="Phone Number"
    value={editEmployee.phone}
    onChange={(e) =>
      setEditEmployee({ ...editEmployee, phone: e.target.value })
    }
    className="w-full p-3 rounded-lg bg-surface-hover border border-border"
  />

  <textarea
    placeholder="Address"
    value={editEmployee.address}
    onChange={(e) =>
      setEditEmployee({ ...editEmployee, address: e.target.value })
    }
    className="w-full p-3 rounded-lg bg-surface-hover border border-border"
    rows={3}
  />

  <select
    value={editEmployee.role}
    onChange={(e) =>
      setEditEmployee({ ...editEmployee, role: e.target.value })
    }
    className="w-full p-3 rounded-lg bg-surface-hover border border-border"
  >
    <option value="employee">Employee</option>
    <option value="admin">Admin</option>
  </select>

  <input
    type="text"
    placeholder="Skills (React, Node.js, Python)"
    value={editEmployee.skills}
    onChange={(e) =>
      setEditEmployee({ ...editEmployee, skills: e.target.value })
    }
    className="w-full p-3 rounded-lg bg-surface-hover border border-border"
  />

  <hr className="border-border my-2" />

  <h3 className="text-lg font-semibold">Emergency Contact</h3>

  <input
    type="text"
    placeholder="Contact Name"
    value={editEmployee.emergencyContact.name}
    onChange={(e) =>
      setEditEmployee({
        ...editEmployee,
        emergencyContact: {
          ...editEmployee.emergencyContact,
          name: e.target.value,
        },
      })
    }
    className="w-full p-3 rounded-lg bg-surface-hover border border-border"
  />

  <input
    type="text"
    placeholder="Relation"
    value={editEmployee.emergencyContact.relation}
    onChange={(e) =>
      setEditEmployee({
        ...editEmployee,
        emergencyContact: {
          ...editEmployee.emergencyContact,
          relation: e.target.value,
        },
      })
    }
    className="w-full p-3 rounded-lg bg-surface-hover border border-border"
  />

  <input
    type="text"
    placeholder="Emergency Contact Phone"
    value={editEmployee.emergencyContact.phone}
    onChange={(e) =>
      setEditEmployee({
        ...editEmployee,
        emergencyContact: {
          ...editEmployee.emergencyContact,
          phone: e.target.value,
        },
      })
    }
    className="w-full p-3 rounded-lg bg-surface-hover border border-border"
  />

</div>
<div className="flex justify-end gap-3 mt-6">

  <button
    onClick={() => setShowEditEmployee(false)}
    className="px-4 py-2 rounded-lg border border-border"
  >
    Cancel
  </button>

  <button
    onClick={handleAddEmployee}
    className="bg-primary text-white px-4 py-2 rounded-lg"
  >
    Save Changes
  </button>

</div>
    </div>

  </div>
)}

    </DashboardLayout>
  );
};

export default EmployeesPage;
