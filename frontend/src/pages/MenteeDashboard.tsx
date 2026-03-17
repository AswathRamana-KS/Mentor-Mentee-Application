import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getMyProfile } from "../services/employeeService"
import { getMyMentorships, getMentorshipRequests, applyToBementor } from "../services/mentorService"
import { getSkills } from "../services/skillService"

export default function MenteeDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [mentorships, setMentorships] = useState<any[]>([])
  const [pending, setPending] = useState<any[]>([])
  const [skills, setSkills] = useState<any[]>([])
  const [selectedSkill, setSelectedSkill] = useState("")
  const [showApply, setShowApply] = useState(false)
  const [applying, setApplying] = useState(false)

  useEffect(() => {
    Promise.all([getMyProfile(), getMyMentorships(), getMentorshipRequests(), getSkills()])
      .then(([p, m, r, s]) => {
        setUser(p); setMentorships(m)
        setPending(r.filter((x: any) => x.status === "Pending"))
        setSkills(s)
      }).catch(console.error)
  }, [])

  const handleApply = async (e: any) => {
    e.preventDefault()
    if (!selectedSkill) return
    setApplying(true)
    try {
      await applyToBementor(Number(selectedSkill))
      alert("Application submitted! Waiting for Practice Head approval.")
      setShowApply(false); setSelectedSkill("")
    } catch (err: any) {
      alert(err?.response?.data?.detail || "Error submitting")
    } finally { setApplying(false) }
  }

  const canApply = user && user.years_of_exp >= 7

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Welcome, {user?.name || "..."}</h1>
        <p className="page-sub">Your mentorship overview</p>
      </div>

      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Active Mentorships</div>
          <div className="stat-value">{mentorships.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending Requests</div>
          <div className="stat-value">{pending.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Experience</div>
          <div className="stat-value">{user?.years_of_exp ?? "—"}<span style={{ fontSize: "14px", color: "var(--text3)" }}> yrs</span></div>
        </div>
      </div>

     
      <div className="dashboard-grid" style={{ marginBottom: "28px" }}>
        <Link to="/browse-mentors" className="dashboard-card">
          <div className="card-icon">🔍</div>
          <div className="card-title">Browse Mentors</div>
          <div className="card-desc">Find a mentor by skill</div>
          <div className="card-arrow">Go →</div>
        </Link>
        {mentorships.length > 0 && (
          <Link to="/goals" className="dashboard-card">
            <div className="card-icon">📈</div>
            <div className="card-title">My Goals</div>
            <div className="card-desc">{mentorships.length} active mentorship(s)</div>
            <div className="card-arrow">View →</div>
          </Link>
        )}
        <Link to="/mentor-requests" className="dashboard-card">
          <div className="card-icon">📬</div>
          <div className="card-title">My Requests</div>
          <div className="card-desc">{pending.length} pending request(s)</div>
          <div className="card-arrow">View →</div>
        </Link>
      </div>

      
      <div className="card" style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="card-title">Become a Mentor</div>
            <div className="card-desc" style={{ marginTop: "4px" }}>
              {canApply
                ? "You're eligible! Apply to mentor others in a skill."
                : `Requires 7+ years of experience. You have ${user?.years_of_exp ?? "..."} year(s).`}
            </div>
          </div>
          {canApply && (
            <button onClick={() => setShowApply(s => !s)} className="btn btn-primary">
              {showApply ? "Cancel" : "Apply to Mentor"}
            </button>
          )}
        </div>
        {showApply && canApply && (
          <>
            <hr className="divider" />
            <form onSubmit={handleApply} style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}>
              <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                <label>Select Skill</label>
                <select value={selectedSkill} onChange={e => setSelectedSkill(e.target.value)} required>
                  <option value="">— Select Skill —</option>
                  {skills.map(s => <option key={s.skill_id} value={s.skill_id}>{s.skill_name}</option>)}
                </select>
              </div>
              <button type="submit" disabled={applying} className="btn btn-success">
                {applying ? "Submitting..." : "Submit"}
              </button>
            </form>
          </>
        )}
      </div>

      {/* Active mentorships */}
      {mentorships.length > 0 && (
        <>
          <h2 className="section-title">Active Mentorships</h2>
          <div className="table-card">
            <table>
              <thead><tr><th>Mentorship ID</th><th>Mentor ID</th><th>Skill</th><th></th></tr></thead>
              <tbody>
                {mentorships.map(ms => (
                  <tr key={ms.ms_id}>
                    <td style={{ color: "var(--text3)" }}>#{ms.ms_id}</td>
                    <td style={{ fontWeight: 500 }}>#{ms.mentor_id}</td>
                    <td><span className="badge badge-green">Skill #{ms.skill_id}</span></td>
                    <td><Link to="/goals" style={{ color: "var(--teal-400)", fontSize: "13px", textDecoration: "none" }}>View Goals →</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}