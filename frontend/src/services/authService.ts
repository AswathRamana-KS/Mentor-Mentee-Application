import API from "./api"

// Step 1: validate credentials and find out what role(s) the user has
export const loginInit = async (email: string, password: string) => {
  const params = new URLSearchParams()
  params.append("username", email)
  params.append("password", password)
  const res = await API.post("/auth/login/init", params)
  return res.data
}

// Step 2: get a token for a specific role
export const loginComplete = async (email: string, role: string) => {
  const res = await API.post("/auth/login/complete", { email, role })
  return res.data
}

// Enroll as mentor or mentee
export const enrollUser = async (
  email: string,
  password: string,
  isMentor: boolean,
  skillId: number
) => {
  const params = new URLSearchParams()
  params.append("username", email)
  params.append("password", password)
  const res = await API.post(`/auth/enroll?role=${isMentor}&skill_id=${skillId}`, params)
  return res.data
}
