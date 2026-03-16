import { useState } from "react"
import { addSkill } from "../services/skillService"

export default function CreateSkill(){

const [skill,setSkill]=useState("")

const handleSubmit = async (e:any)=>{

e.preventDefault()

try{

await addSkill({
skill_name:skill
})

alert("Skill Created")

}catch(error){

console.error(error)

}

}

return(

<div className="p-8">

<h1 className="text-2xl font-bold mb-4">Create Skill</h1>

<form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">

<input
placeholder="Skill Name"
value={skill}
onChange={(e)=>setSkill(e.target.value)}
className="border p-2"
/>

<button className="bg-purple-500 text-white p-2 rounded">
Create Skill
</button>

</form>

</div>

)

}