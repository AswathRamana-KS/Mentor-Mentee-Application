import MentorCard from "../components/MentorCard"

export default function BrowseMentors() {

  const mentors = [
    {
      id: 1,
      name: "Rahul Sharma",
      skill: "Python",
      experience: "5 years"
    },
    {
      id: 2,
      name: "Anita Verma",
      skill: "React",
      experience: "4 years"
    },
    {
      id: 3,
      name: "Amit Patel",
      skill: "Machine Learning",
      experience: "6 years"
    }
  ]

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">Available Mentors</h1>

      <div className="grid grid-cols-3 gap-6">

        {mentors.map((mentor) => (

          <MentorCard
            key={mentor.id}
            id={mentor.id}
            name={mentor.name}
            skill={mentor.skill}
            experience={mentor.experience}
          />

        ))}

      </div>

    </div>
  )
}
