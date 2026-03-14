export default function Goals() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">Mentorship Goals</h1>

      <div className="bg-white p-6 rounded shadow">

        <p className="font-semibold">Goal:</p>
        <p>Learn React and build a portfolio project</p>

        <p className="mt-3 font-semibold">Deadline:</p>
        <p>30 June 2026</p>

        <p className="mt-3 font-semibold">Progress:</p>
        <div className="w-full bg-gray-300 rounded h-4 mt-1">
          <div className="bg-purple-600 h-4 rounded w-2/5"></div>
        </div>

      </div>

    </div>
  );
}