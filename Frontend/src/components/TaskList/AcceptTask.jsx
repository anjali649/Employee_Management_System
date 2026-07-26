import React from 'react';
import Card from '../ui/Card';
import { PlayCircle } from 'lucide-react';

const AcceptTask = ({ data }) => {
  const count = data?.tasks?.filter(task => task.active).length || 0;
  return (
    <Card className="flex flex-col justify-between h-[140px] border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-surface hover:-translate-y-1 transition-transform duration-300">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-semibold tracking-wide text-emerald-400 uppercase">Active Tasks</h3>
        <span className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
          <PlayCircle size={20} />
        </span>
      </div>
      <h2 className="text-4xl font-bold text-text-main">{count}</h2>
    </Card>
  );
};

export default AcceptTask;