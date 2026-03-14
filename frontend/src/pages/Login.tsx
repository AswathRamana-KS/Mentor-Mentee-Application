import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../services/authService"


export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    try {

      const response = await loginUser(email, password)

      console.log("Token:", response.access_token)

      // store JWT token
      localStorage.setItem("token", response.access_token)

      alert("Login successful")

      // redirect to dashboard
      navigate("/mentee-dashboard")

    } catch (error) {

      alert("Invalid email or password")

    }
  }

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/mentoring-concept-illustration_114360-8077.jpg')",
      }}
    >

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
            className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
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

        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-purple-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  )
}