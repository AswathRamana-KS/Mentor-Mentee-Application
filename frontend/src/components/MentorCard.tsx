interface Props {
  name: string;
  skill: string;
  experience: string;
}

export default function MentorCard({ name, skill, experience }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-bold">{name}</h3>
      <p>Skill: {skill}</p>
      <p>Experience: {experience}</p>

      <button className="mt-3 bg-purple-600 text-white px-4 py-1 rounded">
        Request Mentor
      </button>
    </div>
  );
}