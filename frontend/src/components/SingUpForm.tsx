import { EyeOff, Eye } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SingUpForm(){
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  function handleShowPassword(){
    setShowPassword(!showPassword)
  }
  return (
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
            />
          </div>
          <div>
            <p className="text-sm text-gray-700">Email Adress</p>
            <input
              type="text"
              className="focus:outline-gray-300 border border-slate-200 rounded-sm w-full h-10 p-2"
              placeholder="email@email.com"
            />
          </div>
          <div>
            <p className="text-sm text-gray-700">Create password</p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="focus:outline-gray-300 focus:outline-none border border-slate-200 rounded-sm w-full h-10 p-2"
              />
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
          <button 
            className="text-gray-950 border border-gray-950 w-full py-2.5 font-semibold rounded-4xl"
            onClick={()=>navigate('/')}
            >
            Cancel
          </button>
          <button className="bg-gray-950 text-slate-100 w-full py-2.5 font-semibold rounded-4xl">
            Sing up
          </button>
        </div>
      </div>
    </div>
  );
}