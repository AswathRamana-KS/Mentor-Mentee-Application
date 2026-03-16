import { useState } from "react"
import { createGoal } from "../services/goalService"

export default function UpdateGoal(){

const [msId,setMsId] = useState("")
const [title,setTitle] = useState("")
const [desc,setDesc] = useState("")
const [deadline,setDeadline] = useState("")
const [percent,setPercent] = useState("")

const handleSubmit = async (e:any)=>{

e.preventDefault()

try{

await createGoal(Number(msId),{
title,
desc,
deadline,
percent:Number(percent)
})

alert("Goal created successfully")

}catch(error){

console.error(error)
alert("Error creating goal")

}

}

return(

<div className="p-8">

<h1 className="text-2xl font-bold mb-4">Update Goal</h1>

<form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">

<input
placeholder="Mentorship ID"
value={msId}
onChange={(e)=>setMsId(e.target.value)}
className="border p-2"
/>

<input
placeholder="Goal Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
className="border p-2"
/>

<input
placeholder="Description"
value={desc}
onChange={(e)=>setDesc(e.target.value)}
className="border p-2"
/>

<input
type="date"
value={deadline}
onChange={(e)=>setDeadline(e.target.value)}
className="border p-2"
/>

<input
type="number"
placeholder="Completion Percent"
value={percent}
onChange={(e)=>setPercent(e.target.value)}
className="border p-2"
/>

<button className="bg-blue-500 text-white p-2 rounded">
Update Goal
</button>

</form>

</div>

)

}
