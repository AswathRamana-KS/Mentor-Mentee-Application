import { useEffect, useState } from "react"
import { getMentorRequests, acceptMentorRequest } from "../services/mentorService"

export default function MentorDashboard() {

  const [requests, setRequests] = useState<any[]>([])

  useEffect(() => {

    const loadRequests = async () => {

      try {

        const data = await getMentorRequests()

        console.log("Mentor Requests:", data)

        setRequests(data)

      } catch (error) {

        console.error("Failed to load requests")

      }

    }

    loadRequests()

  }, [])


  const handleAccept = async (mr_id: number) => {

    try {

      await acceptMentorRequest(mr_id)

      alert("Request Accepted")

      // remove accepted request from UI
      setRequests((prev) => prev.filter((req) => req.mr_id !== mr_id))

    } catch (error) {

      alert("Error accepting request")

    }

  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">Mentor Dashboard</h1>

      {requests.length === 0 && (
        <p className="text-gray-600">No mentorship requests yet.</p>
      )}

      {requests.map((req) => (

        <div
          key={req.mr_id}
          className="bg-white p-6 rounded shadow mb-4"
        >

          <h2 className="text-xl font-semibold mb-3">
            Mentorship Request
          </h2>

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
