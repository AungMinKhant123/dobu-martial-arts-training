import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getInstructorById } from "../../services/instructorService";

const InstructorDetail = () => {
  const { id } = useParams();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const testimonials = [
    {
      id: 1,
      name: "Emily Johnson",
      rating: 5,
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256",
      feedback:
        "The instructors are amazing and assisted me to gain my goals in quick.",
      class: "Karate",
    },
    {
      id: 2,
      name: "Emily Johnson",
      rating: 5,
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256",
      feedback:
        "The instructors are amazing and assisted me to gain my goals in quick.",
      class: "Karate",
    },
    {
      id: 3,
      name: "Emily Johnson",
      rating: 5,
      avatarUrl:
        "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=256",
      feedback:
        "The instructors are amazing and assisted me to gain my goals in quick.",
      class: "Karate",
    },
  ];

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
              Book a Class
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

      <div className="text-center my-16">
        <h1 className="text-5xl uppercase my-6">
          What Our <span className="text-(--primary-color)">Student Say</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center">
          {testimonials.map((item) => (
            <div key={item.id} className="flex items-center gap-6 p-4">
              {/* Avatar with Golden Circular Border */}
              <div className="relative w-28 h-28 shrink-0 rounded-full border-4 border-[#EAB308] overflow-hidden bg-gray-900">
                <img
                  src={item.avatarUrl}
                  alt={`${item.name}'s avatar`}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Content Block (Stars + Name) */}
              <div className="flex flex-col justify-center gap-4">
                {/* Star Rating Layout */}
                <div className="flex items-center gap-1 text-[#EAB308] text-xl">
                  {[...Array(5)].map((_, index) => (
                    <span key={index} aria-hidden="true">
                      {index < item.rating ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <p>{item.feedback}</p>
                {/* User Name */}
                <h3 className="text-lg font-bold text-[#EAB308] tracking-wide">
                  {item.name}
                </h3>
                <p className="font-semibold">{item.class} Student</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-16">
        <h1 className="text-5xl text-red-500">
          Photo <span className="text-amber-400">Gallary</span>
        </h1>
        <div className="flex gap-5">
          <div className="mt-6">
            <img
              src="https://images.unsplash.com/photo-1606335543042-57c525922933?q=80&w=2675&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="People wearing karate gi"
              className="w-full h-full object-cover"
            />
            <p className="mt-6 text-2xl font-semibold">Self Defence</p>
          </div>
          <div className="mt-6">
            <img
              src="https://images.unsplash.com/photo-1555597408-26bc8e548a46?q=80&w=2723&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Man lying on floor"
              className="w-full h-full object-cover"
            />
            <p className="mt-6 text-2xl font-semibold">Karate Training</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-16 pt-16">
        <h1 className="text-5xl font-bold mt-16">
          Ready to Train with{" "}
          <span className="text-(--primary-color)">
            Sensei {instructor.name}?
          </span>
        </h1>
        <p className="mt-10 font-3xl font-semibold">
          Join one of Sensei {instructor.name}'s Karate classes and take the
          first step toward improving your confidence, discipline, and physical
          fitness in a supportive training environment.
        </p>
        <Link
          to="/enrollment"
          className="inline-block bg-red-600 text-white px-4 py-2 rounded mt-6"
        >
          Book a Class
        </Link>
      </div>
    </div>
  );
};

export default InstructorDetail;
