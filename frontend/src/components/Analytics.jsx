import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { BarChart3 } from "lucide-react";

const STATUS_COLORS = ["#10b981", "#f43f5e"];
const PRIORITY_COLORS = {
  High: "#ef4444",
  Medium: "#f59e0b",
  Low: "#10b981",
};

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-slate-200 text-sm">
      <p className="font-medium text-slate-700">{label || payload[0].name}</p>
      <p className="text-indigo-600 font-semibold">{payload[0].value} tasks</p>
    </div>
  );
}

export default function Analytics({ tasks }) {
  const pieData = [
    { name: "Completed", value: tasks.filter((t) => t.completed).length },
    { name: "Pending", value: tasks.filter((t) => !t.completed).length },
  ];

  const priorityData = [
    { name: "High", value: tasks.filter((t) => t.priority === "High").length, fill: PRIORITY_COLORS.High },
    { name: "Medium", value: tasks.filter((t) => t.priority === "Medium").length, fill: PRIORITY_COLORS.Medium },
    { name: "Low", value: tasks.filter((t) => t.priority === "Low").length, fill: PRIORITY_COLORS.Low },
  ];

  const hasData = tasks.length > 0;

  return (
    <section className="mt-8 animate-fade-in">
      <div className="card p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 text-slate-600">
            <BarChart3 className="w-[18px] h-[18px]" />
          </div>
          <div>
            <h2 className="section-title">Task Analytics</h2>
            <p className="section-subtitle">Visual breakdown of your workload</p>
          </div>
        </div>

        {!hasData ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            Add tasks to see analytics charts.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h3 className="text-sm font-medium text-slate-600 text-center mb-4">
                Task Status
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      label={({ name, value }) => (value > 0 ? `${name}: ${value}` : "")}
                    >
                      {pieData.map((_, index) => (
                        <Cell key={index} fill={STATUS_COLORS[index]} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-2">
                {pieData.map((entry, i) => (
                  <div key={entry.name} className="flex items-center gap-2 text-xs text-slate-600">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: STATUS_COLORS[i] }}
                    />
                    {entry.name}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-600 text-center mb-4">
                Priority Distribution
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={priorityData} barSize={40}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 12 }}
                      allowDecimals={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f1f5f9" }} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {priorityData.map((entry, index) => (
                        <Cell key={index} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
