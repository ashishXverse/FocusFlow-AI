export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white shadow-lg p-6">

      <h2 className="text-xl font-bold mb-8">
        Dashboard
      </h2>

      <ul className="space-y-5">

        <li className="cursor-pointer hover:text-blue-600">
          🏠 Dashboard
        </li>

        <li className="cursor-pointer hover:text-blue-600">
          ✅ Tasks
        </li>

        <li className="cursor-pointer hover:text-blue-600">
          📅 Calendar
        </li>

        <li className="cursor-pointer hover:text-blue-600">
          🤖 AI Assistant
        </li>

        <li className="cursor-pointer hover:text-blue-600">
          ⚙️ Settings
        </li>

      </ul>

    </aside>
  );
}