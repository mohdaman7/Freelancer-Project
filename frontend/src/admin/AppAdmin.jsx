
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import Jobs from './pages/Jobs';
import Transaction from './pages/Transaction';
import Feedback from './pages/Feedback';
import Analytics from './pages/Analytics';
import AdminLogin from './pages/login';

const AppAdmin = () => {
  return (
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/users' element={<UserManagement/>}/>
        <Route path='/jobs' element={<Jobs/>}/>
        <Route path='/transactions' element={<Transaction/>}/>
        <Route path='/feedback' element={<Feedback/>}/>
        <Route path='/analytics' element={<Analytics/>}/>
        <Route path='/login' element={<AdminLogin/>}/>
    </Routes>
  )
}

export default AppAdmin

