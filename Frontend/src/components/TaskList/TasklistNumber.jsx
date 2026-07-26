import React, { useContext } from 'react';
import Card from '../ui/Card';
import { AuthContext } from '../../context/AuthProvider';
import { updateTaskRequest } from '../../utils/api';

const TasklistNumber = ({ data, changeUser }) => {
  const authData = useContext(AuthContext);

  const updateTaskStatus = async (taskIndex, status) => {
    const newTaskArray = [...data.tasks];
    const task = { ...newTaskArray[taskIndex] };
    
    if (status === 'active') {
      task.newTask = false;
      task.active = true;
    } else if (status === 'completed') {
      task.active = false;
      task.completed = true;
    } else if (status === 'failed') {
      task.active = false;
      task.failed = true;
    }
    
    newTaskArray[taskIndex] = task;
    const updatedUser = { ...data, tasks: newTaskArray };
    
    try {
      if (data._id && task._id) {
        await updateTaskRequest(data._id, task._id, task);
      }
      
      if (authData?.setUserData) {
        authData.setUserData(updatedUser);
      }
    } catch (err) {
      alert("Failed to update task: " + err.message);
    }
  };

  return (
    <div id='tasklist' className='flex overflow-x-auto w-full py-4 gap-6 px-1 snap-x pb-8'>
      
      {data?.tasks?.map((task, idx) => {
        let statusText = 'Unknown';
        let statusColor = 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20';
        let borderColor = 'border-border';
        let indicatorColor = 'bg-zinc-500';

        if (task.newTask) {
          statusText = 'New Task';
          statusColor = 'text-blue-400 bg-blue-500/10 border-blue-500/20';
          borderColor = 'border-blue-500/30';
          indicatorColor = 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]';
        } else if (task.completed) {
          statusText = 'Completed';
          statusColor = 'text-primary bg-primary/10 border-primary/20';
          borderColor = 'border-primary/30';
          indicatorColor = 'bg-primary shadow-[0_0_10px_rgba(6,182,212,0.5)]';
        } else if (task.failed) {
          statusText = 'Failed';
          statusColor = 'text-danger bg-danger/10 border-danger/20';
          borderColor = 'border-danger/30';
          indicatorColor = 'bg-danger shadow-[0_0_10px_rgba(239,68,68,0.5)]';
        } else if (task.active) {
          statusText = 'In Progress';
          statusColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
          borderColor = 'border-emerald-500/30';
          indicatorColor = 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]';
        }

        let catColor = 'text-accent bg-accent/10';
        const cat = task.category?.toLowerCase() || '';
        if (cat.includes('design')) catColor = 'text-pink-400 bg-pink-500/10';
        else if (cat.includes('dev')) catColor = 'text-purple-400 bg-purple-500/10';
        else if (cat.includes('test') || cat.includes('qa')) catColor = 'text-orange-400 bg-orange-500/10';
        else if (cat.includes('data')) catColor = 'text-teal-400 bg-teal-500/10';
        else if (cat.includes('front')) catColor = 'text-indigo-400 bg-indigo-500/10';
        else if (cat.includes('back')) catColor = 'text-zinc-300 bg-zinc-500/20';
        else if (cat.includes('management') || cat.includes('finance')) catColor = 'text-emerald-400 bg-emerald-500/10';

        return (
          <Card 
            key={idx} 
            noPadding 
            className={`flex-shrink-0 w-[340px] flex flex-col snap-start hover:-translate-y-1 transition-transform duration-300 ${borderColor}`}
          >
            <div className="p-6 flex flex-col h-full gap-4">
              <div className='flex items-center justify-between'>
                <span className={`text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md uppercase ${catColor}`}>
                  {task.category}
                </span>
                <span className='flex items-center gap-2 text-xs font-semibold text-text-muted'>
                  <div className={`w-2 h-2 rounded-full ${indicatorColor}`}></div>
                  {task.taskDate}
                </span>
              </div>

              <h3 className='text-xl font-bold text-text-main line-clamp-1' title={task.taskTitle}>
                {task.taskTitle}
              </h3>
              
              <p className='text-sm text-text-muted flex-grow line-clamp-3 leading-relaxed'>
                {task.taskDescription}
              </p>
              
              <div className='flex items-center justify-between mt-2 pt-4 border-t border-border'>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${statusColor} uppercase tracking-wider`}>
                  {statusText}
                </span>
                
                {/* Contextual actions based on state */}
                <div className="flex gap-2">
                  {task.active && !task.completed && !task.failed && (
                    <>
                      <button onClick={() => updateTaskStatus(idx, 'completed')} className="text-[11px] font-bold bg-primary/10 text-primary hover:bg-primary hover:text-zinc-950 px-3 py-1.5 rounded-lg transition-colors">Mark Done</button>
                      <button onClick={() => updateTaskStatus(idx, 'failed')} className="text-[11px] font-bold bg-danger/10 text-danger hover:bg-danger hover:text-white px-3 py-1.5 rounded-lg transition-colors">Fail</button>
                    </>
                  )}
                  {task.newTask && (
                    <button onClick={() => updateTaskStatus(idx, 'active')} className="text-[11px] font-bold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-emerald-950 px-4 py-1.5 rounded-lg transition-colors">Accept Task</button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        );
      })}

    </div>
  );
};

export default TasklistNumber;