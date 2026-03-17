import API from "./api"

export const requestMentor = async (skillId: number) => {

const response = await API.post("/mentor/mapp", {
skill_id: skillId
})

return response.data
}


export const getMentorRequests = async () => {

const response = await API.get("/mentor")

return response.data
}
export const acceptMentorRequest = async (applicationId: number) => {

const response = await API.post("/mentor/mapprov", {
ma_id: applicationId
})

return response.data
}


export const getMentorsBySkill = async (skillId: number) => {

const response = await API.get(`/mentor/skills/${skillId}`)

return response.data
}
