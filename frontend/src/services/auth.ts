import type { LoginDto } from "../types/types";
import api from "./api";

export async function auth({email,password}:LoginDto){
  const response = await api.post("/auth", {
    email,
    password
  })
  return response.data
}
