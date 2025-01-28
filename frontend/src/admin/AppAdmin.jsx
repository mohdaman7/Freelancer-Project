
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import Jobs from './pages/Jobs';

const AppAdmin = () => {
  return (
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/users' element={<UserManagement/>}/>
        <Route path='/jobs' element={<Jobs/>}/>
    </Routes>
  )
}

export default AppAdmin

