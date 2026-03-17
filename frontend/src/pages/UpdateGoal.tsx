import { useState, useEffect } from "react"
import { createGoal, updateGoalPercent, getGoals } from "../services/goalService"
import { getMyMentees } from "../services/mentorService"
import { useSearchParams } from "react-router-dom"

export default function UpdateGoal() {
  const [searchParams] = useSearchParams()
  const [mentees, setMentees] = useState<any[]>([])
  const [msId, setMsId] = useState(searchParams.get("ms_id") || "")
  const [tab, setTab] = useState<"create" | "update">("create")
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [deadline, setDeadline] = useState("")
  const [percent, setPercent] = useState("0")
  const [goals, setGoals] = useState<any[]>([])
  const [goalId, setGoalId] = useState("")
  const [newPct, setNewPct] = useState("0")

  useEffect(() => {
    getMyMentees().then(setMentees).catch(console.error)
  }, [])

  useEffect(() => {
    if (msId && tab === "update") {
      getGoals(Number(msId)).then(setGoals).catch(console.error)
    }
  }, [msId, tab])

  const handleCreate = async (e: any) => {
    e.preventDefault()
    if (!msId) { alert("Select a mentee"); return }
    try {
      await createGoal(Number(msId), { title, desc, deadline, percent: Number(percent) })
      alert("Goal created!")
      setTitle(""); setDesc(""); setDeadline(""); setPercent("0")
    } catch (e: any) { alert(e?.response?.data?.detail || "Error") }
  }

  const handleUpdate = async (e: any) => {
    e.preventDefault()
    if (!goalId) { alert("Select a goal"); return }
    try {
      await updateGoalPercent(Number(goalId), Number(newPct))
      alert("Progress updated!")
      getGoals(Number(msId)).then(setGoals)
    } catch (e: any) { alert(e?.response?.data?.detail || "Error") }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Goal Management</h1>
        <p className="page-sub">Set and update goals for your mentees</p>
      </div>

      <div className="form-card" style={{ maxWidth: "520px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {(["create", "update"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`btn ${tab === t ? "btn-primary" : "btn-secondary"}`}>
              {t === "create" ? "Set New Goal" : "Update Progress"}
            </button>
          ))}
        </div>

        
        <div className="form-group">
          <label>Select Mentee</label>
          <select value={msId} onChange={e => setMsId(e.target.value)}>
            <option value="">— Select —</option>
            {mentees.map(m => (
              <option key={m.ms_id} value={m.ms_id}>
                Mentorship #{m.ms_id} | Mentee #{m.mentee_id}
              </option>
            ))}
          </select>
        </div>

        {tab === "create" && (
          <form onSubmit={handleCreate}>
            <div className="form-group"><label>Goal Title</label>
              <input placeholder="e.g. Learn Python basics" value={title} onChange={e => setTitle(e.target.value)} required /></div>
            <div className="form-group"><label>Description</label>
              <textarea placeholder="Describe the goal..." value={desc} onChange={e => setDesc(e.target.value)} rows={3} required style={{ resize: "vertical" }} /></div>
            <div className="form-group"><label>Deadline</label>
              <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} required /></div>
            <div className="form-group">
              <label>Initial Progress — {percent}%</label>
              <input type="range" min="0" max="100" step="5" value={percent}
                onChange={e => setPercent(e.target.value)}
                style={{ width: "100%", accentColor: "var(--teal-400)" }} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Create Goal
            </button>
          </form>
        )}

        {tab === "update" && (
          <form onSubmit={handleUpdate}>
            {goals.length === 0 ? (
              <div className="notice notice-info">Select a mentee above to load their goals.</div>
            ) : (
              <>
                <div className="form-group"><label>Select Goal</label>
                  <select value={goalId} onChange={e => {
                    setGoalId(e.target.value)
                    const g = goals.find(g => g.g_id === Number(e.target.value))
                    if (g) setNewPct(String(g.percent))
                  }} required>
                    <option value="">— Select Goal —</option>
                    {goals.map(g => <option key={g.g_id} value={g.g_id}>{g.title} ({g.percent}%)</option>)}
                  </select></div>
                <div className="form-group">
                  <label>New Progress — {newPct}%</label>
                  <input type="range" min="0" max="100" step="5" value={newPct}
                    onChange={e => setNewPct(e.target.value)}
                    style={{ width: "100%", accentColor: "var(--teal-400)" }} />
                </div>
                <button type="submit" className="btn btn-success" style={{ width: "100%", justifyContent: "center" }}>
                  Update Progress
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  )
}