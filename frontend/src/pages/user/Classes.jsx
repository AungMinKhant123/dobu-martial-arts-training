import { useEffect, useState } from "react";
import { Link } from "react-router";
import { PersonStanding, Signal, UserCircle, Play } from "lucide-react";
import Button from "../../components/Button";
import { getAllClasses } from "../../services/classService";

const dragonDecor = "https://placehold.co/100x100?text=%F0%9F%90%89";

const DAY_ORDER = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const DAY_LABELS = {
  MONDAY: "Monday",
  TUESDAY: "Tuesday",
  WEDNESDAY: "Wednesday",
  THURSDAY: "Thursday",
  FRIDAY: "Friday",
  SATURDAY: "Saturday",
  SUNDAY: "Sunday",
};

const formatLevel = (level) => {
  if (!level) return "";
  const map = {
    BEGINNER: "Beginner",
    INTERMEDIATE: "Intermediate",
    ADVANCED: "Advanced",
  };
  return map[level] || level;
};

const formatTime = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
};

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllClasses();
        setClasses(data);
      } catch (err) {
        setError(err.message || "Failed to load classes");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  /* ---- Build timetable grid from all classes ---- */
  const allTimetables = classes.flatMap((cls) =>
    (cls.timetables || []).map((tt) => ({
      ...tt,
      classTitle: cls.title,
      coach: cls.instructor?.name || "",
      level: cls.level,
      seats: cls.capacity,
      classId: cls.id,
    })),
  );

  // Group by time slot key "HH:MM-HH:MM"
  const groupedByTime = {};
  for (const entry of allTimetables) {
    const timeKey = `${formatTime(entry.startTime)}-${formatTime(entry.endTime)}`;
    if (!groupedByTime[timeKey]) groupedByTime[timeKey] = {};
    groupedByTime[timeKey][entry.dayOfWeek] = entry;
  }

  // Sort time slots by their start time
  const sortedTimeKeys = Object.keys(groupedByTime).sort((a, b) => {
    const aStart = a.split("-")[0];
    const bStart = b.split("-")[0];
    return aStart.localeCompare(bStart);
  });

  const timeSlotRows = sortedTimeKeys.map((timeKey) => ({
    time: timeKey,
    classes: groupedByTime[timeKey],
  }));

  /* ---- Loading / Error / Empty states ---- */
  if (loading) {
    return (
      <div className="w-6xl mx-auto px-4 py-20 text-center">
        <p className="opacity-80 text-lg">Loading classes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-red-400 text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 border border-white/40 rounded hover:border-amber-400 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-6xl mx-auto px-4">
      {/* Hero */}
      <section className="grid md:grid-cols-2 gap-10 items-center py-16">
        <div>
          <p className="text-(--accent-color) font-bold text-lg tracking-wide uppercase mb-4">
            Train. Learn. Grow
          </p>
          <h1 className="font-['Poppins'] font-bold text-7xl uppercase mb-6">
            Our Classes
          </h1>
          <p className="opacity-90 text-lg leading-relaxed mb-8 max-w-lg">
            Explore our wide range of martial arts classes designed for all ages
            and skill levels.
          </p>
          <button className="flex items-center gap-3 border border-white/60 rounded-lg px-6 py-4 text-base font-semibold hover:border-amber-400 transition-colors">
            <Play className="w-5 h-5" /> Watch Video
          </button>
        </div>
        <img
          src="https://placehold.co/500x600?text=Instructor"
          alt="Martial arts instructor"
          className="rounded-lg object-cover w-full max-h-[450px]"
        />
      </section>

      {/* Programs */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="font-['Poppins'] font-bold text-4xl mb-4">
            <span className="text-amber-400">Martial Arts</span> Programs
          </h2>
          <div className="flex items-center justify-center gap-4">
            <hr className="w-24 border-t border-amber-400" />
            <div className="w-16 h-16 rounded-full bg-(--accent-color) flex items-center justify-center shrink-0">
              <PersonStanding className="w-8 h-8 text-white" />
            </div>
            <hr className="w-24 border-t border-amber-400" />
          </div>
        </div>

        {classes.length === 0 ? (
          <div className="text-center py-12 opacity-80">
            <p>No programs available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="border border-amber-400 rounded-lg overflow-hidden pb-6"
              >
                <img
                  src={
                    cls.imageUrl ||
                    `https://placehold.co/500x300?text=${encodeURIComponent(cls.title)}`
                  }
                  alt={cls.title}
                  className="w-full h-56 object-cover"
                />
                <div className="flex justify-center -mt-8 mb-2">
                  <img
                    src="https://placehold.co/60x60/000000/FBBF24?text=D"
                    alt=""
                    className="w-16 h-16 rounded-full border-4 border-(--bg-color) object-cover"
                  />
                </div>
                <div className="text-center px-6">
                  <h4 className="font-['Poppins'] font-bold text-xl uppercase mb-1 inline-block border-b-2 border-amber-400 pb-1">
                    {cls.title}
                  </h4>
                  <p className="opacity-90 text-sm my-4">{cls.description}</p>
                  <div className="text-left text-sm space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <Signal className="w-4 h-4 text-amber-400" />
                      <span>Difficulty</span>
                      <span className="ml-auto text-amber-400">
                        {formatLevel(cls.level)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserCircle className="w-4 h-4 text-amber-400" />
                      <span>Instructor</span>
                      <span className="ml-auto">
                        {cls.instructor?.name || "TBA"}
                      </span>
                    </div>
                  </div>
                  <Link to={`/classes/${cls.id}`}>
                    <Button variant="accent" className="w-full">
                      View Class Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Weekly Timetable */}
      {timeSlotRows.length > 0 && (
        <section className="py-16 relative">
          <img
            src={dragonDecor}
            alt=""
            aria-hidden="true"
            className="hidden md:block absolute left-0 top-8 w-20"
          />
          <img
            src={dragonDecor}
            alt=""
            aria-hidden="true"
            className="hidden md:block absolute right-0 top-8 w-20"
          />

          <div className="text-center mb-12">
            <h2 className="font-['Poppins'] font-bold text-4xl mb-3">
              Weekly <span className="text-amber-400">Timetable Schedule</span>
            </h2>
            <p className="opacity-90">
              Choose your preferred class and reserve your seat online.
            </p>
          </div>

          <div className="overflow-x-auto pb-4">
            <div
              className="grid gap-2 min-w-[900px]"
              style={{ gridTemplateColumns: "90px repeat(7, 1fr)" }}
            >
              {/* Header row */}
              <div className="bg-(--accent-color) text-white font-bold text-center py-3 rounded text-sm">
                TIME
              </div>
              {DAY_ORDER.map((day) => (
                <div
                  key={day}
                  className="bg-(--accent-color) text-white font-bold text-center py-3 rounded uppercase text-sm"
                >
                  {DAY_LABELS[day]}
                </div>
              ))}

              {/* Time slot rows */}
              {timeSlotRows.map(({ time, classes: dayClasses }) => (
                <div key={time} className="contents">
                  <div className="border border-white/40 rounded flex flex-col items-center justify-center font-semibold text-xs p-2 text-center leading-tight gap-0.5">
                    <span>{time.split("-")[0]}</span>
                    <span className="text-white/60">to</span>
                    <span>{time.split("-")[1]}</span>
                  </div>
                  {DAY_ORDER.map((day) => {
                    const classInfo = dayClasses[day];
                    return (
                      <div
                        key={day}
                        className="border border-white/40 rounded p-3 flex flex-col"
                      >
                        {classInfo ? (
                          <>
                            <PersonStanding className="w-5 h-5 mb-1" />
                            <p className="font-semibold text-sm">
                              {classInfo.classTitle}
                            </p>
                            <p className="text-xs opacity-90">
                              {classInfo.coach}
                            </p>
                            <p className="text-xs text-amber-400 mb-1">
                              {formatLevel(classInfo.level)}
                            </p>
                            <p className="text-xs opacity-80 mb-2">
                              {classInfo.seats} seats
                            </p>
                            <Link
                              to={`/classes/${classInfo.classId}`}
                              className="mt-auto"
                            >
                              <Button
                                variant="accent"
                                size="sm"
                                className="w-full"
                              >
                                Details
                              </Button>
                            </Link>
                          </>
                        ) : (
                          <p className="text-xs opacity-40 self-center">
                            —
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Classes;
