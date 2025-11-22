import { useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='border border-red-100 font-bold text-pink-500'>Hello World</div>
      <div>
        <LoginForm />
      </div>
    </>
  )
}

export default App
