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
} from "lucide-react";
import Button from "../../components/Button";

const ClassDetail = () => {
  const title = "Beginner Karate";
  const tagline =
    "Start your martial arts journey with strong fundamentals. Build discipline, confidence, physical fitness, and practical self-defense skills through structured beginner-friendly training.";
  const image = "https://placehold.co/600x500?text=Beginner+Karate";
  const level = "Beginner";
  const ageGroup = "7+ Years";
  const duration = "1 hour/day";
  const beltRequirement = "No Experience Required";

  const overview =
    "Beginner Karate is designed for students who are new to martial arts and want to build a strong foundation in traditional Karate. This course introduces fundamental techniques, including stances, punches, kicks, blocks, and basic movement in a safe and supportive learning environment. Students will improve physical fitness, coordination, discipline, confidence, and self-defense skills while learning the core values of respect, perseverance, and self-control. The program is suitable for all fitness levels and requires no previous martial arts experience.";

  const whatYouWillLearn = [
    "Basic Stances and Footwork",
    "Straight Punches and Defensive Blocks",
    "Front Kick and Roundhouse Kick Techniques",
    "Kata (Basic Forms)",
    "Self-Defense Fundamentals",
    "Balance and Coordination",
    "Respect, Discipline, and Martial Arts Etiquette",
    "Safe Sparring Preparation",
  ];

  const instructorName = "Sensei David Lee";
  const instructorImage = "https://placehold.co/400x500?text=Sensei+David+Lee";
  const instructorCredentials = [
    "6th Dan Black Belt",
    "15+ Years of Experience",
    "Certified Martial Arts Instructor",
  ];
  const instructorAbout =
    "Sensei David Lee specializes in Traditional Karate, Kata, Kumite, and practical self-defense. He has trained students of all ages for over 15 years and is committed to helping every student achieve their personal goals through professional coaching and structured training.";

  const benefits = [
    "Improve Physical Fitness and Flexibility",
    "Build Self-Confidence",
    "Learn Practical Self-Defense Skills",
    "Enhance Focus and Concentration",
    "Reduce Stress",
    "Improve Balance and Coordination",
    "Develop Discipline and Respect",
    "Make New Friends in a Positive Community",
  ];

  const whoCanJoinDescription =
    "This class is perfect for anyone aged 7 years and above who wants to begin learning Karate. No previous martial arts experience is required.";
  const whoCanJoinGroups = [
    "Children",
    "Teenagers",
    "Adults",
    "All Fitness Levels",
  ];

  const whatToBring = [
    "Comfortable Sports Clothing (A Karate uniform (Gi) will be provided during your trial class.)",
    "Water Bottle",
    "Small Towel",
    "Positive Attitude and Willingness to Learn",
    "Indoor Training Footwear (optional for arrival; training is typically barefoot)",
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header / Hero */}
      <div className="grid md:grid-cols-2 gap-10 items-start mb-12">
        <div>
          <p className="text-(--accent-color) font-semibold text-sm tracking-wide uppercase mb-2">
            Class Details
          </p>
          <h1 className="font-['Poppins'] font-bold text-4xl mb-4">{title}</h1>
          <div className="w-16 h-1 bg-(--accent-color) mb-6" />
          <p className="opacity-90 leading-relaxed">{tagline}</p>
        </div>
        <img
          src={image}
          alt={title}
          className="rounded-lg object-cover w-full max-h-[420px]"
        />
      </div>

      {/* Info Row */}
      <div className="flex flex-wrap justify-center gap-x-16 gap-y-6 mb-16">
        <div>
          <div className="flex items-center gap-2 font-semibold mb-1">
            <Signal className="w-5 h-5" />
            Level
          </div>
          <p className="opacity-90">{level}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 font-semibold mb-1">
            <Users className="w-5 h-5" />
            Age Group
          </div>
          <p className="opacity-90">{ageGroup}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 font-semibold mb-1">
            <Clock className="w-5 h-5" />
            Duration
          </div>
          <p className="opacity-90">{duration}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 font-semibold mb-1">
            <Award className="w-5 h-5" />
            Belt Requirement
          </div>
          <p className="opacity-90">{beltRequirement}</p>
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
          <p className="opacity-90 leading-relaxed">{overview}</p>
        </div>
        <div>
          <h2 className="font-['Poppins'] font-bold text-2xl text-(--accent-color) mb-4">
            What You Will Learn
          </h2>
          <ul className="space-y-2">
            {whatYouWillLearn.map((item) => (
              <li key={item} className="flex items-start gap-2 opacity-90">
                <Check className="w-4 h-4 mt-1 shrink-0 text-(--accent-color)" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Instructor */}
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
            {instructorCredentials.map((c, i) => {
              const Icon = i === 0 ? Award : i === 1 ? Trophy : BadgeCheck;
              return (
                <li key={c} className="flex items-center gap-2 opacity-90">
                  <Icon className="w-4 h-4 text-(--primary-color)" />
                  {c}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-(--accent-color) font-semibold uppercase text-sm mb-3">
          About
        </p>
        <p className="opacity-90 leading-relaxed">{instructorAbout}</p>
      </div>

      <div className="text-center mb-16">
        <Button variant="accent" size="lg">
          View Instructor Profile
        </Button>
      </div>

      {/* Benefits / Who Can Join / What to Bring */}
      <div className="grid md:grid-cols-3 gap-10 mb-12">
        <div>
          <h3 className="font-['Poppins'] font-bold text-xl text-(--accent-color) mb-4">
            Benefits of Class
          </h3>
          <ul className="space-y-2">
            {benefits.map((b) => (
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
          <p className="opacity-90 mb-4">{whoCanJoinDescription}</p>
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
            {whatToBring.map((item, i) => {
              const Icon = i === 1 ? Droplet : Shirt;
              return (
                <li key={item} className="flex items-start gap-2 opacity-90">
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
          <span className="text-(--accent-color)">Karate</span> Journey?
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
