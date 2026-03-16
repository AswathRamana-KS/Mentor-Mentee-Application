import { useEffect, useState } from "react"
import API from "../services/api"

export default function ViewMentees(){

const [mentees,setMentees] = useState<any[]>([])

useEffect(()=>{

fetchMentees()

},[])

const fetchMentees = async () => {

try{

const res = await API.get("/employees")

const menteeList = res.data.filter(
(emp:any)=> emp.role_type?.toLowerCase() === "mentee"
)

setMentees(menteeList)

}catch(error){

console.error("Error fetching mentees")

}

}

return(

<div className="p-8">

<h1 className="text-3xl font-bold mb-6">Mentees</h1>

<table className="w-full border">

<thead>

<tr className="bg-gray-200">

<th className="p-2 border">Employee ID</th>
<th className="p-2 border">Name</th>
<th className="p-2 border">Email</th>
<th className="p-2 border">Role</th>

</tr>

</thead>

<tbody>

{mentees.map((m,index)=>(

<tr key={index}>

<td className="border p-2">{m.emp_id}</td>
<td className="border p-2">{m.name}</td>
<td className="border p-2">{m.email_id}</td>
<td className="border p-2">{m.role_type}</td>

</tr>

))}

</tbody>

</table>

</div>

)

}
