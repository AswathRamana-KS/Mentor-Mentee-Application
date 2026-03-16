import { useEffect, useState } from "react"
import API from "../services/api"

export default function ViewMentorsBySkill(){

const [skillId,setSkillId] = useState("")
const [mentors,setMentors] = useState<any[]>([])

const fetchMentors = async () => {

try{

const res = await API.get(`/mentor/skills/${skillId}`)

setMentors(res.data)

}catch(error){

console.error("Error fetching mentors")

}

}

return(

<div className="p-8">

<h1 className="text-3xl font-bold mb-6">
Mentors By Skill
</h1>

<div className="mb-4 flex gap-4">

<input
type="number"
placeholder="Enter Skill ID"
value={skillId}
onChange={(e)=>setSkillId(e.target.value)}
className="border p-2"
/>

<button
onClick={fetchMentors}
className="bg-purple-600 text-white px-4 py-2 rounded"

>

Search </button>

</div>

<table className="w-full border">

<thead>

<tr className="bg-gray-200">

<th className="border p-2">Employee ID</th>
<th className="border p-2">Name</th>
<th className="border p-2">Email</th>

</tr>

</thead>

<tbody>

{mentors.map((m,index)=>(

<tr key={index}>

<td className="border p-2">{m.emp_id}</td>
<td className="border p-2">{m.name}</td>
<td className="border p-2">{m.email_id}</td>

</tr>
))}

</tbody>

</table>

</div>

)

}
