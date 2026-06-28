export default function DashboardCard({ title, value, icon: Icon, accent }) {
  const accents = {
    blue: {
      icon: "bg-blue-50 text-blue-600",
      value: "text-blue-600",
    },
    red: {
      icon: "bg-red-50 text-red-500",
      value: "text-red-500",
    },
    green: {
      icon: "bg-emerald-50 text-emerald-600",
      value: "text-emerald-600",
    },
    amber: {
      icon: "bg-amber-50 text-amber-600",
      value: "text-amber-600",
    },
  };

  const style = accents[accent] || accents.blue;

  return (
    <div className="card p-5 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className={`text-3xl font-bold mt-2 tracking-tight ${style.value}`}>
            {value}
          </p>
        </div>
        {Icon && (
          <div
            className={`flex items-center justify-center w-11 h-11 rounded-xl ${style.icon} transition-transform group-hover:scale-105`}
          >
            <Icon className="w-5 h-5" strokeWidth={2} />
          </div>
        )}
      </div>
    </div>
  );
}
