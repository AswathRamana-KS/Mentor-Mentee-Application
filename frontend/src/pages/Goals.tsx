import { useEffect, useState } from "react"
import { getMyMentorships } from "../services/mentorService"
import { getGoals } from "../services/goalService"

export default function Goals() {
  const [mentorships, setMentorships] = useState<any[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [goals, setGoals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMyMentorships().then(async data => {
      setMentorships(data)
      if (data.length > 0) {
        setSelected(data[0].ms_id)
        setGoals(await getGoals(data[0].ms_id))
      }
    }).catch(console.error).finally(() => setLoading(false))
  }, [])

  const handleChange = async (ms_id: number) => {
    setSelected(ms_id)
    try { setGoals(await getGoals(ms_id)) } catch (e) { console.error(e) }
  }

  if (loading) return <div className="page"><div className="loading">Loading...</div></div>

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">My Goals</h1>
        <p className="page-sub">{goals.length} goal(s) assigned</p>
      </div>

      {mentorships.length === 0 ? (
        <div className="card"><div className="empty">No active mentorships yet. Browse mentors to get started!</div></div>
      ) : (
        <>
          {mentorships.length > 1 && (
            <div style={{ marginBottom: "20px", maxWidth: "320px" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Mentorship</label>
                <select value={selected ?? ""} onChange={e => handleChange(Number(e.target.value))}>
                  {mentorships.map(ms => (
                    <option key={ms.ms_id} value={ms.ms_id}>
                      #{ms.ms_id} — Skill {ms.skill_id}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {goals.length === 0 ? (
            <div className="card"><div className="empty">No goals set yet. Your mentor will assign goals soon.</div></div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {goals.map(g => (
                <div key={g.g_id} className="card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <div style={{ fontWeight: 600, fontSize: "16px" }}>{g.title}</div>
                    <span className="badge badge-blue">Due {g.deadline}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--text2)", marginBottom: "16px", lineHeight: 1.6 }}>{g.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div className="progress-wrap">
                      <div className="progress-bar" style={{ width: `${g.percent}%` }} />
                    </div>
                    <span style={{ fontWeight: 600, color: "var(--teal-400)", fontSize: "13px", minWidth: "36px", textAlign: "right" }}>
                      {g.percent}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}