import React from 'react';
import DashboardLayout from '../components/ui/DashboardLayout';
import TaskList from '../other/TaskList';
import CreateTaskAdmin from '../other/CreateTaskAdmin';
import AllTask from '../other/AllTask';

const TasksPage = ({ data }) => {
  const role = data?.role || 'employee';

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <header className="flex justify-between items-center bg-surface p-6 rounded-lg shadow-sm border border-border">
          <div>
            <h1 className="text-2xl font-bold text-text-main">Tasks</h1>
            <p className="text-text-muted mt-1">Manage and track your tasks.</p>
          </div>
        </header>

        {role === 'admin' && (
          <div className="relative z-20 mb-8">
            <CreateTaskAdmin data={data} />
          </div>
        )}

        {role === 'admin' ? (
          <div className="relative z-10">
            <AllTask />
          </div>
        ) : (
          <div className="bg-surface border border-border rounded-lg p-6 min-h-[400px]">
            <TaskList data={data} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TasksPage;
