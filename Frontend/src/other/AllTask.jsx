import React, { useState, useContext, useEffect } from "react"
import { AuthContext } from '../context/AuthProvider'
import { User, Calendar, Edit2, Trash2, Search, ChevronDown, ChevronRight } from 'lucide-react'
import { deleteTaskRequest, updateTaskRequest } from '../utils/api.js'

const CATEGORY_CONFIG = {
  Design:        { color: "text-purple-400", bg: "bg-purple-400/10",  border: "border-purple-400/25", glow: "shadow-[0_0_0_0_rgba(167,139,250,0.15)]", hoverGlow: "hover:shadow-[0_8px_32px_rgba(167,139,250,0.15)]", icon: "🎨", barColor: "from-purple-400/50 to-purple-400" },
  Development:   { color: "text-emerald-400", bg: "bg-emerald-400/10",   border: "border-emerald-400/25", glow: "shadow-[0_0_0_0_rgba(52,211,153,0.15)]", hoverGlow: "hover:shadow-[0_8px_32px_rgba(52,211,153,0.15)]", icon: "💻", barColor: "from-emerald-400/50 to-emerald-400" },
  Backend:       { color: "text-blue-400", bg: "bg-blue-400/10",   border: "border-blue-400/25", glow: "shadow-[0_0_0_0_rgba(96,165,250,0.15)]", hoverGlow: "hover:shadow-[0_8px_32px_rgba(96,165,250,0.15)]", icon: "⚙️", barColor: "from-blue-400/50 to-blue-400" },
  Frontend:      { color: "text-pink-400", bg: "bg-pink-400/10",  border: "border-pink-400/25", glow: "shadow-[0_0_0_0_rgba(244,114,182,0.15)]", hoverGlow: "hover:shadow-[0_8px_32px_rgba(244,114,182,0.15)]", icon: "🖥️", barColor: "from-pink-400/50 to-pink-400" },
  DevOps:        { color: "text-orange-400", bg: "bg-orange-400/10",   border: "border-orange-400/25", glow: "shadow-[0_0_0_0_rgba(251,146,60,0.15)]", hoverGlow: "hover:shadow-[0_8px_32px_rgba(251,146,60,0.15)]", icon: "🚀", barColor: "from-orange-400/50 to-orange-400" },
  Testing:       { color: "text-yellow-400", bg: "bg-yellow-400/10",   border: "border-yellow-400/25", glow: "shadow-[0_0_0_0_rgba(250,204,21,0.15)]", hoverGlow: "hover:shadow-[0_8px_32px_rgba(250,204,21,0.15)]", icon: "🧪", barColor: "from-yellow-400/50 to-yellow-400" },
  Database:      { color: "text-teal-400", bg: "bg-teal-400/10",   border: "border-teal-400/25", glow: "shadow-[0_0_0_0_rgba(45,212,191,0.15)]", hoverGlow: "hover:shadow-[0_8px_32px_rgba(45,212,191,0.15)]", icon: "🗄️", barColor: "from-teal-400/50 to-teal-400" },
  Documentation: { color: "text-slate-400", bg: "bg-slate-400/10",  border: "border-slate-400/25", glow: "shadow-[0_0_0_0_rgba(148,163,184,0.15)]", hoverGlow: "hover:shadow-[0_8px_32px_rgba(148,163,184,0.15)]", icon: "📄", barColor: "from-slate-400/50 to-slate-400" },
  Management:    { color: "text-red-400", bg: "bg-red-400/10",  border: "border-red-400/25", glow: "shadow-[0_0_0_0_rgba(248,113,113,0.15)]", hoverGlow: "hover:shadow-[0_8px_32px_rgba(248,113,113,0.15)]", icon: "📋", barColor: "from-red-400/50 to-red-400" },
}

const STATUS_CONFIG = {
  "Completed":   { color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/25", dot: "bg-emerald-400", label: "Completed" },
  "In Progress": { color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/25", dot: "bg-blue-400", label: "In Progress" },
  "Pending":     { color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/25", dot: "bg-yellow-400", label: "Pending" },
}

function TaskCard({ task, onEdit, onDelete }) {
  const cat = CATEGORY_CONFIG[task.category] || CATEGORY_CONFIG.Documentation
  const st  = STATUS_CONFIG[task.status]    || STATUS_CONFIG.Pending

  return (
    <div className={`bg-surface border border-border rounded-lg p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden flex flex-col`}>
      {/* top accent */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cat.barColor} rounded-t-2xl`} />

      {/* status */}
      <div className="flex justify-end mb-2.5">
        <span className={`flex items-center gap-1.5 ${st.bg} border ${st.border} rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${st.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${st.dot} inline-block`} />
          {st.label}
        </span>
      </div>

      {/* title */}
      <h3 className="text-text-main font-bold text-[15px] mb-1.5 leading-tight">{task.title}</h3>

      {/* description */}
      <p className="text-text-muted text-[12.5px] leading-relaxed mb-3.5 flex-grow line-clamp-2">
        {task.description}
      </p>

      {/* meta */}
      <div className="flex flex-col gap-1.5 mb-3.5 pb-3.5 border-b border-border">
        <div className="flex items-center gap-1.5 text-text-muted text-xs">
          <User size={13} /> <span>{task.assignedTo}</span>
        </div>
        <div className="flex items-center gap-1.5 text-text-muted text-xs">
          <Calendar size={13} /> <span>{task.dueDate}</span>
        </div>
      </div>

      {/* actions */}
      <div className="flex gap-2">
        <button 
          onClick={() => onEdit(task)} 
          className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-400/10 border border-emerald-400/30 rounded-xl py-2 text-emerald-400 text-xs font-semibold cursor-pointer transition-colors duration-200 hover:bg-emerald-400/20"
        >
          <Edit2 size={13} /> Edit
        </button>
        <button 
          onClick={() => onDelete(task.id)} 
          className="flex items-center justify-center bg-red-400/10 border border-red-400/25 rounded-xl px-3.5 py-2 text-red-400 cursor-pointer transition-colors duration-200 hover:bg-red-400/20"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  )
}

function CategorySection({ category, tasks, onEdit, onDelete }) {
  const [collapsed, setCollapsed] = useState(false)
  const cfg = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.Documentation
  const completed  = tasks.filter(t => t.status === "Completed").length
  const inProgress = tasks.filter(t => t.status === "In Progress").length
  const pending    = tasks.filter(t => t.status === "Pending").length

  return (
    <div className="mb-9">
      {/* Category Header */}
      <div
        onClick={() => setCollapsed(c => !c)}
        className={`flex items-center gap-3 ${collapsed ? 'mb-0' : 'mb-5'} cursor-pointer select-none bg-surface-hover/20 border border-border rounded-lg px-5 py-3.5`}
      >
        <span className="text-xl">{cfg.icon}</span>
        <span className={`text-text-main font-bold text-[17px] tracking-tight`}>{category}</span>
        <span className="text-text-muted text-[13px] ml-0.5">— {tasks.length} task{tasks.length !== 1 ? "s" : ""}</span>

        {/* mini counters */}
        <div className="ml-auto flex gap-2 items-center">
          {completed  > 0 && <span className="bg-emerald-400/10 border border-emerald-400/30 rounded-full px-2.5 py-0.5 text-[11px] font-bold text-emerald-400">{completed} done</span>}
          {inProgress > 0 && <span className="bg-blue-400/10 border border-blue-400/30 rounded-full px-2.5 py-0.5 text-[11px] font-bold text-blue-400">{inProgress} active</span>}
          {pending    > 0 && <span className="bg-yellow-400/10 border border-yellow-400/30 rounded-full px-2.5 py-0.5 text-[11px] font-bold text-yellow-500">{pending} pending</span>}
          <span className="text-text-muted text-sm ml-1 transition-transform duration-200">
            {collapsed ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      {!collapsed && tasks.length > 0 && (
        <div className="h-1 rounded-full bg-white/5 mb-4.5 overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${cfg.barColor} rounded-full transition-all duration-500`} 
            style={{ width: `${(completed/tasks.length)*100}%` }}
          />
        </div>
      )}

      {/* Cards */}
      {!collapsed && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete}/>
          ))}
        </div>
      )}
    </div>
  )
}

function AllTask() {
  const { userData, setUserData } = useContext(AuthContext) || { userData: null, setUserData: () => {} };

  const [taskList, setTaskList]   = useState([])
  const [filter, setFilter]       = useState("All")
  const [editTask, setEditTask]   = useState(null)
  const [search, setSearch]       = useState("")

  useEffect(() => {
    if (userData && userData.employees) {
      const allTasks = [];
      userData.employees.forEach(emp => {
        emp.tasks.forEach((task) => {
          let st = "Pending"
          if (task.completed) st = "Completed"
          else if (task.active) st = "In Progress"
          
          allTasks.push({
            id: task._id, // use real mongodb id
            title: task.taskTitle,
            description: task.taskDescription,
            status: st,
            dueDate: task.taskDate,
            category: task.category,
            assignedTo: emp.name,
            employeeId: emp._id, // store employee id for api calls
            originalTask: task
          });
        });
      });
      setTaskList(allTasks);
    }
  }, [userData]);

  const handleDelete = async (id) => {
    const taskToDelete = taskList.find(t => t.id === id);
    if (!taskToDelete || !userData) return;

    try {
        await deleteTaskRequest(taskToDelete.employeeId, taskToDelete.id);

        const updatedEmployees = userData.employees.map(emp => {
            if (emp._id === taskToDelete.employeeId) {
                const newTasks = emp.tasks.filter(t => t._id !== taskToDelete.id);
                return { ...emp, tasks: newTasks };
            }
            return emp;
        });

        setUserData({ ...userData, employees: updatedEmployees });
    } catch (err) {
        alert("Failed to delete task: " + err.message);
    }
  }

  const handleEdit   = (task) => setEditTask({ ...task })
  const handleSave   = async () => {
    const taskToEdit = taskList.find(t => t.id === editTask.id);
    if (!taskToEdit || !userData) return;

    let updatedFields = {
        taskTitle: editTask.title,
        taskDescription: editTask.description,
        taskDate: editTask.dueDate,
        completed: editTask.status === "Completed",
        active: editTask.status === "In Progress",
        newTask: editTask.status === "Pending"
    };

    try {
        const updatedEmployeeData = await updateTaskRequest(taskToEdit.employeeId, taskToEdit.id, updatedFields);

        // API returns the full modified employee
        let newEmployees = [...userData.employees];
        let empIndex = newEmployees.findIndex(e => e._id === taskToEdit.employeeId);
        if (empIndex !== -1) {
            newEmployees[empIndex] = updatedEmployeeData;
        }

        setUserData({ ...userData, employees: newEmployees });
        setEditTask(null)
    } catch (err) {
        alert("Failed to update task: " + err.message);
    }
  }


  const filtered = taskList.filter(t =>
    (filter === "All" || t.status === filter) &&
    (search === "" || t.title.toLowerCase().includes(search.toLowerCase()) || t.assignedTo.toLowerCase().includes(search.toLowerCase()))
  )

  const grouped = filtered.reduce((acc, t) => {
    acc[t.category] = acc[t.category] || []
    acc[t.category].push(t)
    return acc
  }, {})

  const categories = Object.keys(grouped).sort()

  const total     = taskList.length
  const done      = taskList.filter(t => t.status === "Completed").length
  const active    = taskList.filter(t => t.status === "In Progress").length
  const pending   = taskList.filter(t => t.status === "Pending").length

  return (
    <div className="w-full font-sans relative">

      <div className="relative z-10 w-full mx-auto">

        {/* ── Header ── */}
        <div className="mb-9">
          <h2 className="text-[34px] font-extrabold text-text-main tracking-tight mb-1">
            All Tasks
          </h2>
          <p className="text-text-muted text-sm">Organised by category · Click a header to collapse</p>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-7">
          {[
            { label:"Total Tasks",  value: total,  color:"text-text-main", bg:"bg-surface", border:"border-border" },
            { label:"Completed",    value: done,   color:"text-emerald-500", bg:"bg-emerald-500/10", border:"border-emerald-500/20"  },
            { label:"In Progress",  value: active, color:"text-blue-500", bg:"bg-blue-500/10", border:"border-blue-500/20"  },
            { label:"Pending",      value: pending,color:"text-yellow-500", bg:"bg-yellow-500/10", border:"border-yellow-500/20"  },
          ].map(s => (
            <div key={s.label} className={`${s.bg} border ${s.border} rounded-lg p-4`}>
              <div className={`text-[26px] font-extrabold leading-none ${s.color}`}>{s.value}</div>
              <div className="text-xs text-text-muted mt-1.5 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Filter & Search bar ── */}
        <div className="flex flex-col md:flex-row gap-3 mb-8 items-center">
          {/* search */}
          <div className="flex-1 w-full min-w-[200px] relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tasks or assignees…"
              className="w-full bg-surface border border-border rounded-xl py-2.5 pr-3 pl-10 text-text-main text-[13px] outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
          </div>

          {/* status filters */}
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {["All","Pending","In Progress","Completed"].map(s => {
              const active = filter === s
              const col = s === "Completed" ? "emerald" : s === "In Progress" ? "blue" : s === "Pending" ? "yellow" : "slate"
              return (
                <button 
                  key={s} 
                  onClick={() => setFilter(s)} 
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    active 
                      ? `bg-${col}-500/15 border border-${col}-500/40 text-${col}-600 dark:text-${col}-400` 
                      : "bg-surface border border-border text-text-muted hover:bg-surface-hover"
                  }`}
                >
                  {s}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Category sections ── */}
        {categories.length === 0 ? (
          <div className="text-center text-slate-400 py-16 text-[15px]">No tasks match your search.</div>
        ) : (
          categories.map(cat => (
            <CategorySection
              key={cat}
              category={cat}
              tasks={grouped[cat]}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* ── Edit Modal ── */}
      {editTask && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6">
          <div className="bg-surface border border-border rounded-lg p-7 w-full max-w-md shadow-2xl">
            <h2 className="text-text-main text-lg font-bold mb-5">Edit Task</h2>
            <div className="flex flex-col gap-3.5">
              {[
                { key:"title",      label:"Title",       type:"text"   },
                { key:"description",label:"Description", type:"text"   },
                { key:"assignedTo", label:"Assigned To", type:"text"   },
                { key:"dueDate",    label:"Due Date",    type:"date"   },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-text-muted text-[11px] font-semibold uppercase tracking-wider block mb-1.5">{f.label}</label>
                  <input
                    type={f.type}
                    value={editTask[f.key]}
                    onChange={e => setEditTask(t => ({ ...t, [f.key]: e.target.value }))}
                    className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-text-main text-[13px] outline-none transition-colors focus:border-primary/50"
                  />
                </div>
              ))}
              <div>
                <label className="text-text-muted text-[11px] font-semibold uppercase tracking-wider block mb-1.5">Status</label>
                <select
                  value={editTask.status}
                  onChange={e => setEditTask(t => ({ ...t, status: e.target.value }))}
                  className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-text-main text-[13px] outline-none transition-colors"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2.5 mt-6">
              <button 
                onClick={handleSave} 
                className="flex-1 bg-primary hover:bg-primary-hover rounded-xl py-2.5 text-white font-bold text-[13px] transition-colors"
              >
                Save Changes
              </button>
              <button 
                onClick={() => setEditTask(null)} 
                className="flex-1 bg-surface-hover border border-border rounded-xl py-2.5 text-text-muted font-semibold text-[13px] hover:text-text-main transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllTask