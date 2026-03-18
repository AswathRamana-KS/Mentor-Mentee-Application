import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Enroll from "./pages/Enroll";
import Login from "./pages/Login";
import MenteeDashboard from "./pages/MenteeDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Define your route here */}
        <Route path="/" element={<Enroll />} />
        {/* You should also add your register route since you use it in Link */}
        <Route path="/register" element={<div>Register Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;