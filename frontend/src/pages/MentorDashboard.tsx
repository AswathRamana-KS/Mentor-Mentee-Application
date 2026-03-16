import { useEffect, useState } from "react"
import API from "../services/api"
import { Link } from "react-router-dom"

export default function MentorDashboard() {

const [requests, setRequests] = useState<any[]>([])

useEffect(() => {
loadRequests()
}, [])

const loadRequests = async () => {


try {

  const res = await API.get("/mentor/getreqs")
  setRequests(res.data)

} catch (error) {

  console.error("Failed to load mentee requests")

}


}

const handleAccept = async (mr_id: number) => {


try {

  await API.post("/mentor/accept", {
    mr_id: mr_id
  })

  alert("Mentee Accepted")

  setRequests(prev => prev.filter(req => req.mr_id !== mr_id))

} catch (error) {

  console.error("Accept failed")
  alert("Error accepting request")

}


}

const handleReject = async (mr_id: number) => {


try {

  await API.post("/mentor/reject", {
    mr_id: mr_id
  })

  alert("Mentee Rejected")

  setRequests(prev => prev.filter(req => req.mr_id !== mr_id))

} catch (error) {

  console.error("Reject failed")
  alert("Error rejecting request")

}


}

return (


<div className="p-8 bg-gray-100 min-h-screen">

  <h1 className="text-3xl font-bold mb-6">
    Mentor Dashboard
  </h1>

  {/* Mentor Actions */}
<div className="grid grid-cols-2 gap-6 mb-8">

<Link
to="/update-goal"
className="bg-white p-6 rounded shadow hover:bg-gray-50"
>
<h2 className="text-xl font-semibold">
Set Goals for Mentees
</h2>
</Link>

<Link
to="/goals"
className="bg-white p-6 rounded shadow hover:bg-gray-50"
>
<h2 className="text-xl font-semibold">
View Goal Progress
</h2>
</Link>

</div>

  {/* Mentorship Requests */}
  <h2 className="text-2xl font-bold mb-4">
    Mentorship Requests
  </h2>

  {requests.length === 0 && (
    <p className="text-gray-600">
      No mentorship requests yet.
    </p>
  )}

  {requests.map((req) => (

    <div
      key={req.mr_id}
      className="bg-white p-6 rounded shadow mb-4"
    >

      <p><strong>Mentee ID:</strong> {req.mentee_id}</p>
      <p><strong>Skill ID:</strong> {req.skill_id}</p>

      <div className="mt-3 space-x-2">

        <button
          onClick={() => handleAccept(req.mr_id)}
          className="bg-green-600 text-white px-4 py-1 rounded"
        >
          Accept
        </button>

        <button
          onClick={() => handleReject(req.mr_id)}
          className="bg-red-600 text-white px-4 py-1 rounded"
        >
          Reject
        </button>

      </div>

    </div>

  ))}

</div>


)

}
