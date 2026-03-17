
import { Link } from "react-router-dom"

export default function Navbar() {

const role = localStorage.getItem("role")

return (

<nav className="bg-purple-600 text-white p-4 flex justify-between">

<h1 className="font-bold text-lg">
MentorMentee
</h1>

<div className="space-x-4">


{role === "mentee" && (
<>
<Link to="/mentee-dashboard">Dashboard</Link>
<Link to="/browse-mentors">Mentors</Link>
<Link to="/goals">Goals</Link>
</>
)}


{role === "mentor" && (
<>
<Link to="/mentor-dashboard">Dashboard</Link>
</>
)}


{role === "team lead" && (
<>
<Link to="/approve-mentors">Approve Mentors</Link>
</>
)}


{role === "admin" && (
<>
<Link to="/add-employee">Add Employee</Link>
<Link to="/add-practice-head">Add Practice Head</Link>
<Link to="/create-skill">Create Skill</Link>
</>
)}

</div>

</nav>

)

}

