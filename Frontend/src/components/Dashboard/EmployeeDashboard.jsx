import React from 'react';
import DashboardLayout from '../ui/DashboardLayout';
import AttendanceOverview from '../ui/AttendanceOverview';
import TaskList from '../../other/TaskList';

const EmployeeDashboard = ({ data }) => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3">
          <TaskList data={data} />
        </div>
        <div className="lg:col-span-1">
          <AttendanceOverview data={data} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;