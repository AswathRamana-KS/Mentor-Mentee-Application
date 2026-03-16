import { useState } from "react"
import { createGoal } from "../services/goalService"

export default function UpdateGoal(){

const [msId,setMsId]=useState("")
const [goal,setGoal]=useState("")

const handleSubmit = async (e:any)=>{

e.preventDefault()

await createGoal(Number(msId),{
goal_description:goal
})

alert("Goal Updated")

}

return(

<div className="p-8">

<h1 className="text-2xl font-bold mb-4">Update Goal</h1>

<form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">

<input
placeholder="Mentor Skill ID"
value={msId}
onChange={(e)=>setMsId(e.target.value)}
className="border p-2"
/>

<input
placeholder="Goal"
value={goal}
onChange={(e)=>setGoal(e.target.value)}
className="border p-2"
/>

<button className="bg-blue-500 text-white p-2 rounded">
Update Goal
</button>

</form>

</div>

)

}