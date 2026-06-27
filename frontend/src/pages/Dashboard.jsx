import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Data Analytics Assignment",
      priority: "High",
      deadline: "Tomorrow",
    },
    {
      id: 2,
      title: "React Dashboard",
      priority: "Medium",
      deadline: "3 Days",
    },
    {
      id: 3,
      title: "LeetCode Practice",
      priority: "Low",
      deadline: "Today",
    },
  ]);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h2 className="text-4xl font-bold mb-8">
            Today's Overview
          </h2>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardCard
              title="Total Tasks"
              value={tasks.length}
              color="text-blue-600"
            />

            <DashboardCard
              title="High Priority"
              value={tasks.filter(task => task.priority === "High").length}
              color="text-red-500"
            />

            <DashboardCard
              title="Completed"
              value={0}
              color="text-green-500"
            />
          </div>

          {/* Task List */}
          <TaskList tasks={tasks} />

          {/* AI Recommendation */}
          <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4">
              🤖 AI Recommendation
            </h2>

            <p className="text-lg text-gray-700">
              Complete your <strong>Data Analytics Assignment</strong> first.
              It has the nearest deadline and requires approximately 4 hours.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}