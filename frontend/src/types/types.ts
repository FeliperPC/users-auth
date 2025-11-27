export type CreateUserDto = {
  name:string,
  email:string,
  password:string
}

export type LoginDto={
  email: string,
  password: string
}

export type User ={
  name:string,
  email:string,
  id: number,
  password?: string,
}

export type UpdateUserDto = {
  name?:string,
  password?:string,
  id:Number
}