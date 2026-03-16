import { useEffect, useState } from "react"
import API from "../services/api"

export default function MentorRequests(){

const [requests,setRequests] = useState<any[]>([])

useEffect(()=>{
loadRequests()
},[])

const loadRequests = async () => {

try{

const res = await API.get("/mentorship")

setRequests(res.data)

}catch(error){

console.error("Error loading mentee requests")

}

}

const handleAccept = async (id:number) => {

try{

await API.post("/mentorship/accept",{
mr_id:id
})

alert("Mentee Accepted")

loadRequests()

}catch(error){

console.error("Accept failed")

}

}

const handleReject = async (id:number) => {

try{

await API.post("/mentorship/reject",{
mr_id:id
})

alert("Mentee Rejected")

loadRequests()

}catch(error){

console.error("Reject failed")

}

}

return(

<div className="p-8">

<h1 className="text-2xl font-bold mb-6">
Mentee Requests
</h1>

<table className="w-full border">

<thead>

<tr className="bg-gray-200">

<th className="border p-2">Mentee</th>
<th className="border p-2">Skill</th>
<th className="border p-2">Action</th>

</tr>

</thead>

<tbody>

{requests.map((r)=>(

<tr key={r.mr_id}>

<td className="border p-2">
{r.mentee_id}
</td>

<td className="border p-2">
{r.skill_id}
</td>

<td className="border p-2 flex gap-2">

<button
onClick={()=>handleAccept(r.mr_id)}
className="bg-green-500 text-white px-3 py-1 rounded"

>

Accept </button>

<button
onClick={()=>handleReject(r.mr_id)}
className="bg-red-500 text-white px-3 py-1 rounded"

>

Reject </button>

</td>

</tr>
))}

</tbody>

</table>

</div>

)

}
