import LoginForm from './components/LoginForm'
import {Routes, Route } from 'react-router-dom'
import SingUpForm from './components/SingUpForm'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginForm/>}/>
      <Route path='/singup' element={<SingUpForm/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  )
}

export default App
