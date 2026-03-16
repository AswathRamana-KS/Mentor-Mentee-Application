import { useEffect,useState } from "react"
import { getMentorRequests,acceptMentorRequest } from "../services/mentorService"

export default function ApproveMentors(){

const [requests,setRequests]=useState<any[]>([])

useEffect(()=>{

loadRequests()

},[])

const loadRequests = async ()=>{

const data = await getMentorRequests()

setRequests(data)

}

const handleApprove = async(id:number)=>{

await acceptMentorRequest(id)

alert("Mentor Approved")

loadRequests()

}

return(

<div className="p-8">

<h1 className="text-2xl font-bold mb-6">Mentor Applications</h1>

{requests.map((r)=>(
<div key={r.mr_id} className="border p-4 mb-4">

<p>Employee: {r.emp_id}</p>
<p>Skill: {r.skill_id}</p>

<button
onClick={()=>handleApprove(r.mr_id)}
className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
>
Approve
</button>

</div>
))}

</div>

)

}