import MentorCard from "../components/MentorCard";

export default function BrowseMentors() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">Available Mentors</h1>

      <div className="grid grid-cols-3 gap-6">

        <MentorCard
          name="Rahul Sharma"
          skill="Python"
          experience="5 years"
        />

        <MentorCard
          name="Anita Verma"
          skill="React"
          experience="4 years"
        />

        <MentorCard
          name="Amit Patel"
          skill="Machine Learning"
          experience="6 years"
        />

      </div>

    </div>
  );
}