import {
  LayoutDashboard,
  ListTodo,
  Bot,
  BarChart3,
  Settings,
} from "lucide-react";

const menus = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Tasks", icon: ListTodo, active: false },
  { label: "AI Coach", icon: Bot, active: false },
  { label: "Analytics", icon: BarChart3, active: false },
  { label: "Settings", icon: Settings, active: false },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-[calc(100vh-65px)] border-r border-slate-200/80 bg-white/60 backdrop-blur-sm p-5 shrink-0">
      <p className="text-slate-400 uppercase text-[11px] font-semibold tracking-wider mb-4 px-3">
        Menu
      </p>

      <nav className="space-y-1">
        {menus.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              active
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Icon className="w-[18px] h-[18px]" strokeWidth={active ? 2.25 : 2} />
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6">
        <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 p-4">
          <p className="text-xs font-semibold text-indigo-900">Pro Tip</p>
          <p className="text-xs text-indigo-700/80 mt-1 leading-relaxed">
            Use AI Coach to prioritize your tasks and build a focused schedule.
          </p>
        </div>
      </div>
    </aside>
  );
}
