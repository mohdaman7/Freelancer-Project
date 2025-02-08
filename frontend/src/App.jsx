import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppAdmin from "./admin/AppAdmin";
import AppUser from "./user/AppUser";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <Toaster richColors position="bottom-right" />
      <Routes>
        <Route path="/admin/*" element={<AppAdmin />} />
        <Route path="/*" element={<AppUser />} />
      </Routes>
    </Router>
  );
}

export default App;
