import { useState } from "react"
import { addPracticeHead } from "../services/practiceHeadService"

export default function AddPracticeHead(){

const [empId,setEmpId]=useState("")

const handleSubmit = async (e:any)=>{

e.preventDefault()

try{

await addPracticeHead({
emp_id:Number(empId)
})

alert("Practice Head Added")

}catch(error){

console.error(error)

}

}

return(

<div className="p-8">

<h1 className="text-2xl font-bold mb-4">Add Practice Head</h1>

<form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">

<input
placeholder="Employee ID"
value={empId}
onChange={(e)=>setEmpId(e.target.value)}
className="border p-2"
/>

<button className="bg-green-500 text-white p-2 rounded">
Add Practice Head
</button>

</form>

</div>

)

}