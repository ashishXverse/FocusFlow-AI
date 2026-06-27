export default function TaskCard({ task }) {
  const priorityColor = {
    High: "bg-red-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center">

      <div>
        <h3 className="text-xl font-semibold">
          {task.title}
        </h3>

        <p className="text-gray-500">
          Deadline: {task.deadline}
        </p>
      </div>

      <span
        className={`text-white px-4 py-2 rounded-full ${priorityColor[task.priority]}`}
      >
        {task.priority}
      </span>

    </div>
  );
}