
import { useState } from "react"
import { registerEmployee } from "../services/employeeService"

export default function AddEmployee(){

const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [role,setRole]=useState("mentee")
const [exp,setExp]=useState("")

const handleSubmit = async (e:any)=>{
e.preventDefault()

try{

await registerEmployee({
name,
email_id:email,
password,
role_type:role,
years_of_exp:Number(exp)
})

alert("Employee Added Successfully")

}catch(error){

console.error(error)

}

}

return(

<div className="p-8">

<h1 className="text-2xl font-bold mb-4">Add Employee</h1>

<form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">

<input
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="border p-2"
/>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="border p-2"
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="border p-2"
/>

<select
value={role}
onChange={(e)=>setRole(e.target.value)}
className="border p-2"
>
<option value="mentee">Mentee</option>
<option value="mentor">Mentor</option>
<option value="team lead">Team Lead</option>
</select>

<input
type="number"
placeholder="Years of Experience"
value={exp}
onChange={(e)=>setExp(e.target.value)}
className="border p-2"
/>

<button className="bg-blue-500 text-white p-2 rounded">
Add Employee
</button>

</form>

</div>

)

}

