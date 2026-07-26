import React from 'react';
import Card from '../ui/Card';
import { CheckCircle2 } from 'lucide-react';

const CompleteTask = ({ data }) => {
  const count = data?.tasks?.filter(task => task.completed).length || 0;
  return (
    <Card className="flex flex-col justify-between h-[140px] border-primary/20 bg-gradient-to-br from-primary/10 to-surface hover:-translate-y-1 transition-transform duration-300">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-semibold tracking-wide text-primary uppercase">Completed</h3>
        <span className="p-2 bg-primary/10 rounded-lg text-primary">
          <CheckCircle2 size={20} />
        </span>
      </div>
      <h2 className="text-4xl font-bold text-text-main">{count}</h2>
    </Card>
  );
};

export default CompleteTask;