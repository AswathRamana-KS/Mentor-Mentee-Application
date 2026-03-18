import { Navigate } from "react-router-dom"

interface Props {
  children: React.ReactNode
  roles?: string[]  // if given, only these roles can access
}

export default function ProtectedRoute({ children, roles }: Props) {
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")

  // Not logged in at all
  if (!token) {
    return <Navigate to="/" />
  }

  // Logged in but wrong role
  if (roles && role && !roles.includes(role)) {
    // Redirect to their actual dashboard
    if (role === "admin") return <Navigate to="/admin-dashboard" />
    if (role === "practicehead") return <Navigate to="/approve-mentors" />
    if (role === "mentor") return <Navigate to="/mentor-dashboard" />
    return <Navigate to="/mentee-dashboard" />
  }

  return <>{children}</>
}
