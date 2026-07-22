import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getInstructorById } from "../../services/instructorService";

const InstructorDetail = () => {
  const { id } = useParams();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getInstructorById(id);

        if (!data) {
          setError("Instructor not found");
          setInstructor(null);
          return;
        }

        setInstructor(data);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchInstructor();
  }, [id]);

  if (loading)
    return (
      <div className="container mx-auto px-4 py-12">Loading instructor...</div>
    );
  if (error) return <div className="container mx-auto px-4 py-12">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          {instructor.imageUrl ? (
            <img
              src={instructor.imageUrl}
              alt={instructor.name}
              className="w-full object-cover rounded"
            />
          ) : (
            <div className="w-full h-60 bg-gray-200 rounded flex items-center justify-center">
              No image
            </div>
          )}
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{instructor.name}</h1>
          {instructor.beltLevel && (
            <p className="text-sm text-gray-600 mb-2">{instructor.beltLevel}</p>
          )}
          {instructor.experienceYears !== null &&
            instructor.experienceYears !== undefined && (
              <p className="text-sm text-gray-600 mb-4">
                {instructor.experienceYears} years experience
              </p>
            )}

          <div className="prose max-w-none mb-6">
            <p>{instructor.biography}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Qualifications</h3>
              <ul className="list-disc ml-5">
                {instructor.qualifications?.length ? (
                  instructor.qualifications.map((q) => (
                    <li key={q.id}>{q.title}</li>
                  ))
                ) : (
                  <li>None listed</li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Certifications</h3>
              <ul className="list-disc ml-5">
                {instructor.certifications?.length ? (
                  instructor.certifications.map((c) => (
                    <li key={c.id}>{c.name}</li>
                  ))
                ) : (
                  <li>None listed</li>
                )}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold">Achievements</h3>
            <ul className="list-disc ml-5">
              {instructor.achievements?.length ? (
                instructor.achievements.map((a) => (
                  <li key={a.id}>
                    {a.title}
                    {a.year ? ` (${a.year})` : ""}
                  </li>
                ))
              ) : (
                <li>None listed</li>
              )}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold">Specialties</h3>
            <ul className="list-disc ml-5">
              {instructor.specialties?.length ? (
                instructor.specialties.map((s) => <li key={s.id}>{s.name}</li>)
              ) : (
                <li>None listed</li>
              )}
            </ul>
          </div>

          <div className="mt-6">
            <Link
              to="/"
              className="inline-block bg-red-600 text-white px-4 py-2 rounded"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDetail;
