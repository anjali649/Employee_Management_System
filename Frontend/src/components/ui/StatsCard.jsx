import React from 'react';
import Card from './Card';

const StatsCard = ({ title, value, icon, colorClass = 'text-primary' }) => {
  return (
    <Card className="flex items-center gap-4 p-6 transition-all hover:shadow-lg hover:-translate-y-1">
      <div className={`p-4 rounded-xl bg-opacity-10 dark:bg-opacity-20 flex-shrink-0 ${colorClass.replace('text-', 'bg-')} ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-text-muted font-medium mb-1">{title}</p>
        <h3 className={`text-2xl font-bold ${colorClass}`}>{value}</h3>
      </div>
    </Card>
  );
};

export default StatsCard;
