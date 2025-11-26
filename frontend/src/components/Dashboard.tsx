import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { authMe } from "../services/auth"
import type { User } from "../types/types"

export default function Dashboard(){
  const navigate = useNavigate()
  const [user, setUser] = useState<User>({} as User)

  function logout(){
    sessionStorage.removeItem("token")
    navigate('/')
  }

  useEffect(()=>{
    const token = sessionStorage.getItem("token")
    if(!token) {
      navigate('/unauthorized')
    }
    async function loadUserData(){
      const userData = await authMe(token as string)
      setUser(userData)
    }
    loadUserData()
  },[navigate])

  return (
    <div className="flex flex-col items-center justify-center px-4 h-screen gap-10">
      <p className="font-bold text-2xl">Dashboard</p>
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-col gap-7">
          <div>
            <p className="text-sm text-gray-700">Name</p>
            <p>{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-700">Email Adress</p>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="flex gap-2 flex-row-reverse">
          <button type="button" className="bg-red-700 text-slate-100 w-full py-2.5 font-semibold rounded-4xl">
            Delete user
          </button>
          <button type="button"
            className="text-gray-950 border border-gray-950 w-full py-2.5 font-semibold rounded-4xl"
            >
            Update user
          </button>
        </div>
        <button type="button"
          className="bg-gray-950 text-slate-100 w-full py-2.5 font-semibold rounded-4xl"
          onClick={logout}
          >Logout
        </button>
      </div>
    </div>
  )
}