import { EyeOff, Eye } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { auth } from "../services/auth"
import axios from "axios"

export default function LoginForm(){
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loginForm, setLoginForm]= useState({
    password: "",
    email: ""
  })
  const [errors,setErrors]= useState<{password:null|string, email:null|string}>({
    password:"",
    email:""
  })
  function handleShowPassword(){
    setShowPassword(!showPassword)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(validate()){
      try{
        const token = await auth(loginForm)
        navigate('/dashboard')
      } catch( error:unknown ){
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.message)
        }
      }
    }
  }

  function validate(){
    const newErrors : {password:null|string, email:null|string} = {password:null, email:null}
    if(!loginForm.password.length){
      newErrors.password = "password is required"
    }
    if(!loginForm.email.length){
      newErrors.email = "email is required"
    }else if(!/\S+@\S+\.\S+/.test(loginForm.email)){
      newErrors.email = "Invalid email format"
    }
    setErrors(newErrors)
    return Object.values(newErrors).includes(null)
  }

  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    setLoginForm({
      ...loginForm,
      [e.target.name] : e.target.value
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center px-4 h-screen gap-10">
        <p className="font-bold text-2xl">Login</p>
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-7">
            <div>
              <p className="text-sm text-gray-700">Email Adress</p>
              <input
                type="text"
                className="focus:outline-gray-300 border border-slate-200 rounded-sm w-full h-10 p-2"
                placeholder="email@email.com"
                name="email"
                value={loginForm.email}
                onChange={handleChange}
              />
              <p className={`${errors.email ? 'block': 'hidden'} text-sm text-red-600`}>{errors.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-700">Password</p>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="focus:outline-gray-300 focus:outline-none border border-slate-200 rounded-sm w-full h-10 p-2"
                  name="password"
                  value={loginForm.password}
                  onChange={handleChange}
                />
                <p className={`${errors.password ? 'block': 'hidden'} text-sm text-red-600`}>{errors.password}</p>
                <button type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={handleShowPassword}
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <button type="submit" className="bg-gray-950 text-slate-100 w-full py-2.5 font-semibold rounded-4xl">
              Login
            </button>
            <p className="text-sm">Don't have an Account? {" "}
              <span className="underline text-gray-700">
                <Link to={'/singup'}>Sing up here</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}