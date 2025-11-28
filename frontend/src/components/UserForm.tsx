import { EyeOff, Eye } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { register, update } from "../services/user"
import axios from "axios"
import type { UpdateUserDto, User } from "../types/types"

export default function UserForm(){
  const url = useLocation()
  const [isUpdating,setIsUpdating]=useState(false)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [form,setForm]= useState({
    name: "",
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: ""
  })

  useEffect(()=>{
    if(url.pathname=='/update-user'){
      setIsUpdating(true)
      const sessionStorageInfo = sessionStorage.getItem("user")
      if(sessionStorageInfo){
        const user : User = JSON.parse(sessionStorageInfo)
        setForm({
          email : user.email,
          name : user.name,
          password : ''
        })
      }
    }
  },[url.pathname])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  function handleShowPassword(){
    setShowPassword(!showPassword)
  }

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(!isUpdating){
      singupSubmit()
      return
    }
    updateSubmit()
  }

  async function singupSubmit(){
    if(validate()){
      try{
        await register(form)
        alert('User created successfully')
        navigate('/')
      } catch (error : unknown){
        if(axios.isAxiosError(error)){
          alert(error.message)
        }
      }
    }
  }

  async function updateSubmit(){
    const token = sessionStorage.getItem("token")
    const sessionStorageInfo = sessionStorage.getItem("user")
    if(token && sessionStorageInfo){
      const user : User = JSON.parse(sessionStorageInfo)
      const userObjUpdate : UpdateUserDto = {
        id: user.id
      }
      if(form.name){
        userObjUpdate["name"] = form.name
      }
       if(form.password){
        userObjUpdate["password"] = form.password
      }
      try{
        await update(userObjUpdate, token)
        alert('User updated successfully')
        navigate('/dashboard')
      } catch (error : unknown){
        if(axios.isAxiosError(error)){
          alert(error.message)
        }
      }
    }
  }

  function validate(){
    const newErrors = {name:'', email:'', password:''}

    if(!form.name.length){
      newErrors.name = "Name is required"
    }

    if(!form.email.length){
      newErrors.email = "Email is required"
    } else if(!/\S+@\S+\.\S+/.test(form.email)){
      newErrors.email = "Invalid email format"
    }

    if(!form.password.length){
      newErrors.password = "password is required"
    } else if(form.password.trim().length<5){
      newErrors.password = "Password must be at least 5 characters long"
    }

    setErrors(newErrors)
    return !errors.name && !errors.password && !errors.email
  }

  function handleReturnPage(){
    if(!isUpdating){
      navigate('/')
      return
    }
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center px-4 h-screen gap-10">
        <p className="font-bold text-2xl">{isUpdating ? 'Update User': 'Sing up'}</p>
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-7">
            <div>
              <p className="text-sm text-gray-700">Name</p>
              <input
                type="text"
                className="focus:outline-gray-300 border border-slate-200 rounded-sm w-full h-10 p-2"
                placeholder="Joshua Adams"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <p className={`${errors.name ? 'block':'hidden'} text-red-600 text-sm`}>{errors.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-700">Email Adress</p>
              <input
                type="text"
                className="focus:outline-gray-300 border border-slate-200 rounded-sm w-full h-10 p-2 disabled:bg-gray-200 disabled:text-gray-500"
                placeholder="email@email.com"
                name="email"
                value={form.email}
                onChange={handleChange}
                disabled={isUpdating}
              />
              <p className={`${errors.email ? 'block':'hidden'} text-red-600 text-sm`}>{errors.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-700">{isUpdating ? 'New password': 'Create password'}</p>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="focus:outline-gray-300 focus:outline-none border border-slate-200 rounded-sm w-full h-10 p-2"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
                <p className={`${errors.password ? 'block':'hidden'} text-red-600 text-sm`}>{errors.password}</p>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={handleShowPassword}
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button type="button"
              className="text-gray-950 border border-gray-950 w-full py-2.5 font-semibold rounded-4xl"
              onClick={handleReturnPage}
              >
              Cancel
            </button>
            <button type="submit" className="bg-gray-950 text-slate-100 w-full py-2.5 font-semibold rounded-4xl">
              {isUpdating ? 'Update': 'Sing up'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}