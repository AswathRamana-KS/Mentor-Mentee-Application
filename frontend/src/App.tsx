
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import MenteeDashboard from "./pages/MenteeDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import BrowseMentors from "./pages/BrowseMentors";
import Goals from "./pages/Goals";
import AdminDashboard from "./pages/AdminDashboard"

import AddEmployee from "./pages/AddEmployee";
import AddPracticeHead from "./pages/AddPracticeHead";
import CreateSkill from "./pages/CreateSkill";
import ApproveMentors from "./pages/ApproveMentors";
import UpdateGoal from "./pages/UpdateGoal";

import ProtectedRoute from "./components/ProtectedRoute";

function Layout() {

  const location = useLocation()

  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/register"

  return (
    <>
      {!hideNavbar && <Navbar />}

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
          path="/browse-mentors"
          element={
            <ProtectedRoute>
              <BrowseMentors />
            </ProtectedRoute>
          }
        />
        <Route
 path="/admin-dashboard"
 element={
   <ProtectedRoute>
     <AdminDashboard/>
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

        <Route
          path="/update-goal"
          element={
            <ProtectedRoute>
              <UpdateGoal />
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
          path="/add-employee"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-practice-head"
          element={
            <ProtectedRoute>
              <AddPracticeHead />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-skill"
          element={
            <ProtectedRoute>
              <CreateSkill />
            </ProtectedRoute>
          }
        />

        <Route
          path="/approve-mentors"
          element={
            <ProtectedRoute>
              <ApproveMentors />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App;

