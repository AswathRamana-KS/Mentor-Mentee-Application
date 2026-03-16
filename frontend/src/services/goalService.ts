import API from "./api"

export const createGoal = async (msId:number,data:any) => {

const response = await API.post(`/mentor/${msId}/goal`,data)

return response.data

}

export const getGoals = async (ms_id:number) => {

  const response = await API.get(`/mentor/${ms_id}/goals`)

  return response.data

}