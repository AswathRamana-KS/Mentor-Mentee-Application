import API from "./api"

export const applyMentor = async (data:any) => {

  const response = await API.post("/mentor/mapp", data)

  return response.data

}