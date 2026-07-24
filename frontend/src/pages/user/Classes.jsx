import { PersonStanding, Signal, UserCircle, Play } from "lucide-react";
import Button from "../../components/Button";

const dragonDecor = "https://placehold.co/100x100?text=%F0%9F%90%89";

const programs = [
  {
    title: "Competition Training",
    description: "Learn ground control, submission and escape with strategy",
    difficulty: "Advanced",
    coach: "Coach Mark",
    image: "https://placehold.co/500x300?text=Competition+Training",
  },
  {
    title: "Karate",
    description:
      "Learn traditional karate focusing on striking, forms and self-decipline.",
    difficulty: "Beginner to Advanced",
    coach: "Coach Mark",
    image: "https://placehold.co/500x300?text=Karate",
  },
  {
    title: "Muay Thai",
    description:
      "Master powerful striking techniques and knees, elbows control",
    difficulty: "Beginner to Advanced",
    coach: "Coach Ryan",
    image: "https://placehold.co/500x300?text=Muay+Thai",
  },
  {
    title: "Kids Martial Arts",
    description: "Learn ground control, submission and escape with strategy",
    difficulty: "Beginner to Advanced",
    coach: "Coach Mark",
    image: "https://placehold.co/500x300?text=Kids+Martial+Arts",
  },
  {
    title: "Self-Defense",
    description: "Learn ground control, submission and escape with strategy",
    difficulty: "Beginner to Advanced",
    coach: "Coach Mark",
    image: "https://placehold.co/500x300?text=Self-Defense",
  },
  {
    title: "Strength & Conditioning",
    description: "Learn ground control, submission and escape with strategy",
    difficulty: "Beginner to Advanced",
    coach: "Coach Mark",
    image: "https://placehold.co/500x300?text=Strength+%26+Conditioning",
  },
  {
    title: "Jiu-Jitsu",
    description: "Learn ground control, submission and escape with strategy",
    difficulty: "Beginner to Advanced",
    coach: "Coach Mark",
    image: "https://placehold.co/500x300?text=Jiu-Jitsu",
  },
  {
    title: "Judo",
    description:
      "Develop throws, take downs and ground technique with leverage",
    difficulty: "Beginner to Advanced",
    coach: "Sensei Lisa",
    image: "https://placehold.co/500x300?text=Judo",
  },
];

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const timeSlots = [
  {
    time: "09:00-10:00",
    classes: {
      Monday: {
        title: "Karate",
        coach: "Coach David",
        level: "Beginner",
        seats: 10,
      },
      Tuesday: {
        title: "Muay Thai",
        coach: "Coach Ryan",
        level: "All Levels",
        seats: 10,
      },
      Wednesday: {
        title: "BJJ",
        coach: "Micheal",
        level: "Beginner",
        seats: 10,
      },
      Thursday: {
        title: "Karate",
        coach: "Coach David",
        level: "Beginner",
        seats: 10,
      },
      Friday: {
        title: "Karate",
        coach: "Coach David",
        level: "Beginner",
        seats: 10,
      },
      Saturday: {
        title: "Karate",
        coach: "Coach David",
        level: "Beginner",
        seats: 10,
      },
      Sunday: {
        title: "Yoga",
        coach: "Coach Lisa",
        level: "Beginner",
        seats: 10,
      },
    },
  },
  {
    time: "11:00-12:00",
    classes: {
      Monday: {
        title: "Muay Thai",
        coach: "Coach Ryan",
        level: "Intermediate",
        seats: 8,
      },
      Tuesday: {
        title: "Karate",
        coach: "Coach David",
        level: "Beginner",
        seats: 10,
      },
      Wednesday: {
        title: "Judo",
        coach: "Coach David",
        level: "Beginner",
        seats: 10,
      },
      Thursday: {
        title: "Karate",
        coach: "Coach David",
        level: "Beginner",
        seats: 10,
      },
      Friday: {
        title: "Karate",
        coach: "Coach David",
        level: "Beginner",
        seats: 10,
      },
      Saturday: {
        title: "Karate",
        coach: "Coach David",
        level: "Beginner",
        seats: 10,
      },
      Sunday: {
        title: "Open Gym",
        coach: "All Members",
        level: "All Members",
        seats: 10,
      },
    },
  },
  {
    time: "18:00-19:00",
    classes: {
      Monday: { title: "BJJ", coach: "Micheal", level: "All level", seats: 10 },
      Tuesday: {
        title: "Judo",
        coach: "Sensei Lisa",
        level: "Advanced",
        seats: 10,
      },
      Wednesday: {
        title: "Open Gym",
        coach: "All members",
        level: "Beginner",
        seats: 10,
      },
      Thursday: {
        title: "Karate",
        coach: "Coach David",
        level: "Beginner",
        seats: 10,
      },
      Friday: {
        title: "Karate",
        coach: "Coach David",
        level: "Beginner",
        seats: 10,
      },
      Saturday: {
        title: "Karate",
        coach: "Coach David",
        level: "Beginner",
        seats: 10,
      },
      Sunday: {
        title: "Self Denfense",
        coach: "Coach David",
        level: "All Levels",
        seats: 10,
      },
    },
  },
  {
    time: "19:30-20:30",
    classes: {
      Monday: {
        title: "Judo",
        coach: "Sensei Lisa",
        level: "Intermediate",
        seats: 8,
      },
      Tuesday: {
        title: "Self Defense",
        coach: "Coach David",
        level: "All Levels",
        seats: 10,
      },
      Wednesday: {
        title: "Karate",
        coach: "Coach David",
        level: "Beginner",
        seats: 10,
      },
      Thursday: {
        title: "Karate",
        coach: "Coach David",
        level: "Beginner",
        seats: 10,
      },
      Friday: {
        title: "Karate",
        coach: "Coach David",
        level: "Beginner",
        seats: 10,
      },
      Saturday: {
        title: "Karate",
        coach: "Coach David",
        level: "Beginner",
        seats: 10,
      },
      Sunday: {
        title: "Karate",
        coach: "Coach David",
        level: "Beginner",
        seats: 10,
      },
    },
  },
];

const Classes = () => {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {programs.map(({ title, description, difficulty, coach, image }) => (
            <div
              key={title}
              className="border border-amber-400 rounded-lg overflow-hidden pb-6"
            >
              <img
                src={image}
                alt={title}
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
                  {title}
                </h4>
                <p className="opacity-90 text-sm my-4">{description}</p>
                <div className="text-left text-sm space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Signal className="w-4 h-4 text-amber-400" />
                    <span>Difficulty</span>
                    <span className="ml-auto text-amber-400">{difficulty}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCircle className="w-4 h-4 text-amber-400" />
                    <span>Instructor</span>
                    <span className="ml-auto">{coach}</span>
                  </div>
                </div>
                <Button variant="accent" className="w-full">
                  View Class Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Timetable */}
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
            Choose your prefered class and reserve your seat online.
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
            {days.map((day) => (
              <div
                key={day}
                className="bg-(--accent-color) text-white font-bold text-center py-3 rounded uppercase text-sm"
              >
                {day}
              </div>
            ))}

            {/* Time slot rows */}
            {timeSlots.map(({ time, classes }) => (
              <div key={time} className="contents">
                <div className="border border-white/40 rounded flex flex-col items-center justify-center font-semibold text-xs p-2 text-center leading-tight gap-0.5">
                  <span>{time.split("-")[0]}</span>
                  <span className="text-white/60">to</span>
                  <span>{time.split("-")[1]}</span>
                </div>
                {days.map((day) => {
                  const classInfo = classes[day];
                  return (
                    <div
                      key={day}
                      className="border border-white/40 rounded p-3 flex flex-col"
                    >
                      <PersonStanding className="w-5 h-5 mb-1" />
                      <p className="font-semibold text-sm">{classInfo.title}</p>
                      <p className="text-xs opacity-90">{classInfo.coach}</p>
                      <p className="text-xs text-amber-400 mb-1">
                        {classInfo.level}
                      </p>
                      <p className="text-xs opacity-80 mb-2">
                        {classInfo.seats} seats left
                      </p>
                      <Button
                        variant="accent"
                        size="sm"
                        className="w-full mt-auto"
                      >
                        Book Now
                      </Button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Classes;
