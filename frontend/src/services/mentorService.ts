import API from "./api"

// send mentorship request
export const requestMentor = async (mentorId: number, skillId: number) => {

  const response = await API.post("/mentor/request", {
    mentor_id: mentorId,
    skill_id: skillId
  })

  return response.data
}

// get mentors by skill
export const getMentorsBySkill = async (skillId:number) => {

  const response = await API.get(`/mentor/skills/${skillId}`)

  return response.data

}

// get mentor requests
export const getMentorRequests = async () => {

  const response = await API.get("/mentor/getreqs")

  return response.data
}

// accept mentee request
export const acceptMentorRequest = async (requestId: number) => {

  const response = await API.post("/mentor/accept", {
    mr_id: requestId
  })

  return response.data
}