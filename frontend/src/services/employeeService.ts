import API from "./api";

// Register new employee
export const registerEmployee = async (data: any) => {
  const response = await API.post("/employees/", data);
  return response.data;
};

// Get logged-in employee profile
export const getCurrentEmployee = async () => {
  const response = await API.get("/employees/me");
  return response.data;
};

export const getMyProfile = async () => {

  const response = await API.get("/employees/me")

  return response.data

}