import { useEffect, useState } from "react"
import { getMentorRequests, acceptMentorRequest } from "../services/mentorService"
import { Link } from "react-router-dom"

export default function ApproveMentors(){

const [requests,setRequests]=useState<any[]>([])

useEffect(()=>{

loadRequests()

},[])

const loadRequests = async ()=>{

try{

const data = await getMentorRequests()
setRequests(data)

}catch(error){

console.error("Error loading requests")

}

}

const handleApprove = async (id: number) => {

try {


await acceptMentorRequest(id)

alert("Mentor Approved")

loadRequests()


} catch (error) {


console.error("Approval failed", error)


}

}

return(

<div className="p-8">

<h1 className="text-2xl font-bold mb-6">
Mentor Applications
</h1>

<div className="mb-6">
<Link
to="/mentors-by-skill"
className="bg-purple-600 text-white px-4 py-2 rounded"
>
View Mentors By Skill
</Link>
</div>

<table className="w-full border">

<thead>

<tr className="bg-gray-200">

<th className="border p-2">Employee</th>
<th className="border p-2">Skill</th>
<th className="border p-2">Action</th>

</tr>

</thead>

<tbody>

{requests.map((r)=>(

<tr key={r.ma_id}>

<td className="border p-2">
{r.employee?.name}
</td>

<td className="border p-2">
{r.skill?.skill_name}
</td>

<td className="border p-2">

<button
onClick={() => handleApprove(r.ma_id)}
className="bg-green-500 text-white px-3 py-1 rounded"

>

Approve </button>

</td>

</tr>
))}

</tbody>

</table>

</div>

)

}
