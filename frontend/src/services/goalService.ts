import API from "./api";

export const createGoal = async (ms_id:number, data:any) => {

  const response = await API.post(`/mentor/${ms_id}/goal`, data)

  return response.data

}

export const getGoals = async (ms_id:number) => {

  const response = await API.get(`/mentor/${ms_id}/goals`)

  return response.data

}