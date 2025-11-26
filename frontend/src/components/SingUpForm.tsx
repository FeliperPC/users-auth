import { EyeOff, Eye } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../services/user"
import axios from "axios"

export default function SingUpForm(){
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
    if(validate()){
      try{
        const response = await register(form)
        alert('User created successfully')
        navigate('/')
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center px-4 h-screen gap-10">
        <p className="font-bold text-2xl">Sing up</p>
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
                className="focus:outline-gray-300 border border-slate-200 rounded-sm w-full h-10 p-2"
                placeholder="email@email.com"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              <p className={`${errors.email ? 'block':'hidden'} text-red-600 text-sm`}>{errors.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-700">Create password</p>
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
              onClick={()=>navigate('/')}
              >
              Cancel
            </button>
            <button type="submit" className="bg-gray-950 text-slate-100 w-full py-2.5 font-semibold rounded-4xl">
              Sing up
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}