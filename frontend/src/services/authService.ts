import API from "./api";

export const loginUser = async (email: string, password: string) => {

  const params = new URLSearchParams();

  params.append("username", email);
  params.append("password", password);

  const response = await API.post("/auth/login", params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};

export const enrollUser = async (email: string, password: string, isMentor : boolean, selectedSkillId : number) => {

  const params = new URLSearchParams();

  params.append("username", email);
  params.append("password", password);

  const response = await API.post(`/auth/enroll-auth?role=${isMentor}&skill_id=${selectedSkillId}`, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};