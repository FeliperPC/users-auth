import { EyeOff, Eye } from "lucide-react"
import { useState } from "react"
export default function LoginForm(){
  const [showPassword, setShowPassword] = useState(false)
  function handleShowPassword(){
    setShowPassword(!showPassword)
  }
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-7">
        <div>
          <p className="text-sm text-gray-700">Email Adress</p>
          <input type="text" className="focus:outline-gray-300 border border-slate-200 rounded-sm w-full h-10 p-2" placeholder="email@email.com"/>
        </div>
        <div>
          <p className="text-sm text-gray-700">Password</p>
          <div className="relative">
            <input type={showPassword ? "text" : "password"}
              className="focus:outline-gray-300 focus:outline-none border border-slate-200 rounded-sm w-full h-10 p-2"
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={handleShowPassword}
              >
                {showPassword ? <Eye/> : <EyeOff />}
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <button className="bg-gray-950 text-slate-100 w-full py-2.5 font-semibold rounded-4xl">Login</button>
        <p className="text-sm">Don't have an Account? Sing up here</p>
      </div>
    </div>
  )
}