import LoginForm from './components/LoginForm'

function App() {
  return (
    <>
      <div className='flex flex-col items-center justify-center px-4 h-screen gap-10'>
        <p className='font-bold text-2xl'>Login</p>
        <LoginForm />
      </div>
    </>
  )
}

export default App
