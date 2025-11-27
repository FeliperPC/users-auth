import LoginForm from './components/LoginForm'
import {Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Unauthorized from './components/Unauthorized'
import NotFound from './components/NotFound'
import RouteInterceptor from './components/RouteInterceptor'
import UserForm from './components/UserForm'

function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginForm/>}/>
      <Route path='/singup' element={<UserForm/>}/>
      <Route path='/dashboard' element={
        <RouteInterceptor>
          <Dashboard/>
        </RouteInterceptor>
      }
      />
      <Route path='/unauthorized' element={<Unauthorized/>}/>
      <Route path='/*' element={<NotFound/>}/>
      <Route path='/update-user' element={
         <RouteInterceptor>
           <UserForm/>
        </RouteInterceptor>
      }/>
    </Routes>
  )
}

export default App
