import React, { useContext } from 'react';
import DashboardLayout from '../components/ui/DashboardLayout';
import { AuthContext } from '../context/AuthProvider';
import { useTheme } from '../context/ThemeContext';

const SettingsPage = () => {
  const { userData } = useContext(AuthContext);
  const { toggleTheme } = useTheme();

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <header className="flex justify-between items-center bg-surface p-6 rounded-lg shadow-sm border border-border">
          <div>
            <h1 className="text-2xl font-bold text-text-main">Settings</h1>
            <p className="text-text-muted mt-1">Manage your account preferences and settings.</p>
          </div>
        </header>

        <div className="bg-surface border border-border rounded-lg p-8 max-w-4xl">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-text-main mb-4 border-b border-border pb-2">Profile Information</h2>
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-sm text-text-muted">Name</span>
                <span className="font-medium text-text-main">{userData?.name || 'N/A'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-text-muted">Email</span>
                <span className="font-medium text-text-main">{userData?.email || 'N/A'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-text-muted">Role</span>
                <span className="font-medium capitalize text-text-main">{userData?.role || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-text-main mb-4 border-b border-border pb-2">Preferences</h2>
            <div className="flex items-center justify-between py-2">
              <div>
                <span className="font-medium text-text-main block">Display Theme</span>
                <span className="text-sm text-text-muted">Toggle between light and dark mode</span>
              </div>
              <button 
                onClick={toggleTheme}
                className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
              >
                Toggle Theme
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
