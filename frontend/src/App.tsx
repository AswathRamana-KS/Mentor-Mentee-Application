import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Enroll from "./pages/Enroll";

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