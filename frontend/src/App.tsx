import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import MenteeDashboard from "./pages/MenteeDashboard"
import MentorDashboard from "./pages/MentorDashboard"
import BrowseMentors from "./pages/BrowseMentors"
import Goals from "./pages/Goals"
import AdminDashboard from "./pages/AdminDashboard"
import ViewPracticeHeads from "./pages/ViewPracticeHeads"
import ViewMentors from "./pages/ViewMentors"
import ViewMentees from "./pages/ViewMentees"
import ViewMentorsBySkill from "./pages/ViewMentorsBySkill"
import MentorRequests from "./pages/MentorRequests"
import AddEmployee from "./pages/AddEmployee"
import AddPracticeHead from "./pages/AddPracticeHead"
import CreateSkill from "./pages/CreateSkill"
import ApproveMentors from "./pages/ApproveMentors"
import UpdateGoal from "./pages/UpdateGoal"
import ProtectedRoute from "./components/ProtectedRoute"

function Layout() {
  const location = useLocation()
  const hideNavbar = location.pathname === "/"  // FIXED: register route removed

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/add-employee" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
        <Route path="/add-practice-head" element={<ProtectedRoute><AddPracticeHead /></ProtectedRoute>} />
        <Route path="/create-skill" element={<ProtectedRoute><CreateSkill /></ProtectedRoute>} />
        <Route path="/view-practice-heads" element={<ProtectedRoute><ViewPracticeHeads /></ProtectedRoute>} />
        <Route path="/view-mentors" element={<ProtectedRoute><ViewMentors /></ProtectedRoute>} />
        <Route path="/view-mentees" element={<ProtectedRoute><ViewMentees /></ProtectedRoute>} />

        <Route path="/approve-mentors" element={<ProtectedRoute><ApproveMentors /></ProtectedRoute>} />
        <Route path="/mentors-by-skill" element={<ProtectedRoute><ViewMentorsBySkill /></ProtectedRoute>} />

        <Route path="/mentor-dashboard" element={<ProtectedRoute><MentorDashboard /></ProtectedRoute>} />
        <Route path="/update-goal" element={<ProtectedRoute><UpdateGoal /></ProtectedRoute>} />

        <Route path="/mentee-dashboard" element={<ProtectedRoute><MenteeDashboard /></ProtectedRoute>} />
        <Route path="/browse-mentors" element={<ProtectedRoute><BrowseMentors /></ProtectedRoute>} />
        <Route path="/mentor-requests" element={<ProtectedRoute><MentorRequests /></ProtectedRoute>} />
        <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}