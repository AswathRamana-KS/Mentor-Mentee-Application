import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../services/authService"
import { getMyProfile } from "../services/employeeService"
import API from "../services/api"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "dark") document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await loginUser(email, password)
      localStorage.setItem("token", response.access_token)
      const user = await getMyProfile()
      const role = user.role_type?.toLowerCase()
      localStorage.setItem("role", role)
      localStorage.setItem("emp_id", String(user.emp_id))

      const isMentor = await API.get("/mentor/getmentee").then(() => true).catch(() => false)

      if (role === "admin") navigate("/admin-dashboard")
      else if (role === "team lead") navigate("/approve-mentors")
      else if (isMentor) navigate("/mentor-dashboard")
      else navigate("/mentee-dashboard")
    } catch {
      alert("Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg)",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{ width: "100%", maxWidth: "420px", padding: "0 16px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "52px", height: "52px", borderRadius: "14px",
            background: "var(--teal-400)", margin: "0 auto 12px",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <svg width="28" height="28" viewBox="0 0 16 16" fill="none">
              <circle cx="5" cy="5" r="3" fill="white" fillOpacity="0.9"/>
              <circle cx="11" cy="11" r="3" fill="white" fillOpacity="0.6"/>
              <line x1="7" y1="6" x2="9" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: 600, color: "var(--text)" }}>MentorMentee</h1>
          <p style={{ fontSize: "13px", color: "var(--text3)", marginTop: "4px" }}>Sign in to your account</p>
        </div>

        {/* Form card */}
        <div className="form-card" style={{ maxWidth: "100%" }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" placeholder="you@company.com"
                value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" disabled={loading}
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center", padding: "10px", marginTop: "8px" }}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}