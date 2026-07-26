import React from 'react';
import Card from '../ui/Card';
import { PlusCircle } from 'lucide-react';

const NewTask = ({ data }) => {
  const count = data?.tasks?.filter(task => task.newTask).length || 0;
  return (
    <Card className="flex flex-col justify-between h-[140px] border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-surface hover:-translate-y-1 transition-transform duration-300">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-semibold tracking-wide text-blue-400 uppercase">New Tasks</h3>
        <span className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
          <PlusCircle size={20} />
        </span>
      </div>
      <h2 className="text-4xl font-bold text-text-main">{count}</h2>
    </Card>
  );
};

export default NewTask;