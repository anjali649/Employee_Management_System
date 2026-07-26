import React from 'react';
import DashboardLayout from '../ui/DashboardLayout';
import StatsCard from '../ui/StatsCard';
import AllTask from '../../other/AllTask';
import { Users, CheckCircle, Clock } from 'lucide-react';

const AdminDashboard = ({ data }) => {
  const totalEmployees = data?.employees?.length || 0;
  let activeTasks = 0;
  let completedTasks = 0;

  if (data && data.employees) {
    data.employees.forEach(emp => {
      emp.tasks?.forEach(t => {
        if (t.active) activeTasks++;
        if (t.completed) completedTasks++;
      });
    });
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard title="Total Employees" value={totalEmployees} icon={<Users size={20} />} colorClass="text-primary" />
        <StatsCard title="Active Tasks" value={activeTasks} icon={<Clock size={20} />} colorClass="text-accent" />
        <StatsCard title="Completed Tasks" value={completedTasks} icon={<CheckCircle size={20} />} colorClass="text-emerald-400" />
      </div>

      <div className="relative z-10">
        <AllTask /> 
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;