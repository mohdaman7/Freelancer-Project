
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AppAdmin from './admin/AppAdmin';


function App() {

  return (
    <Router>
      <Routes>
        
        <Route path='/admin/*' element={<AppAdmin/>}/>


      </Routes>
    </Router>
  )
}

export default App
