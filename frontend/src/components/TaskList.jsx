import TaskCard from "./TaskCard";

export default function TaskList({ tasks }) {
  return (
    <div className="mt-8">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-2xl font-bold">
          Today's Tasks
        </h2>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Add Task
        </button>

      </div>

      <div className="space-y-4">

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))}

      </div>

    </div>
  );
}