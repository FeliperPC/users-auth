import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { authMe } from "../services/auth"
import type { User } from "../types/types"
import { Modal } from "./Modal"
import { X } from "lucide-react"
import { remove } from "../services/user"
import { isAxiosError } from "axios"

export default function Dashboard(){
  const navigate = useNavigate()
  const [user, setUser] = useState<User>({} as User)
  const [modalView,setModalView] = useState(false)

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
  
  function logout(){
    sessionStorage.clear()
    navigate('/')
  }

  async function handleDelete(){
    try{
      const token = sessionStorage.getItem("token")
      await remove(user.id,token!!!)
      alert('User deleted succesfully')
      logout()
    } catch(error){
      if(isAxiosError(error)){
        alert(error.message)
      }
    }
  }

  function handleUpdate(){
    sessionStorage.setItem("user",JSON.stringify(user))
    navigate('/update-user')
  }

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
          <button type="button" 
            className="bg-red-700 text-slate-100 w-full py-2.5 font-semibold rounded-4xl"
            onClick={()=>setModalView(true)}
            >
            Delete user
          </button>
          <button type="button"
            className="text-gray-950 border border-gray-950 w-full py-2.5 font-semibold rounded-4xl"
            onClick={handleUpdate}
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
      <Modal isOpen={modalView} onClose={() => setModalView(false)}>
        <div className="flex flex-col gap-6">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold">Delete user</h1>
            <div onClick={()=>setModalView(false)}>
              <X />
            </div>
          </div>
          <p className="text-gray-800">Are you sure you want to delete the user {user.name}? This action cannot be undone.</p>
          <div className="flex justify-end gap-2">
            <button
              className="border border-gray-500 py-2.5 px-6 font-semibold rounded-4xl w-28"
              onClick={() => setModalView(false)}
            >Cancelar
            </button>
            <button
              className="bg-red-700 text-slate-100 py-2.5 px-6 font-semibold rounded-4xl w-28"
              onClick={handleDelete}
            >Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}