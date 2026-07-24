import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import {
  Signal,
  Users,
  Clock,
  Award,
  Check,
  Trophy,
  BadgeCheck,
  Droplet,
  Shirt,
  ArrowLeft,
} from "lucide-react";
import Button from "../../components/Button";
import { getClassById } from "../../services/classService";

const formatLevel = (level) => {
  if (!level) return "";
  const map = {
    BEGINNER: "Beginner",
    INTERMEDIATE: "Intermediate",
    ADVANCED: "Advanced",
  };
  return map[level] || level;
};

const formatDuration = (minutes) => {
  if (!minutes && minutes !== 0) return "";
  if (minutes < 60) return `${minutes} min`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hrs} hour${hrs > 1 ? "s" : ""}/day`;
  return `${hrs}h ${mins}m/day`;
};

const defaultBenefits = [
  "Improve Physical Fitness and Flexibility",
  "Build Self-Confidence",
  "Learn Practical Self-Defense Skills",
  "Enhance Focus and Concentration",
  "Reduce Stress",
  "Improve Balance and Coordination",
  "Develop Discipline and Respect",
  "Make New Friends in a Positive Community",
];

const defaultWhatToBring = [
  "Comfortable Sports Clothing (A uniform will be provided during your trial class.)",
  "Water Bottle",
  "Small Towel",
  "Positive Attitude and Willingness to Learn",
  "Indoor Training Footwear (optional; training is typically barefoot)",
];

const ClassDetail = () => {
  const { classId } = useParams();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getClassById(classId);

        if (!data) {
          setError("Class not found");
          setClassData(null);
          return;
        }

        setClassData(data);
      } catch (err) {
        setError(err.message || "Failed to load class details");
      } finally {
        setLoading(false);
      }
    };

    fetchClass();
  }, [classId]);

  /* ---- Loading ---- */
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <p className="opacity-80 text-lg">Loading class details...</p>
      </div>
    );
  }

  /* ---- Error / Not Found ---- */
  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <p className="text-red-400 text-lg mb-4">{error}</p>
        <Link
          to="/classes"
          className="inline-flex items-center gap-2 text-(--accent-color) hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Classes
        </Link>
      </div>
    );
  }

  /* ---- Guard for null ---- */
  if (!classData) return null;

  const {
    title,
    description,
    imageUrl,
    level,
    minAge,
    duration,
    beltRequirement,
    overview,
    instructor,
    learningOutcomes,
  } = classData;

  const instructorName = instructor?.name || "TBA";
  const instructorImage =
    instructor?.imageUrl || "https://placehold.co/400x500?text=Instructor";

  const whoCanJoinGroups = ["Children", "Teenagers", "Adults", "All Fitness Levels"];
  const ageLabel = minAge ? `${minAge}+ Years` : "All Ages";

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Back link */}
      <Link
        to="/classes"
        className="inline-flex items-center gap-2 text-(--accent-color) hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Classes
      </Link>

      {/* Header / Hero */}
      <div className="grid md:grid-cols-2 gap-10 items-start mb-12">
        <div>
          <p className="text-(--accent-color) font-semibold text-sm tracking-wide uppercase mb-2">
            Class Details
          </p>
          <h1 className="font-['Poppins'] font-bold text-4xl mb-4">{title}</h1>
          <div className="w-16 h-1 bg-(--accent-color) mb-6" />
          <p className="opacity-90 leading-relaxed">{description}</p>
        </div>
        <img
          src={
            imageUrl ||
            `https://placehold.co/600x500?text=${encodeURIComponent(title || "Class")}`
          }
          alt={title}
          className="rounded-lg object-cover w-full max-h-[420px]"
        />
      </div>

      {/* Info Row */}
      <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Signal size={32} className="text-amber-400 shrink-0" />
            <h4 className="text-xl font-semibold">Level</h4>
          </div>
          <p className="opacity-90">{formatLevel(level)}</p>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Users size={32} className="text-amber-400 shrink-0" />
            <h4 className="text-xl font-semibold">Age Group</h4>
          </div>
          <p className="opacity-90">{ageLabel}</p>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Clock size={32} className="text-amber-400 shrink-0" />
            <h4 className="text-xl font-semibold">Duration</h4>
          </div>
          <p className="opacity-90">{formatDuration(duration)}</p>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Award size={32} className="text-amber-400 shrink-0" />
            <h4 className="text-xl font-semibold">Belt Requirement</h4>
          </div>
          <p className="opacity-90">{beltRequirement || "None"}</p>
        </div>
      </div>

      <div className="flex justify-center mb-16">
        <Button variant="accent" size="lg">
          Book This Class
        </Button>
      </div>

      {/* Overview / What You Will Learn */}
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <div>
          <h2 className="font-['Poppins'] font-bold text-2xl text-(--accent-color) mb-4">
            Class Overview
          </h2>
          <p className="opacity-90 leading-relaxed">
            {overview || "No overview available."}
          </p>
        </div>
        <div>
          <h2 className="font-['Poppins'] font-bold text-2xl text-(--accent-color) mb-4">
            What You Will Learn
          </h2>
          {learningOutcomes && learningOutcomes.length > 0 ? (
            <ul className="space-y-2">
              {learningOutcomes.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-2 opacity-90"
                >
                  <Check className="w-4 h-4 mt-1 shrink-0 text-(--accent-color)" />
                  {item.content}
                </li>
              ))}
            </ul>
          ) : (
            <p className="opacity-70">Curriculum details coming soon.</p>
          )}
        </div>
      </div>

      {/* Instructor */}
      {instructor && (
        <>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-10">
            <img
              src={instructorImage}
              alt={instructorName}
              className="rounded-lg object-cover w-[300px] max-h-[360px]"
            />
            <div className="text-center md:text-left">
              <p className="opacity-80 mb-1">Your Instructor</p>
              <h2 className="font-['Poppins'] font-bold text-3xl text-(--accent-color) mb-4">
                {instructorName}
              </h2>
              <ul className="space-y-2 mb-6 inline-block text-left">
                {instructor.beltLevel && (
                  <li className="flex items-center gap-2 opacity-90">
                    <Award className="w-4 h-4 text-(--primary-color)" />
                    {formatLevel(instructor.beltLevel)} Belt
                  </li>
                )}
                {instructor.experienceYears != null && (
                  <li className="flex items-center gap-2 opacity-90">
                    <Trophy className="w-4 h-4 text-(--primary-color)" />
                    {instructor.experienceYears}+ Years of Experience
                  </li>
                )}
                {(instructor.qualifications || []).slice(0, 1).map((q) => (
                  <li
                    key={q.id}
                    className="flex items-center gap-2 opacity-90"
                  >
                    <BadgeCheck className="w-4 h-4 text-(--primary-color)" />
                    {q.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {instructor.biography && (
            <div className="max-w-2xl mx-auto text-center mb-10">
              <p className="text-(--accent-color) font-semibold uppercase text-sm mb-3">
                About
              </p>
              <p className="opacity-90 leading-relaxed">
                {instructor.biography}
              </p>
            </div>
          )}

          <div className="text-center mb-16">
            <Link to={`/instructors/${instructor.id}`}>
              <Button variant="accent" size="lg">
                View Instructor Profile
              </Button>
            </Link>
          </div>
        </>
      )}

      {/* Benefits / Who Can Join / What to Bring */}
      <div className="grid md:grid-cols-3 gap-10 mb-12">
        <div>
          <h3 className="font-['Poppins'] font-bold text-xl text-(--accent-color) mb-4">
            Benefits of Class
          </h3>
          <ul className="space-y-2">
            {defaultBenefits.map((b) => (
              <li key={b} className="flex items-start gap-2 opacity-90">
                <Check className="w-4 h-4 mt-1 shrink-0 text-(--accent-color)" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-['Poppins'] font-bold text-xl text-(--accent-color) mb-4">
            Who Can Join?
          </h3>
          <p className="opacity-90 mb-4">
            This class is suitable for anyone aged {minAge || "7"}+ who wants to
            begin learning. No previous experience required.
          </p>
          <p className="font-semibold mb-2">Suitable for:</p>
          <ul className="space-y-2">
            {whoCanJoinGroups.map((g) => (
              <li key={g} className="flex items-center gap-2 opacity-90">
                <Users className="w-4 h-4 text-(--primary-color)" />
                {g}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-['Poppins'] font-bold text-xl text-(--accent-color) mb-4">
            What to Bring
          </h3>
          <ul className="space-y-2">
            {defaultWhatToBring.map((item, i) => {
              const Icon = i === 1 ? Droplet : Shirt;
              return (
                <li
                  key={item}
                  className="flex items-start gap-2 opacity-90"
                >
                  <Icon className="w-4 h-4 mt-1 shrink-0 text-(--primary-color)" />
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="text-center mb-20">
        <Button variant="accent" size="lg">
          Join Now
        </Button>
      </div>

      {/* Bottom CTA */}
      <div className="bg-(--secondary-color) rounded-lg px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <h2 className="font-['Poppins'] font-bold text-2xl md:text-3xl">
          Ready to Start Your{" "}
          <span className="text-(--accent-color)">
            {title || "Martial Arts"}
          </span>{" "}
          Journey?
        </h2>
        <p className="opacity-90 max-w-md">
          Take the first step toward improving your confidence, fitness,
          discipline, and self-defense skills with our {title} program.
        </p>
        <Button variant="accent" size="lg" className="shrink-0">
          Book This Class Now
        </Button>
      </div>
    </div>
  );
};

export default ClassDetail;
