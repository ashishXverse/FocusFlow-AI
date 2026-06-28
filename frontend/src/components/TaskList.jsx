import { Plus, ListTodo } from "lucide-react";
import TaskCard from "./TaskCard";

export default function TaskList({
  tasks,
  onAddTask,
  onDeleteTask,
  onCompleteTask,
}) {
  const pendingCount = tasks.filter((t) => !t.completed).length;

  return (
    <section className="mt-8 animate-fade-in">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 text-slate-600">
            <ListTodo className="w-[18px] h-[18px]" />
          </div>
          <div>
            <h2 className="section-title">Today&apos;s Tasks</h2>
            <p className="section-subtitle">
              {pendingCount} pending · {tasks.length} total
            </p>
          </div>
        </div>

        <button onClick={onAddTask} className="btn-primary">
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 mb-4">
            <ListTodo className="w-7 h-7" />
          </div>
          <h3 className="text-base font-semibold text-slate-700">
            No tasks yet
          </h3>
          <p className="text-sm text-slate-500 mt-1.5 max-w-xs mx-auto">
            Create your first task to start tracking your productivity.
          </p>
          <button onClick={onAddTask} className="btn-primary mt-5">
            <Plus className="w-4 h-4" />
            Create Task
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onCompleteTask={onCompleteTask}
            />
          ))}
        </div>
      )}
    </section>
  );
}
