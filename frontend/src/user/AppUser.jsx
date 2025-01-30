import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Home';

const AppUser = () => {
  return (
    <Routes>
        <Route path='/' element={<Homepage/>}/>
    </Routes>
  )
}

export default AppUser
