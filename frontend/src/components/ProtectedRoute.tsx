import { Navigate } from "react-router-dom"

interface Props {
  children: React.ReactNode
  roles?: string[]
}

export default function ProtectedRoute({ children, roles }: Props) {
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")

  if (!token) {
    return <Navigate to="/" />
  }

  if (roles && role && !roles.includes(role)) {
    if (role === "admin") return <Navigate to="/admin-dashboard" />
    if (role === "practicehead") return <Navigate to="/approve-mentors" />
    if (role === "mentor") return <Navigate to="/mentor-dashboard" />
    return <Navigate to="/mentee-dashboard" />
  }

  return <>{children}</>
}
