import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyProfile } from "../services/employeeService";

export default function MenteeDashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    const loadProfile = async () => {
      try {

        const data = await getMyProfile();

        setUser(data);

      } catch (error) {

        console.error("Error loading profile");

      }
    };

    loadProfile();

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Welcome {user?.name || "Mentee"}
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-3 gap-6">

        {/* Browse Mentors */}
        <div className="bg-white p-6 rounded-lg shadow-md">

          <h2 className="text-xl font-semibold mb-3">
            Find a Mentor
          </h2>

          <p className="text-gray-600 mb-4">
            Browse available mentors based on their expertise.
          </p>

          <Link
            to="/browse-mentors"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Browse Mentors
          </Link>

        </div>

        {/* My Mentorship */}
        <div className="bg-white p-6 rounded-lg shadow-md">

          <h2 className="text-xl font-semibold mb-3">
            My Mentorship
          </h2>

          <p className="text-gray-600 mb-4">
            View your current mentorship and progress.
          </p>

          <Link
            to="/goals"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            View Goals
          </Link>

        </div>

        {/* Request Status */}
        <div className="bg-white p-6 rounded-lg shadow-md">

          <h2 className="text-xl font-semibold mb-3">
            Request Status
          </h2>

          <p className="text-gray-600 mb-4">
            Track mentor requests you have sent.
          </p>

          <button className="bg-gray-800 text-white px-4 py-2 rounded">
            View Requests
          </button>

        </div>

      </div>

      {/* Example Mentorship Info */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">

        <h2 className="text-xl font-semibold mb-4">
          Current Mentor
        </h2>

        <p><strong>Name:</strong> Rahul Sharma</p>
        <p><strong>Skill:</strong> Python Development</p>

        <div className="mt-4">

          <p className="font-semibold mb-2">Progress</p>

          <div className="w-full bg-gray-300 rounded h-4">
            <div className="bg-purple-600 h-4 rounded w-2/5"></div>
          </div>

        </div>

      </div>

    </div>
  );
}