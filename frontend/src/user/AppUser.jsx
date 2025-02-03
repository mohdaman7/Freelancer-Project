import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Home';
import GetStartedPage from './components/GetStarted';
import ClientRegister from './pages/ClientRegister';
import ClientLogin from './pages/ClientLogin';

const AppUser = () => {
  return (
    <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/get-started' element={<GetStartedPage/>}/>
        <Route path='/client-register' element={<ClientRegister/>} />
        <Route path='/client-login' element={<ClientLogin/>}/>
    </Routes>
  )
}

export default AppUser
