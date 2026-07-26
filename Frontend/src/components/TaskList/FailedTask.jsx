import React from 'react';
import Card from '../ui/Card';
import { XCircle } from 'lucide-react';

const FailedTask = ({ data }) => {
  const count = data?.tasks?.filter(task => task.failed).length || 0;
  return (
    <Card className="flex flex-col justify-between h-[140px] border-danger/20 bg-gradient-to-br from-danger/10 to-surface hover:-translate-y-1 transition-transform duration-300">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-semibold tracking-wide text-danger uppercase">Failed</h3>
        <span className="p-2 bg-danger/10 rounded-lg text-danger">
          <XCircle size={20} />
        </span>
      </div>
      <h2 className="text-4xl font-bold text-text-main">{count}</h2>
    </Card>
  );
};

export default FailedTask;