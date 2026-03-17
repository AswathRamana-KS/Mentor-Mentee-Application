import { sendMentorshipRequest } from "../services/mentorService"

interface Props {
  id: number       
  skillId: number
  name: string
  skill: string
  experience: string
}

export default function MentorCard({ id, skillId, name, skill, experience }: Props) {

  const handleRequest = async () => {
    try {

      await sendMentorshipRequest(id, skillId)
      alert(`Mentorship request sent to ${name}!`)
    } catch (error: any) {
      alert(error?.response?.data?.detail || "Failed to send request")
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-gray-600">Skill: {skill}</p>
      <p className="text-gray-600">Experience: {experience}</p>
      <button onClick={handleRequest}
        className="mt-3 bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700">
        Request Mentor
      </button>
    </div>
  )
}