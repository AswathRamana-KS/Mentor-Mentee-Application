import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="bg-purple-600 text-white p-4 flex justify-between">

      <h1 className="font-bold text-lg">
        MentorMentee
      </h1>

      <div className="space-x-4">

        <Link to="/mentee-dashboard">
          Dashboard
        </Link>

        <Link to="/browse-mentors">
          Mentors
        </Link>

        <Link to="/goals">
          Goals
        </Link>

      </div>

    </nav>
  )
}