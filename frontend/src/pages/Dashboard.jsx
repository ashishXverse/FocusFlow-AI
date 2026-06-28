import { useState, useEffect } from "react";
import {
  ClipboardList,
  Flame,
  CheckCircle2,
  Hourglass,
  TrendingUp,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import TaskList from "../components/TaskList";
import AddTaskModal from "../components/AddTaskModal";
import AIRecommendation from "../components/AIRecommendation";
import Analytics from "../components/Analytics";
import { analyzeTasks } from "../services/gemini";

const defaultTasks = [
  {
    id: 1,
    title: "Data Analytics Assignment",
    priority: "High",
    deadline: "Tomorrow",
    hours: 4,
    completed: false,
  },
  {
    id: 2,
    title: "React Dashboard",
    priority: "Medium",
    deadline: "3 Days",
    hours: 5,
    completed: false,
  },
  {
    id: 3,
    title: "LeetCode Practice",
    priority: "Low",
    deadline: "Today",
    hours: 2,
    completed: false,
  },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : defaultTasks;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [showModal, setShowModal] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleCompleteTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAnalyze = async () => {
    const activeTasks = tasks.filter((task) => !task.completed);

    if (activeTasks.length === 0) {
      setAiResult({
        priorityTask: "All Tasks Completed",
        reason: "Excellent work! There are no pending tasks.",
        estimatedHours: "0 Hours",
        productivityScore: "100%",
        riskLevel: "None",
        tip: "Take a break or add a new task.",
        schedule: [],
      });
      return;
    }

    setLoadingAI(true);

    try {
      const result = await analyzeTasks(activeTasks);
      setAiResult(result);
    } catch (error) {
      console.error(error);
      setAiResult({
        priorityTask: "Analysis Failed",
        reason: "Unable to analyze tasks.",
        estimatedHours: "-",
        productivityScore: "-",
        riskLevel: "-",
        tip: "Please try again.",
        schedule: [],
      });
    }

    setLoadingAI(false);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex max-w-[1600px] mx-auto">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 min-w-0">
          <header className="mb-8 animate-fade-in">
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
              {getGreeting()}
            </h1>
            <p className="text-slate-500 mt-1 text-sm lg:text-base">
              Stay focused and finish today&apos;s goals.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
            <DashboardCard
              title="Total Tasks"
              value={totalTasks}
              accent="blue"
              icon={ClipboardList}
            />
            <DashboardCard
              title="High Priority"
              value={highPriorityTasks}
              accent="red"
              icon={Flame}
            />
            <DashboardCard
              title="Completed"
              value={completedTasks}
              accent="green"
              icon={CheckCircle2}
            />
            <DashboardCard
              title="Pending"
              value={pendingTasks}
              accent="amber"
              icon={Hourglass}
            />
          </div>

          <div className="card p-5 lg:p-6 mt-6 lg:mt-8 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600">
                  <TrendingUp className="w-[18px] h-[18px]" />
                </div>
                <div>
                  <h2 className="section-title">Today&apos;s Progress</h2>
                  <p className="section-subtitle">
                    {completedTasks} of {totalTasks} tasks done
                  </p>
                </div>
              </div>
              <span className="text-2xl font-bold text-emerald-600 tabular-nums">
                {progress}%
              </span>
            </div>

            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <TaskList
            tasks={tasks}
            onAddTask={() => setShowModal(true)}
            onDeleteTask={handleDeleteTask}
            onCompleteTask={handleCompleteTask}
          />

          <AIRecommendation
            loading={loadingAI}
            aiResult={aiResult}
            onAnalyze={handleAnalyze}
          />

          <Analytics tasks={tasks} />
        </main>
      </div>

      {showModal && (
        <AddTaskModal
          onClose={() => setShowModal(false)}
          onSave={handleAddTask}
        />
      )}
    </div>
  );
}
