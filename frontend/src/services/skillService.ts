import API from "./api"

export const addSkill = async (data:any) => {

  const response = await API.post("/skills/", data)

  return response.data

}