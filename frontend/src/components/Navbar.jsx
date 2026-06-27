export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

      <h1 className="text-3xl font-bold text-blue-600">
        FocusFlow AI 🚀
      </h1>

      <div className="flex items-center gap-4">

        <button className="text-2xl">
          🔔
        </button>

        <div className="flex items-center gap-2">

          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />

          <span className="font-semibold">
            Aashish
          </span>

        </div>

      </div>

    </nav>
  );
}