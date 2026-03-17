import { useState } from "react"

export default function AddEmployee(){

  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [phone,setPhone]=useState("")
  const [division,setDivision]=useState("")
  const [date,setDate]=useState("")
  const [role,setRole]=useState("")
  const [exp,setExp]=useState("")

  const handleSubmit = (e:any)=>{
    e.preventDefault()

    const employeeData = {
      name,
      email_id: email,
      password,
      phone_number: phone,
      division,
      date_of_joining: date,
      role_type: role,
      years_of_exp: Number(exp)
    }

    console.log("Employee Data:", employeeData)

    alert("Employee data captured ")
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

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          className="border p-2"
        />

        <select
          value={division}
          onChange={(e)=>setDivision(e.target.value)}
          className="border p-2"
        >
          <option value="">Select Division</option>
          <option value="App Dev">App Dev</option>
          <option value="Web Dev">Web Dev</option>
          <option value="AI/ML">AI/ML</option>
          <option value="Cloud">Cloud</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
          className="border p-2"
        />

        <input
          placeholder="Role (e.g., Junior Developer, Team Lead)"
          value={role}
          onChange={(e)=>setRole(e.target.value)}
          className="border p-2"
        />

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