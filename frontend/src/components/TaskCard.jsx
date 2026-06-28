import { Calendar, Clock, Trash2 } from "lucide-react";

const priorityStyles = {
  High: "bg-red-50 text-red-700 border-red-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function TaskCard({ task, onDelete, onCompleteTask }) {
  return (
    <div
      className={`card p-5 group hover:-translate-y-0.5 ${
        task.completed ? "opacity-60" : ""
      }`}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex gap-3.5 min-w-0">
          <label className="relative flex items-center cursor-pointer mt-1 shrink-0">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onCompleteTask(task.id)}
              className="peer sr-only"
            />
            <span className="w-5 h-5 rounded-md border-2 border-slate-300 bg-white flex items-center justify-center transition-all peer-checked:bg-indigo-600 peer-checked:border-indigo-600 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500/30">
              {task.completed && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
          </label>

          <div className="min-w-0">
            <h3
              className={`text-base font-semibold truncate ${
                task.completed
                  ? "line-through text-slate-400"
                  : "text-slate-900"
              }`}
            >
              {task.title}
            </h3>

            <div className="flex flex-wrap gap-4 mt-2 text-slate-500 text-xs">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {task.deadline}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {task.hours} hrs
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${priorityStyles[task.priority]}`}
          >
            {task.priority}
          </span>

          <button
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
