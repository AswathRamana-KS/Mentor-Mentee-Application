import { Link } from "react-router-dom"

export default function AdminDashboard(){

return(

<div className="p-8">

<h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

<div className="grid grid-cols-3 gap-6">

<Link to="/add-employee" className="bg-white p-6 shadow rounded">
<h2 className="text-xl font-semibold">Add Employee</h2>
</Link>

<Link to="/add-practice-head" className="bg-white p-6 shadow rounded">
<h2 className="text-xl font-semibold">Add Practice Head</h2>
</Link>

<Link to="/create-skill" className="bg-white p-6 shadow rounded">
<h2 className="text-xl font-semibold">Create Skill</h2>
</Link>

</div>

</div>

)

}