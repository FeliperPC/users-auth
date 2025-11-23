export default function Dashboard(){
  return (
    <div className="flex flex-col items-center justify-center px-4 h-screen gap-10">
      <p className="font-bold text-2xl">Dashboard</p>
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-col gap-7">
          <div>
            <p className="text-sm text-gray-700">Name</p>
            <p>Loren Ipsu</p>
          </div>
          <div>
            <p className="text-sm text-gray-700">Email Adress</p>
            <p>email@email.com</p>
          </div>
          <div>
            <p className="text-sm text-gray-700">Password</p>
            <p>1234502</p>
          </div>
        </div>
        <div className="flex gap-2 flex-row-reverse">
          <button className="bg-red-700 text-slate-100 w-full py-2.5 font-semibold rounded-4xl">
            Delete user
          </button>
          <button
            className="text-gray-950 border border-gray-950 w-full py-2.5 font-semibold rounded-4xl"
            >
            Update user
          </button>
        </div>
      </div>
    </div>
  )
}