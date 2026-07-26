import React from 'react';
import DashboardLayout from '../components/ui/DashboardLayout';

const AttendancePage = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <header className="flex justify-between items-center bg-surface p-6 rounded-lg shadow-sm border border-border">
          <div>
            <h1 className="text-2xl font-bold text-text-main">Attendance</h1>
            <p className="text-text-muted mt-1">View and manage attendance records.</p>
          </div>
        </header>

        <div className="bg-surface border border-border rounded-lg p-8 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-text-main mb-2">Attendance Module</h2>
            <p className="text-text-muted">Detailed attendance tracking and reporting will appear here.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AttendancePage;
