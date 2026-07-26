import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Plus, Check, Zap } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { createTaskRequest } from '../utils/api.js';

const CATEGORIES = [
    { label: "Design", icon: "🎨", color: "text-purple-400", border: "border-purple-400", bg: "bg-purple-400/10", shadow: "shadow-purple-400/20" },
    { label: "Development", icon: "💻", color: "text-emerald-400", border: "border-emerald-400", bg: "bg-emerald-400/10", shadow: "shadow-emerald-400/20" },
    { label: "Backend", icon: "⚙️", color: "text-blue-400", border: "border-blue-400", bg: "bg-blue-400/10", shadow: "shadow-blue-400/20" },
    { label: "Frontend", icon: "🖥️", color: "text-pink-400", border: "border-pink-400", bg: "bg-pink-400/10", shadow: "shadow-pink-400/20" },
    { label: "DevOps", icon: "🚀", color: "text-orange-400", border: "border-orange-400", bg: "bg-orange-400/10", shadow: "shadow-orange-400/20" },
    { label: "Testing", icon: "🧪", color: "text-yellow-400", border: "border-yellow-400", bg: "bg-yellow-400/10", shadow: "shadow-yellow-400/20" },
    { label: "Database", icon: "🗄️", color: "text-teal-400", border: "border-teal-400", bg: "bg-teal-400/10", shadow: "shadow-teal-400/20" },
    { label: "Documentation", icon: "📄", color: "text-slate-400", border: "border-slate-400", bg: "bg-slate-400/10", shadow: "shadow-slate-400/20" },
    { label: "Management", icon: "📋", color: "text-red-400", border: "border-red-400", bg: "bg-red-400/10", shadow: "shadow-red-400/20" },
];

const CreateTaskAdmin = ({ data }) => {
    const { userData, setUserData } = useContext(AuthContext) || { userData: null, setUserData: () => { } };

    const [form, setForm] = useState({
        title: "", description: "", dueDate: "", assignedTo: "", category: "",
    });

    const EMPLOYEES = userData && userData.employees ? userData.employees.map(emp => emp.name) : [
        "Aman Kumar", "Priya Sharma", "Rahul Verma",
        "Sneha Patel", "Anjali Singh", "Divya Nair",
        "Arjun Kapoor", "Karan Mehta",
    ];

    const [submitted, setSubmitted] = useState(false);
    const [empDropdown, setEmpDropdown] = useState(false);

    const selectedCat = CATEGORIES.find(c => c.label === form.category);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title || !form.category || !form.assignedTo) return;

        const newTask = {
            taskTitle: form.title,
            taskDescription: form.description,
            taskDate: form.dueDate,
            category: form.category
        };

        if (userData && userData.employees) {
            // Find the chosen employee in our context
            const empTarget = userData.employees.find(emp => emp.name === form.assignedTo);
            if (!empTarget) {
                alert("Employee not found");
                return;
            }

            try {
                // Call backend
                
                // Call backend
                const updatedEmployeeData = await createTaskRequest(empTarget._id, newTask);

                // Update context to re-render UI
                const updatedEmployees = userData.employees.map(emp => {
                    if (emp._id === empTarget._id) {
                        return updatedEmployeeData; // backend returns the full updated employee
                    }
                    return emp;
                });

                setUserData({ ...userData, employees: updatedEmployees });

                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                    setForm({ title: "", description: "", dueDate: "", assignedTo: "", category: "" });
                }, 2200);

            } catch (error) {
                alert("Failed to create task: " + error.message);
            }
        }
    };

    const field = (key) => ({
        value: form[key],
        onChange: e => setForm(f => ({ ...f, [key]: e.target.value })),
    });

    return (
        <div className="w-full font-sans relative">
            <div className="relative z-10 w-full mx-auto">
                {/* ── Page header ── */}
                <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
                    <div>
                        <div className="flex items-center gap-2.5 mb-1.5">
                            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                                <Zap size={18} fill="currentColor" />
                            </div>
                            <span className="text-[11px] font-bold tracking-widest text-primary uppercase">Admin Toolkit</span>
                        </div>
                        <h2 className="text-3xl font-extrabold text-text-main tracking-tight leading-tight m-0">
                            Create New Task
                        </h2>
                    </div>

                    {/* Quick stats pill */}
                    <div className="flex gap-2">
                        {(() => {
                            let total = 0, active = 0, pending = 0;
                            if (userData && Array.isArray(userData.employees)) {
                                userData.employees.forEach(emp => {
                                    if (Array.isArray(emp.tasks)) {
                                        emp.tasks.forEach(t => {
                                            total++;
                                            if (t.active) active++;
                                            else if (!t.completed && !t.active) pending++;
                                        });
                                    }
                                });
                            }
                            return [
                                { v: total.toString(), l: "Tasks", c: "text-primary" },
                                { v: active.toString(), l: "Active", c: "text-accent" },
                                { v: pending.toString(), l: "Pending", c: "text-yellow-400" }
                            ].map(s => (
                                <div key={s.l} className="bg-surface border border-border rounded-xl py-2.5 px-4 text-center min-w-[64px] shadow-sm">
                                    <div className={`text-lg font-extrabold leading-none ${s.c}`}>{s.v}</div>
                                    <div className="text-[10px] text-text-muted mt-1 font-semibold uppercase tracking-wider">{s.l}</div>
                                </div>
                            ));
                        })()}
                    </div>
                </div>

                {/* ── Main form card ── */}
                <div className="bg-surface/80 border border-border rounded-xl py-9 px-10 backdrop-blur-xl shadow-xl shadow-black/20 relative overflow-hidden">
                    <form onSubmit={handleSubmit}>
                        {/* Title */}
                        <div className="mb-6">
                            <Input
                                label="Task Title"
                                placeholder="e.g. Redesign onboarding flow"
                                {...field("title")}
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <label className="block text-text-muted text-[11px] font-semibold tracking-wider uppercase mb-2">Description</label>
                            <textarea
                                placeholder="Describe what needs to be done, acceptance criteria, and any context…"
                                rows={4}
                                className="w-full bg-background border border-border hover:border-zinc-600 rounded-xl px-4 py-3.5 text-text-main text-sm outline-none transition-all duration-200 focus:bg-primary/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 resize-none leading-relaxed placeholder:text-zinc-600"
                                {...field("description")}
                            />
                        </div>

                        {/* Due Date + Assign To */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <Input
                                    label="Due Date"
                                    type="date"
                                    className="[color-scheme:dark]"
                                    {...field("dueDate")}
                                />
                            </div>

                            {/* Assign To — dropdown */}
                            <div className="relative">
                                <Input
                                    label="Assign To"
                                    placeholder="Search employee…"
                                    value={form.assignedTo}
                                    onChange={e => { setForm(f => ({ ...f, assignedTo: e.target.value })); setEmpDropdown(true) }}
                                    onFocus={() => { setEmpDropdown(true) }}
                                    onBlur={() => { setTimeout(() => setEmpDropdown(false), 150) }}
                                />
                                {empDropdown && (
                                    <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-10 bg-surface border border-border rounded-xl shadow-xl overflow-hidden shadow-black/40">
                                        {EMPLOYEES.filter(e => e.toLowerCase().includes(form.assignedTo.toLowerCase())).map(emp => (
                                            <div
                                                key={emp}
                                                onMouseDown={() => { setForm(f => ({ ...f, assignedTo: emp })); setEmpDropdown(false) }}
                                                className="px-3.5 py-3 text-[13px] text-text-main hover:text-primary cursor-pointer flex items-center gap-2.5 transition-colors hover:bg-primary/10"
                                            >
                                                <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[11px] font-bold text-primary">
                                                    {emp.split(" ").map(n => n.charAt(0)).join("")}
                                                </div>
                                                {emp}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Category — visual pill picker */}
                        <div className="mb-8">
                            <label className="block text-text-muted text-[11px] font-semibold tracking-wider uppercase mb-2">Category</label>
                            <div className="flex flex-wrap gap-2">
                                {CATEGORIES.map(cat => {
                                    const active = form.category === cat.label;
                                    return (
                                        <button
                                            key={cat.label}
                                            type="button"
                                            onClick={() => setForm(f => ({ ...f, category: active ? "" : cat.label }))}
                                            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-[1.5px] text-[12.5px] cursor-pointer transition-all duration-150 ${
                                                active 
                                                    ? `${cat.border}/70 ${cat.bg} ${cat.color} font-bold scale-105 shadow-[0_0_12px] ${cat.shadow}` 
                                                    : "border-border bg-background text-text-muted font-medium hover:border-zinc-500"
                                            }`}
                                        >
                                            <span className="text-sm">{cat.icon}</span>
                                            {cat.label}
                                            {active && (
                                                <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ml-0.5 ${cat.bg} border ${cat.border}/40`}>
                                                    <Check size={10} className="text-current" />
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-[1px] bg-border mb-7" />

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={submitted}
                            size="lg"
                            className={submitted 
                                ? "bg-emerald-500 hover:bg-emerald-500 text-zinc-900 cursor-default shadow-[0_0_20px_rgba(16,185,129,0.3)]" 
                                : ""}
                        >
                            {submitted ? (
                                <>
                                    <Check size={18} className="mr-2" />
                                    Task Created Successfully!
                                </>
                            ) : (
                                <>
                                    <Plus size={18} className="mr-2" />
                                    Create Task
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTaskAdmin;