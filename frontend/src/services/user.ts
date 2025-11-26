import type { CreateUserDto } from "../types/types";
import api from "./api";

export async function register(createUserDto: CreateUserDto){
  await api.post('/user', {
    name: createUserDto.name,
    email: createUserDto.email,
    password: createUserDto.password,
  })
}

export async function remove(id:number, token:string){
  const response = await api.delete(`/user/${id}`,{
    headers : {
      Authorization: `Barrier ${token}`
    }
  })
  return response
}