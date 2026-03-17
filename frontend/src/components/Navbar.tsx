import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Navbar() {
  const role = localStorage.getItem("role")
  const navigate = useNavigate()
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"))

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    localStorage.setItem("theme", dark ? "dark" : "light")
  }, [dark])

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "dark") {
      setDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("emp_id")
    navigate("/")
  }

  return (
    <nav style={{
      background: "var(--surface)",
      borderBottom: "1px solid var(--border2)",
      padding: "0 28px",
      height: "56px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "var(--shadow)",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>

      
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{
          width: "28px", height: "28px", borderRadius: "8px",
          background: "var(--teal-400)", display: "flex",
          alignItems: "center", justifyContent: "center"
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="5" cy="5" r="3" fill="white" fillOpacity="0.9"/>
            <circle cx="11" cy="11" r="3" fill="white" fillOpacity="0.6"/>
            <line x1="7" y1="6" x2="9" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <span style={{ fontWeight: 600, fontSize: "15px", color: "var(--teal-400)", letterSpacing: "-0.3px" }}>
          MentorMentee
        </span>
      </div>

      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        {role === "admin" && (
          <>
            <NavLink to="/admin-dashboard" label="Dashboard" />
            <NavLink to="/add-employee" label="Add Employee" />
            <NavLink to="/create-skill" label="Skills" />
            <NavLink to="/add-practice-head" label="Practice Heads" />
            <NavLink to="/view-mentors" label="Mentors" />
            <NavLink to="/view-mentees" label="Mentees" />
          </>
        )}
        {role === "team lead" && (
          <>
            <NavLink to="/approve-mentors" label="Applications" />
            <NavLink to="/mentors-by-skill" label="Mentors by Skill" />
          </>
        )}
        {role === "senior developer" && (
          <>
            <NavLink to="/mentor-dashboard" label="Dashboard" />
            <NavLink to="/update-goal" label="Goals" />
          </>
        )}
        {!["admin", "team lead", "senior developer"].includes(role || "") && role && (
          <>
            <NavLink to="/mentee-dashboard" label="Dashboard" />
            <NavLink to="/browse-mentors" label="Browse Mentors" />
            <NavLink to="/goals" label="My Goals" />
            <NavLink to="/mentor-requests" label="Requests" />
          </>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button
          onClick={() => setDark(d => !d)}
          style={{
            width: "34px", height: "34px",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border2)",
            background: "var(--surface2)",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "15px", color: "var(--text2)"
          }}
          title="Toggle dark mode"
        >
          {dark ? "☾" : "☀"}
        </button>
        <button onClick={handleLogout} className="btn btn-secondary btn-sm">
          Logout
        </button>
      </div>
    </nav>
  )
}

function NavLink({ to, label }: { to: string; label: string }) {
  const active = window.location.pathname === to
  return (
    <Link to={to} style={{
      padding: "6px 12px",
      borderRadius: "var(--radius-sm)",
      fontSize: "13px",
      color: active ? "var(--teal-400)" : "var(--text2)",
      background: active ? "var(--teal-50)" : "transparent",
      textDecoration: "none",
      fontWeight: active ? 500 : 400,
      transition: "background 0.15s, color 0.15s"
    }}>
      {label}
    </Link>
  )
}