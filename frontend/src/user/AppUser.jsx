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
    </Routes>
  )
}

export default AppUser
