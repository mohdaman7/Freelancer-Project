import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Home';
import GetStartedPage from './components/GetStarted';
import ClientRegister from './pages/ClientRegister';
import ClientLogin from './pages/ClientLogin';
import DeveloperRegister from './pages/DeveloperRegister';
import Developers from './pages/Developers';
import DeveloperLogin from './pages/DeveloperLogin';
import PostJob from './components/PostJob';
import FindWorkPage from './pages/FindWork';
import JobDetailsPage from './components/JobDetails';
import ClientDashboard from './pages/ClientDashboard';
import DeveloperEarnings from './pages/DeveloperEarnings';
import DeveloperProfile from './pages/ProfilePage';
import LoginSelection from './components/Login';
import Notification from './components/Notification';
import NotificationDetail from './components/NotificationDetail';

const AppUser = () => {
  return (
    <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/get-started' element={<GetStartedPage/>}/>
        <Route path='/client-register' element={<ClientRegister/>} />
        <Route path='/client-login' element={<ClientLogin/>}/>
        <Route path='/freelancer-register' element={<DeveloperRegister/>}/>
        <Route path='/developers' element={<Developers/>}/>
        <Route path='/freelancer-login' element={<DeveloperLogin/>}/>
        <Route path='/post-job' element={<PostJob/>}/>
        <Route path='/find-work' element={<FindWorkPage/>}/>
        <Route path='/find-work/:id' element={<JobDetailsPage/>}/>
        <Route path='/client-dashboard' element={<ClientDashboard/>}/>
        <Route path='/freelancer-earnings' element={<DeveloperEarnings/>}/>
        <Route path='/freelancer-profile/:developerId' element={<DeveloperProfile/>}/>
        <Route path='/login' element={<LoginSelection/>}/>
        <Route path='/notification' element={<Notification/>}/>
        <Route path='/notification/:id' element={<NotificationDetail/>}/>
    </Routes>
  )
}

export default AppUser
