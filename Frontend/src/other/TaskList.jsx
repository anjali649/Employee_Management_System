import React from 'react';
import AcceptTask from '../components/TaskList/AcceptTask';
import CompleteTask from '../components/TaskList/CompleteTask';
import FailedTask from '../components/TaskList/FailedTask';
import NewTask from '../components/TaskList/NewTask';
import TasklistNumber from '../components/TaskList/TasklistNumber';

const TaskList = ({ data, changeUser }) => {
  return (
    <div className="flex flex-col gap-10">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <NewTask key={`new-${data.id}`} data={data} />
        <AcceptTask key={`acc-${data.id}`} data={data} />
        <CompleteTask key={`com-${data.id}`} data={data} />
        <FailedTask key={`fail-${data.id}`} data={data} />
      </div>
      
      {/* Task Cards Scroll Container */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-text-main px-2">Assigned Tasks</h2>
        <TasklistNumber key={`list-${data.id}`} data={data} changeUser={changeUser} />
      </div>
    </div>
  );
};

export default TaskList;