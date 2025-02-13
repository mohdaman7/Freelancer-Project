import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppAdmin from "./admin/AppAdmin";
import AppUser from "./user/AppUser";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <Toaster  position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />
      <Routes>
        <Route path="/admin/*" element={<AppAdmin />} />
        <Route path="/*" element={<AppUser />} />
      </Routes>
    </Router>
  );
}

export default App;
