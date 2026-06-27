import { useState } from "react";

export default function AddTaskModal({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("High");
  const [hours, setHours] = useState("");

  const handleSave = () => {
    if (!title || !deadline || !hours) {
      alert("Please fill all fields");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      deadline,
      priority,
      hours,
      completed: false,
    };

    onSave(newTask);

    // Reset form
    setTitle("");
    setDeadline("");
    setPriority("High");
    setHours("");

    // Close modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl w-[450px]">
        <h2 className="text-2xl font-bold mb-6">
          Add New Task
        </h2>

        {/* Task Name */}
        <input
          type="text"
          placeholder="Task Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        {/* Deadline */}
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        {/* Priority */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        {/* Estimated Hours */}
        <input
          type="number"
          placeholder="Estimated Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="w-full border rounded-lg p-3 mb-6"
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}