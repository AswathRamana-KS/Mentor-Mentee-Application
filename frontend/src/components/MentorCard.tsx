import { requestMentor } from "../services/mentorService"

interface Props {
  id: number
  name: string
  skill: string
  experience: string
}

export default function MentorCard({ id, name, skill, experience }: Props) {

  const handleRequest = async () => {

    try {

      await requestMentor(id)

      alert("Mentorship request sent!")

    } catch (error) {

      console.error("Request failed")
      alert("Failed to send request")

    }
  }

  return (
    <div className="bg-white p-4 rounded shadow-md">

      <h3 className="text-lg font-bold">{name}</h3>

      <p>Skill: {skill}</p>

      <p>Experience: {experience}</p>

      <button
        onClick={handleRequest}
        className="mt-3 bg-purple-600 text-white px-4 py-1 rounded"
      >
        Request Mentor
      </button>

    </div>
  )
}
