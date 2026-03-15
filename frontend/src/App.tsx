import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import MenteeDashboard from "./pages/MenteeDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import BrowseMentors from "./pages/BrowseMentors";
import Goals from "./pages/Goals";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/mentee-dashboard"
          element={
            <ProtectedRoute>
              <MenteeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mentor-dashboard"
          element={
            <ProtectedRoute>
              <MentorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/browse-mentors"
          element={
            <ProtectedRoute>
              <BrowseMentors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/goals"
          element={
            <ProtectedRoute>
              <Goals />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
