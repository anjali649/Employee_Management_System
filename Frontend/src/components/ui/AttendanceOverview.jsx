import React from 'react';
import Card from './Card';

const AttendanceOverview = ({ data }) => {
  // Simulated chart data and stats for presentation
  const stats = [
    { label: 'Present', value: '94%', color: 'bg-emerald-400' },
    { label: 'Late', value: '4%', color: 'bg-yellow-400' },
    { label: 'Absent', value: '2%', color: 'bg-danger' }
  ];

  return (
    <Card className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Attendance Overview</h3>
        <select className="bg-surface-hover border border-border text-sm rounded-md px-2 py-1 outline-none text-text-muted">
          <option>Monthly</option>
          <option>Weekly</option>
        </select>
      </div>
      
      {/* Simulated Chart Container */}
      <div className="flex-1 flex items-end justify-between gap-2 overflow-hidden px-2 pb-4">
        {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
          <div key={i} className="w-full bg-primary/20 rounded-t-sm relative group overflow-hidden" style={{ height: `${h}%` }}>
            <div className="absolute bottom-0 w-full bg-primary transition-all duration-300 group-hover:bg-primary-hover" style={{ height: '70%' }}></div>
          </div>
        ))}
      </div>

      {/* Stats legend */}
      <div className="flex justify-between items-center pt-4 border-t border-border mt-4">
        {stats.map(s => (
          <div key={s.label} className="text-center">
            <div className="flex items-center gap-1.5 justify-center mb-1 text-[11px] font-semibold text-text-muted">
              <span className={`w-2 h-2 rounded-full ${s.color}`}></span>
              {s.label}
            </div>
            <div className="font-bold">{s.value}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AttendanceOverview;
