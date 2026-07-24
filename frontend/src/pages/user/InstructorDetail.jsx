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
    <div className="container max-w-6xl mx-auto my-6">
      <div className="flex items-end gap-7">
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
        <div className="">
          <h1 className="text-3xl font-bold mb-2">
            Sensei{" "}
            <span className="text-(--primary-color)">{instructor.name}</span>
          </h1>
          {instructor.beltLevel && (
            <p className="text-sm mb-2">Belt Level: {instructor.beltLevel}</p>
          )}
          {instructor.experienceYears !== null &&
            instructor.experienceYears !== undefined && (
              <p className="text-sm mb-4">
                {instructor.experienceYears} years experience
              </p>
            )}
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

      <div className="flex my-7 gap-3">
        <div className="prose w-xl mb-6">
          <h3 className="text-lg">
            About{" "}
            <span className="text-(--primary-color)">
              Sensei {instructor.name}
            </span>
          </h3>
          <p className="mt-6">{instructor.biography}</p>
        </div>
        <div className="flex flex-col">
          <div>
            <h3 className="font-semibold text-(--primary-color)">
              Qualifications
            </h3>
            <ul className="list-disc mt-3 ml-5">
              {instructor.qualifications?.length ? (
                instructor.qualifications.map((q) => (
                  <li key={q.id}>{q.title}</li>
                ))
              ) : (
                <li>None listed</li>
              )}
            </ul>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-(--primary-color)">
              Specialties
            </h3>
            <ul className="list-disc mt-3 ml-5">
              {instructor.specialties?.length ? (
                instructor.specialties.map((s) => <li key={s.id}>{s.name}</li>)
              ) : (
                <li>None listed</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex my-7 gap-3">
        <div className="w-xl">
          <h3 className="font-semibold text-(--primary-color)">
            Professional Certifications
          </h3>
          <ul className="list-disc mt-3 ml-5">
            {instructor.certifications?.length ? (
              instructor.certifications.map((c) => <li key={c.id}>{c.name}</li>)
            ) : (
              <li>None listed</li>
            )}
          </ul>
        </div>
        <div className="">
          <h3 className="font-semibold text-(--primary-color)">Achievements</h3>
          <ul className="list-disc mt-3 ml-5">
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
      </div>
    </div>
  );
};

export default InstructorDetail;
