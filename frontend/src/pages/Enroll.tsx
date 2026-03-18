import { useState, useEffect } from "react";
import { enrollUser } from "../services/authService";
import { getMyProfile } from "../services/employeeService";
import { getSkills } from "../services/skillService";

interface Skill {
  skill_id: number;
  skill_name: string;
}

export default function Enroll() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [isMentor, setIsMentor] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkillId, setSelectedSkillId] = useState<number | string>("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillList = await getSkills();
        setSkills(skillList);
      } catch (error) {
        console.error("Failed to fetch skills", error);
      }
    };

    if (isMentor) {
      fetchSkills();
    }
  }, [isMentor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log(selectedSkillId);
      const response = await enrollUser(email, password, isMentor, Number(selectedSkillId));
      localStorage.setItem("token", response.access_token);

      const user = await getMyProfile();
      console.log("User Profile:", user);

      const role = user.role_type?.toLowerCase();
      localStorage.setItem("role", role);
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white/90 backdrop-blur-md p-10 rounded-xl shadow-2xl w-96 border border-gray-200">
        <h2 className="text-3xl font-bold mb-2 text-center text-purple-700">
          Hello There :)
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Enroll into the Mentor Mentee Application
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

          {/* Slidable Toggle Switch */}
          <div className="flex justify-center mb-6">
            <div 
              className="relative flex w-full max-w-[200px] bg-gray-200 p-1 rounded-full cursor-pointer"
              onClick={() => setIsMentor(!isMentor)}
            >
              {/* Sliding Background Pill */}
              <div 
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out ${
                  isMentor ? "translate-x-full" : "translate-x-0"
                }`}
              ></div>

              {/* Labels */}
              <div className={`relative z-10 flex-1 text-center py-1.5 text-sm font-semibold transition-colors duration-300 ${!isMentor ? "text-purple-700" : "text-gray-500"}`}>
                Mentee
              </div>
              <div className={`relative z-10 flex-1 text-center py-1.5 text-sm font-semibold transition-colors duration-300 ${isMentor ? "text-purple-700" : "text-gray-500"}`}>
                Mentor
              </div>
            </div>
          </div>

          {/* Conditional Dropdown for Mentor Skills */}
          {isMentor && (
            <select
              className="w-full border border-gray-300 p-3 rounded-lg mb-6 bg-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
              value={selectedSkillId}
              onChange={(e) => setSelectedSkillId   (e.target.value)}
              required
            >
              <option value="" disabled>Select your primary skill</option>
              {skills.map((skill) => (
                <option key={skill.skill_id} value={skill.skill_id}>
                  {skill.skill_name}
                </option>
              ))}
            </select>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Enroll
          </button>
        </form>
      </div>
    </div>
  );
}