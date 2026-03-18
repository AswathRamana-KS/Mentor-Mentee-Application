import API from "./api";


export const loginInit = async (email: string, password: string) => {
    console.log("Trying it log in"+email+password)
    const formData = new URLSearchParams()
    formData.append("username", email)
    formData.append("password", password)

    const res = await API.post(`auth/login/init`, formData)
    console.log(res)
    return res.data
}

export const loginComplete = async (email: string, role: string) => {
    const res = await API.post(`auth/login/complete`, {
        email,
        role
    })
    return res.data
}

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