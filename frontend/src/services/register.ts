import type { CreateUserDto } from "../types/types";
import api from "./api";

export async function register(createUserDto: CreateUserDto){
  const response = await api.post('/user', {
    name: createUserDto.name,
    email: createUserDto.email,
    password: createUserDto.password,
  })
}