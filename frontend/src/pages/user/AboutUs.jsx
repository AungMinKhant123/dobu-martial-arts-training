import {
  Shield,
  Heart,
  Users,
  Award,
  Dumbbell,
  ShowerHead,
} from "lucide-react";
import Button from "../../components/Button";

const philosophyPoints = [
  { label: "Discipline", text: "Building mental fortitude and self-control" },
  { label: "Strength", text: "Developing physical and inner power" },
  {
    label: "Community",
    text: "Fostering supportive relationships and mutual respect",
  },
];

const specialityPoints = [
  "Multi-disciplinary approach to martial arts",
  "Personalized instruction for every skill level",
  "Family-friendly environment",
  "Experienced Instructors",
];

const values = [
  {
    icon: Shield,
    title: "Respect",
    text: "We honor the traditions of martial arts while respecting every individual's journey and background.",
  },
  {
    icon: Heart,
    title: "Integrity",
    text: "We maintain the highest standards of honesty, authenticity, and ethical conduct in all our interactions.",
  },
  {
    icon: Users,
    title: "Community",
    text: "We build strong bonds among our members, creating a supportive environment for growth and learning.",
  },
  {
    icon: Award,
    title: "Excellence",
    text: "We strive for continuous improvement in our teaching, facilities, and personal development.",
  },
];

const facilities = [
  {
    icon: Shield,
    title: "Matted Training",
    text: "Our spacious 1,500sq ft matted area features professional-grade martial arts mats that provide optimal safety and comfort for all training disciplines.",
    features: [
      "1,500 square feet of training space.",
      "Professional-grade tatami mats.",
      "Wall-to-wall padding for safety.",
    ],
    image: "https://placehold.co/600x400?text=Matted+Training",
    imageSide: "left",
  },
  {
    icon: Dumbbell,
    title: "Full-Equipped Gym",
    text: "Complete fitness equipment for strength training, cardio, and conditioning to complement your martial arts training.",
    features: [
      "Free weights and dumbbells",
      "Cardio machines (treadmills, bikes, rowing).",
      "Functional training equipment.",
      "Pull-up and suspension training stations.",
    ],
    image: "https://placehold.co/600x400?text=Gym",
    imageSide: "right",
  },
  {
    icon: ShowerHead,
    title: "Changing & Shower",
    text: "Clean, spacious changing rooms with modern amenities for your convenience before and after training.",
    features: [
      "Individual shower cubicles.",
      "Secure lockers (day and long-term).",
      "Hairdryers and basic toiletries.",
      "Bench seating areas.",
    ],
    image: "https://placehold.co/600x400?text=Changing+Room",
    imageSide: "left",
  },
];

const AboutUs = () => {
  return (
    <>
      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center px-6 pt-10 pb-16">
        <h1 className="font-['Poppins'] font-bold text-4xl md:text-6xl leading-tight uppercase mb-8">
          Forge Your Strength, Find Your Pack
        </h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-10">
          This is not a soft place. This is where iron shapes men and women.
          Where the weight tests you and the community lifts you up.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="accent" size="lg">
            Enroll a Class
          </Button>
          <Button variant="outline" size="lg">
            View classes
          </Button>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-4xl mx-auto text-center px-6 py-16">
        {/* TODO: swap in the real dragon logo asset once ready */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <img
            src="https://placehold.co/100?text=%F0%9F%90%89"
            alt=""
            aria-hidden="true"
            className="hidden md:block w-20 h-20"
          />
          <h2 className="font-['Poppins'] font-bold text-4xl text-(--primary-color)">
            Our Story
          </h2>
          <img
            src="https://placehold.co/100?text=%F0%9F%90%89"
            alt=""
            aria-hidden="true"
            className="hidden md:block w-20 h-20"
          />
        </div>
        <p className="max-w-3xl mx-auto opacity-90 leading-relaxed">
          DoBu Martial Arts was founded with a simple powerful vision to create
          a space where individuals of all ages and backgrounds can discover the
          transformative power of martial arts. Our name "DoBu" represents the
          warrior's path — a journey of continuous growth, discipline, and
          self-discovery.
        </p>
      </section>

      {/* Philosophy / Speciality */}
      <section className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-8">
        <div className="border border-(--primary-color) rounded-lg p-8">
          <h3 className="font-['Poppins'] font-semibold text-2xl mb-4">
            Our Philosophy
          </h3>
          <p className="opacity-90 mb-4 leading-relaxed">
            At DoBu Martial Arts, we believe that martial arts training is more
            than just physical exercise. Our philosophy is built on three core
            pillars:
          </p>
          <ul className="list-disc list-inside space-y-2 opacity-90">
            {philosophyPoints.map((point) => (
              <li key={point.label}>
                <span className="font-semibold">{point.label}:</span>{" "}
                {point.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-(--primary-color) rounded-lg p-8">
          <h3 className="font-['Poppins'] font-semibold text-2xl mb-4">
            Our Speciality
          </h3>
          <p className="opacity-90 mb-4 leading-relaxed">
            Our gym stands apart through our commitment to authentic martial
            arts instruction combined with modern training methodologies. We
            offer:
          </p>
          <ul className="list-disc list-inside space-y-2 opacity-90">
            {specialityPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Our Values */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="font-['Poppins'] font-bold text-4xl text-(--primary-color) mb-10">
          Our Values
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {values.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="bg-gray-100 text-gray-900 rounded-lg p-6"
            >
              <Icon className="mx-auto mb-4 w-7 h-7" />
              <h3 className="font-['Poppins'] font-semibold mb-2">{title}</h3>
              <p className="text-sm opacity-80">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Environment */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="font-['Poppins'] font-bold text-4xl text-(--primary-color) mb-4">
            Our Environment
          </h2>
          <p className="opacity-90 max-w-2xl mx-auto">
            Every detail of our facility has been carefully designed to provide
            the optimal environment for martial arts training, fitness and
            recovery.
          </p>
        </div>

        <div className="space-y-8">
          {facilities.map(
            ({ icon: Icon, title, text, features, image, imageSide }) => (
              <div
                key={title}
                className="grid md:grid-cols-2 gap-6 items-stretch"
              >
                {imageSide === "left" && (
                  <img
                    src={image}
                    alt={title}
                    className="rounded-lg object-cover w-full h-full max-h-80"
                  />
                )}

                <div className="bg-gray-100 text-gray-900 border border-(--primary-color) rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-5 h-5" />
                    <h3 className="font-['Poppins'] font-semibold text-lg">
                      {title}
                    </h3>
                  </div>
                  <p className="text-sm opacity-90 mb-4">{text}</p>
                  <p className="text-sm font-semibold mb-2">Features:</p>
                  <ul className="list-disc list-inside text-sm space-y-1 opacity-90">
                    {features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {imageSide === "right" && (
                  <img
                    src={image}
                    alt={title}
                    className="rounded-lg object-cover w-full h-full max-h-80 md:order-first-none"
                  />
                )}
              </div>
            ),
          )}
        </div>
      </section>
    </>
  );
};

export default AboutUs;
