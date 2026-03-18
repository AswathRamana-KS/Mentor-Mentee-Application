import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginInit, loginComplete } from "../services/authService"

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [requiresSelection, setRequiresSelection] = useState(false)
    const [selectedRole, setSelectedRole] = useState<"Mentor" | "Mentee">("Mentee")

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await loginInit(email, password)

            // ✅ DIRECT LOGIN
            if (!res.requires_role_selection) {
                const role = res.roles[0]

                const tokenRes = await loginComplete(email, role)

                localStorage.setItem("token", tokenRes.access_token)
                localStorage.setItem("role", role.toLowerCase())

                redirect(role)
            }

            // ✅ NEED ROLE SELECTION
            else {
                setRequiresSelection(true)
            }

        } catch (err) {
            console.error(err)
            alert("Invalid credentials")
        }
    }

    const handleFinalLogin = async () => {
        try {
            const res = await loginComplete(email, selectedRole)

            localStorage.setItem("token", res.access_token)
            localStorage.setItem("role", selectedRole.toLowerCase())

            redirect(selectedRole)
        } catch (err) {
            console.error(err)
            alert("Login failed")
        }
    }

    const redirect = (role: string) => {
        role = role.toLowerCase()

        if (role === "admin") navigate("/admin-dashboard")
        else if (role === "practicehead") navigate("/approve-mentors")
        else if (role === "mentor") navigate("/mentor-dashboard")
        else if (role === "mentee") navigate("/mentee-dashboard")
        else navigate("/")
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">

            <div className="bg-white p-10 rounded-xl shadow-2xl w-96">

                <h2 className="text-3xl font-bold mb-2 text-center text-purple-700">
                    Welcome Back
                </h2>

                <p className="text-center text-gray-500 mb-6">
                    Sign in to continue
                </p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        disabled={requiresSelection}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-3 rounded-lg mb-4"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        disabled={requiresSelection}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-3 rounded-lg mb-4"
                        required
                    />

                    {!requiresSelection && (
                        <button className="w-full bg-purple-600 text-white p-3 rounded-lg">
                            Login
                        </button>
                    )}

                </form>

                {/* 🔥 TOGGLE UI (LIKE ENROLL) */}
                {requiresSelection && (
                    <>
                        <div className="flex justify-center mt-4 mb-6">
                            <div
                                className="relative flex w-full max-w-[200px] bg-gray-200 p-1 rounded-full cursor-pointer"
                                onClick={() =>
                                    setSelectedRole(prev =>
                                        prev === "Mentor" ? "Mentee" : "Mentor"
                                    )
                                }
                            >
                                <div
                                    className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-transform duration-300 ${
                                        selectedRole === "Mentor"
                                            ? "translate-x-full"
                                            : "translate-x-0"
                                    }`}
                                ></div>

                                <div className={`flex-1 text-center py-1.5 z-10 ${
                                    selectedRole === "Mentee"
                                        ? "text-purple-700"
                                        : "text-gray-500"
                                }`}>
                                    Mentee
                                </div>

                                <div className={`flex-1 text-center py-1.5 z-10 ${
                                    selectedRole === "Mentor"
                                        ? "text-purple-700"
                                        : "text-gray-500"
                                }`}>
                                    Mentor
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleFinalLogin}
                            className="w-full text-purple-700 text-white p-3 rounded-lg"
                        >
                            Continue as {selectedRole}
                        </button>
                    </>
                )}

            </div>

        </div>
    )
}