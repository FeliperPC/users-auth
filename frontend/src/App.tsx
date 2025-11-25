import LoginForm from './components/LoginForm'
import {Routes, Route } from 'react-router-dom'
import SingUpForm from './components/SingUpForm'
import Dashboard from './components/Dashboard'
import Unauthorized from './components/Unauthorized'
import NotFound from './components/NotFound'
import RouteInterceptor from './components/RouteInterceptor'

function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginForm/>}/>
      <Route path='/singup' element={<SingUpForm/>}/>
      <Route path='/dashboard' element={
        <RouteInterceptor>
          <Dashboard/>
        </RouteInterceptor>
      }
      />
      <Route path='/unauthorized' element={<Unauthorized/>}/>
      <Route path='/*' element={<NotFound/>}/>
    </Routes>
  )
}

export default App
