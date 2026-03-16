import API from "./api"

// employee applies to become mentor
export const requestMentor = async (skillId: number) => {

const response = await API.post("/mentor/mapp", {
skill_id: skillId
})

return response.data
}

// get mentor applications (for admin or practice head)
export const getMentorRequests = async () => {

const response = await API.get("/mentor")

return response.data
}

// approve mentor application
export const acceptMentorRequest = async (applicationId: number) => {

const response = await API.post("/mentor/mapprov", {
ma_id: applicationId
})

return response.data
}

// get mentors by skill (used in BrowseMentors page)
export const getMentorsBySkill = async (skillId: number) => {

const response = await API.get(`/mentor/skills/${skillId}`)

return response.data
}
