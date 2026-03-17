import API from "./api";

export const getCurrentEmployee = async () => {
  const response = await API.get("/employees/me");
  return response.data;
};

export const getMyProfile = async () => {

  const response = await API.get("/employees/me")

  return response.data

}