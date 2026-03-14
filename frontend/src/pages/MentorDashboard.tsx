export default function MentorDashboard() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-4">Mentor Dashboard</h1>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Pending Requests</h2>

        <p>Mentee: Priya Singh</p>

        <div className="mt-3 space-x-2">
          <button className="bg-green-600 text-white px-4 py-1 rounded">
            Accept
          </button>

          <button className="bg-red-600 text-white px-4 py-1 rounded">
            Reject
          </button>
        </div>

      </div>

    </div>
  );
}