import api from "./api";

export async function auth(email:string,password:string){
  const response = await api.post("/auth", {
    email,
    password
  })
  return response.data
}
