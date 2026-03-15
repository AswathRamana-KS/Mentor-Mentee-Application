import API from "./api"

// send mentorship request
export const requestMentor = async (mentorId: number) => {

  const response = await API.post("/mentor/request", {
    mentor_id: mentorId,
    skill_id: 1
  })

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
    request_id: requestId
  })

  return response.data
}
