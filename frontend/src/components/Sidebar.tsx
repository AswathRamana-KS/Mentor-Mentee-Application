import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6">

      <h2 className="text-xl font-bold mb-6">
        Dashboard
      </h2>

      <div className="flex flex-col space-y-4">

        <Link to="/mentee-dashboard">
          Home
        </Link>

        <Link to="/browse-mentors">
          Browse Mentors
        </Link>

        <Link to="/goals">
          Goals
        </Link>

      </div>

    </div>
  )
}