import { useEffect, useState } from "react"
import MentorCard from "../components/MentorCard"
import { getSkills } from "../services/skillService"
import { getMentorsBySkill } from "../services/mentorService"

export default function BrowseMentors() {

  const [skills, setSkills] = useState<any[]>([])
  const [mentors, setMentors] = useState<any[]>([])
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null)

  // load skills
  useEffect(() => {

    const loadSkills = async () => {

      try {

        const data = await getSkills()
        setSkills(data)

      } catch (error) {

        console.error("Failed to load skills")

      }

    }

    loadSkills()

  }, [])

  // when skill selected
  const handleSkillChange = async (skillId:any) => {

    setSelectedSkill(Number(skillId))

    if (!skillId) return

    try {

      const data = await getMentorsBySkill(skillId)
      setMentors(data)

    } catch (error) {

      console.error("Failed to load mentors")

    }

  }

  return (

    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">Find Mentors by Skill</h1>

      {/* Skill Dropdown */}

      <div className="mb-6">

        <select
          className="p-2 border rounded"
          value={selectedSkill ?? ""}
          onChange={(e)=>handleSkillChange(e.target.value)}
        >

          <option value="">Select Skill</option>

          {skills.map((skill)=>(
            <option key={skill.skill_id} value={skill.skill_id}>
              {skill.skill_name}
            </option>
          ))}

        </select>

      </div>

      {/* Mentors */}

      <div className="grid grid-cols-3 gap-6">

        {mentors.map((m)=>(
          <MentorCard
            key={m.mentor.emp_id}
            id={m.mentor.emp_id}
            skillId={m.skill.skill_id}
            name={m.mentor.name}
            skill={m.skill.skill_name}
            experience={m.mentor.years_of_exp + " years"}
          />
        ))}

      </div>

    </div>

  )

}