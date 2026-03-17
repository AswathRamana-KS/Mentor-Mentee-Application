import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../services/authService"
import { getMyProfile } from "../services/employeeService"

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await loginUser(email, password)
      localStorage.setItem("token", response.access_token)

      const user = await getMyProfile()
      const role = user.role_type?.toLowerCase()
      localStorage.setItem("role", role)

      if (role === "admin") {
        navigate("/admin-dashboard")
      } else if (role === "team lead") {
        navigate("/approve-mentors")
      } else if (role === "mentor") {
        navigate("/mentor-dashboard")
      } else {
        navigate("/mentee-dashboard")
      }

    } catch (error) {
      console.error(error)
      alert("Invalid email or password")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white/90 backdrop-blur-md p-10 rounded-xl shadow-2xl w-96 border border-gray-200">

        <h2 className="text-3xl font-bold mb-2 text-center text-purple-700">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Sign in to continue your mentorship journey
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email address"
            className="w-full border border-gray-300 p-3 rounded-lg mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Login
          </button>

        </form>

      </div>
    </div>
  )
}