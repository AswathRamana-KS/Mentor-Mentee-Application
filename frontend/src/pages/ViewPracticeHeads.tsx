import { useEffect, useState } from "react"
import API from "../services/api"

export default function ViewPracticeHeads(){

const [phs,setPhs] = useState<any[]>([])

useEffect(()=>{

fetchPracticeHeads()

},[])

const fetchPracticeHeads = async () => {

try{

const res = await API.get("/ph")

setPhs(res.data)

}catch(error){

console.error("Error fetching practice heads")

}

}

return(

<div className="p-8">

<h1 className="text-3xl font-bold mb-6">Practice Heads</h1>

<table className="w-full border">

<thead>

<tr className="bg-gray-200">

<th className="p-2 border">Employee ID</th>
<th className="p-2 border">Skill ID</th>

</tr>

</thead>

<tbody>

{phs.map((ph,index)=>(

<tr key={index}>

<td className="border p-2">{ph.emp_id}</td>
<td className="border p-2">{ph.skill_id}</td>

</tr>

))}

</tbody>

</table>

</div>

)

}
