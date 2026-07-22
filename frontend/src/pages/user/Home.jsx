import { useEffect, useState } from "react";
import {
  UserCheck,
  Users,
  Building2,
  CalendarClock,
  Calendar,
  Medal,
  Signal,
  UserCircle,
  Gem,
  Network,
  Swords,
  Check,
  X,
  Star,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";
import Button from "../../components/Button";
import { getAllInstructors } from "../../services/instructorService";

const dragonDecor = "https://placehold.co/100x100?text=%F0%9F%90%89";

const whyChooseUs = [
  {
    Icon: UserCheck,
    title: "Certified Instructors",
    description:
      "learn from experiences and highly certified martial arts professionals",
    image: "https://placehold.co/100x100?text=Instructor",
    stats: ["Expert Trainees", "Years Of Experiences", "Proven Result"],
  },
  {
    Icon: Users,
    title: "Friendly Environment",
    description: "a supportive, motivate community that make you grow together",
    image: "https://placehold.co/100x100?text=Environment",
    stats: ["Support Community", "All Ages Level", "Positive and Motivating"],
  },
  {
    Icon: Building2,
    title: "Modern Facilities",
    description: "train in a clean and safe academy",
    image: "https://placehold.co/100x100?text=Facilities",
    stats: ["Premium Equipment", "Clean & Safe Space", "Spacious Areas"],
  },
  {
    Icon: CalendarClock,
    title: "Flexible Schedule",
    description: "multiple timing classes that make fit your busy life style",
    image: "https://placehold.co/100x100?text=Schedule",
    stats: [
      "Multiple Classes Timing",
      "Weekend & Weekdays",
      "Easy Class Rescheduling",
    ],
  },
];

const programs = [
  {
    title: "Jiu-Jitsu",
    description: "learn ground control, submission and escape with strategy",
    difficulty: "Beginner",
    coach: "Coach Mark",
    image: "https://placehold.co/500x300?text=Jiu-Jitsu",
  },
  {
    title: "Judo",
    description:
      "develop throws, take downs and ground technique with leverage",
    difficulty: "Advanced",
    coach: "Sensei Lisa",
    image: "https://placehold.co/500x300?text=Judo",
  },
  {
    title: "Karate",
    description:
      "learn traditional karate focusing on striking, forms and self-decipline.",
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
];

const membershipPlans = [
  {
    name: "Basic Plan",
    tagline: "Perfect for beginner",
    price: 39,
    Icon: Medal,
    featured: false,
    buttonLabel: "Choose Basic",
    features: [
      { text: "Access to 1 Martial Art Program", included: true },
      { text: "2 Classes per Week", included: true },
      { text: "Beginner-Level Training", included: true },
      { text: "Certified Professional Instructor", included: true },
      { text: "Access to Training Facilities", included: true },
      { text: "Locker Room Access", included: true },
      { text: "Unlimited Classes", included: false },
      { text: "Priority Class Booking", included: false },
      { text: "Personalized Coaching", included: false },
      { text: "Free Uniform", included: false },
      { text: "Competition Training", included: false },
      { text: "Nutrition Consultation", included: false },
    ],
  },
  {
    name: "Standard Plan",
    tagline: "Best for consistent growth",
    price: 69,
    Icon: Medal,
    featured: true,
    buttonLabel: "Choose Standard",
    features: [
      {
        text: "Access to All Martial Arts Programs (Karate, Muay Thai, Judo, Brazilian Jiu-Jitsu)",
        included: true,
      },
      { text: "Unlimited Weekly Classes", included: true },
      { text: "Intermediate & Advanced Training", included: true },
      { text: "Certified Professional Instructors", included: true },
      { text: "Priority Class Booking", included: true },
      { text: "Access to Modern Training Facilities", included: true },
      { text: "Locker Room Access", included: true },
      { text: "Personalized Progress Tracking", included: true },
      { text: "Monthly Performance Assessment", included: true },
      { text: "Free Uniform", included: false },
      { text: "Competition Coaching", included: false },
    ],
  },
  {
    name: "Premium Plan",
    tagline: "For Serious Athletes",
    price: 99,
    Icon: Gem,
    featured: false,
    buttonLabel: "Choose Premium",
    features: [
      { text: "Unlimited Access to All Programs", included: true },
      { text: "Unlimited Weekly Classes", included: true },
      { text: "Advanced & Competition Training", included: true },
      { text: "One-on-One Coaching Session (Monthly)", included: true },
      { text: "Personalized Training Plan", included: true },
      { text: "Nutrition Consultation", included: true },
      { text: "Free DoBu Uniform", included: true },
      { text: "Priority Booking", included: true },
      { text: "VIP Member Support", included: true },
      { text: "Monthly Fitness Assessment", included: true },
      { text: "Competition Preparation", included: true },
      { text: "Guest Pass (2 per Month)", included: true },
    ],
  },
];

const membershipHighlights = [
  {
    title: "No Long-Term Contract",
    description: "Cancel or upgrade your membership anytime",
  },
  {
    title: "Modern Training Facilities",
    description: "Clean, safe, and fully equipped training environment",
  },
  {
    title: "Certified Instructors",
    description: "Train under experienced martial arts professionals.",
  },
  {
    title: "Flexible Class Schedule",
    description: "Morning, afternoon, and evening sessions available.",
  },
];

const blogPosts = [
  {
    title: "Top 5 Benefits of Martial Arts Training",
    excerpt:
      "Discover how martial arts improves confidence, discipline and overall well-being.",
    image: "https://placehold.co/500x350?text=Blog+1",
  },
  {
    title: "Beginner's Guide to Your First Class",
    excerpt:
      "Everything new students should know before attending their first BJJ class.",
    image: "https://placehold.co/500x350?text=Blog+2",
  },
];

const testimonials = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  name: "Emily Johnson",
  role: "Karate Student",
  quote:
    "The instructors are amazing and assisted me to gain my goals in quick.",
  avatar: `https://placehold.co/80x80?text=${i + 1}`,
}));

const specialOffers = [
  {
    title: "Free Trial Class",
    description: "Experience professional martial arts training.",
    image: "https://placehold.co/150x150?text=Trial",
    button: "Enroll Free Trial",
    buttonVariant: "accent",
    borderColor: "border-(--accent-color)",
  },
  {
    title: "20% Off New Member Discount",
    highlight: "20% Off",
    description: "Valid until 31 August 2026",
    image: "https://placehold.co/150x150?text=Discount",
    button: "Join Today",
    buttonVariant: "outline",
    borderColor: "border-amber-400",
  },
  {
    title: "Summer Martial Arts Camp",
    description: "For kids & Teenagers.\nStarts 15 July 2026",
    image: "https://placehold.co/150x150?text=Camp",
    button: "Enroll Now",
    buttonVariant: "accent",
    borderColor: "border-(--accent-color)",
  },
];

const SectionHeading = ({
  eyebrow,
  title,
  highlight,
  highlightFirst,
  subtitle,
  dragons,
}) => (
  <div className="relative text-center mb-12">
    {dragons && (
      <>
        <img
          src={dragonDecor}
          alt=""
          aria-hidden="true"
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-24"
        />
        <img
          src={dragonDecor}
          alt=""
          aria-hidden="true"
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-24"
        />
      </>
    )}
    {eyebrow && (
      <div className="flex items-center justify-center gap-4 mb-3">
        <hr className="w-16 border-t border-white/40" />
        <p className="text-lg">{eyebrow}</p>
        <hr className="w-16 border-t border-white/40" />
      </div>
    )}
    <h2 className="font-['Poppins'] font-bold text-4xl mb-3">
      {highlightFirst ? (
        <>
          <span className="text-amber-400">{highlight}</span> {title}
        </>
      ) : (
        <>
          {title} <span className="text-amber-400">{highlight}</span>
        </>
      )}
    </h2>
    {subtitle && <p className="opacity-90 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const Home = () => {
  const [instructors, setInstructors] = useState([]);
  const [loadingInstructors, setLoadingInstructors] = useState(true);

  useEffect(() => {
    const loadInstructors = async () => {
      try {
        const data = await getAllInstructors();
        setInstructors(data);
      } catch (error) {
        console.error("Failed to load instructors", error);
        setInstructors([]);
      } finally {
        setLoadingInstructors(false);
      }
    };

    loadInstructors();
  }, []);

  return (
    <div className="w-6xl mx-auto px-4">
      {/* Hero */}
      <section className="grid md:grid-cols-2 gap-10 items-center py-16">
        <div>
          <h1 className="font-['Poppins'] font-bold text-6xl leading-tight mb-6 text-amber-400">
            Discipline
            <br />
            in motion.
          </h1>
          <p className="opacity-90 leading-relaxed mb-8 max-w-md">
            DoBu trains focus, strength, and self-defense for every age, from a
            white belt's first bow to black belt competition form.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="lg">
              Enroll A Class
            </Button>
            <Button variant="accent" size="lg">
              Watch a Class <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
        <img
          src="https://placehold.co/600x600?text=Hero+Collage"
          alt="Martial arts training"
          className="rounded-lg object-cover w-full"
        />
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <SectionHeading
          title="Why Choose"
          highlight="DoBu Martial Arts"
          dragons
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-16">
          {whyChooseUs.map(({ Icon, title, description, image, stats }) => (
            <div key={title} className="border border-amber-400 rounded-lg p-6">
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-amber-400/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <h4 className="text-lg font-bold uppercase">{title}</h4>
                  </div>
                  <p className="opacity-90 text-sm">{description}</p>
                </div>
                <img
                  src={image}
                  alt=""
                  className="w-28 h-40 rounded-lg object-cover shrink-0 self-start"
                />
              </div>
              <hr className="border-white/20 mb-4" />
              <div className="flex justify-between gap-2 text-xs">
                {stats.map((stat, i) => {
                  const StatIcon =
                    i === 0 ? UserCheck : i === 1 ? Calendar : Medal;
                  return (
                    <div key={stat} className="flex items-start gap-1">
                      <StatIcon className="w-4 h-4 text-(--accent-color) shrink-0 mt-0.5" />
                      <span className="opacity-80">{stat}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Button variant="accent" size="lg">
            Enroll A Class <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16">
        <SectionHeading
          eyebrow="Our Programs"
          title="Program"
          highlight="Martial Arts"
          highlightFirst={false}
          subtitle="Explore our most popular martial arts designed for all ages and skill levels"
        />
        {/* Replace heading above manually if wording needs exact "Popular Martial Arts Program" order */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-16">
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
              {/* TODO: swap in real circular dragon badge asset, overlapping image/card boundary */}
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
                  Enroll Now
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Button variant="accent" size="lg">
            View More Programs <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="py-16">
        <SectionHeading
          title="Membership"
          highlight="Plans"
          subtitle="Flexible plan. Expert training. Real Results."
          dragons
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {membershipPlans.map(
            ({
              name,
              tagline,
              price,
              Icon,
              featured,
              buttonLabel,
              features,
            }) => (
              <div
                key={name}
                className={`relative rounded-lg p-8 border ${
                  featured ? "border-amber-400" : "border-white/30"
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-(--accent-color) text-white text-xs font-semibold px-4 py-1 rounded">
                    ★ MOST POPULAR ★
                  </span>
                )}
                <div className="flex items-center gap-3 mb-2 mt-2">
                  <Icon
                    className={`w-6 h-6 ${featured ? "text-amber-400" : "text-(--accent-color)"}`}
                  />
                  <div>
                    <h4 className="font-['Poppins'] font-bold uppercase">
                      {name}
                    </h4>
                    <p className="opacity-70 text-xs">{tagline}</p>
                  </div>
                </div>
                <p className="text-4xl font-bold text-center my-6">
                  ${price}
                  <span className="text-base font-normal opacity-70">
                    /month
                  </span>
                </p>
                <hr className="border-(--accent-color) mb-6" />
                <ul className="space-y-2 mb-8 text-sm">
                  {features.map((f) => (
                    <li key={f.text} className="flex items-start gap-2">
                      {f.included ? (
                        <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      )}
                      <span
                        className={f.included ? "opacity-90" : "opacity-50"}
                      >
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={featured ? "primary" : "accent"}
                  className="w-full"
                >
                  {buttonLabel.toUpperCase()}
                </Button>
              </div>
            ),
          )}
        </div>

        <hr className="border-amber-400 my-12" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
          {membershipHighlights.map(({ title, description }) => (
            <div key={title}>
              <h5 className="font-semibold mb-1">{title}</h5>
              <p className="opacity-80 text-sm">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Instructors */}
      <section className="py-16">
        <SectionHeading
          title="Meet Our Expert"
          highlight="Instructors"
          subtitle="learn from certified martial arts professionals dedicated to helping you to achieve your goals."
          dragons
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {loadingInstructors ? (
            <p className="col-span-2 text-center opacity-80">
              Loading instructors...
            </p>
          ) : instructors.length === 0 ? (
            <p className="col-span-2 text-center opacity-80">
              Instructor profiles will appear here soon.
            </p>
          ) : (
            instructors.map((instructor) => {
              const credentials = [
                instructor.beltLevel || "Certified Instructor",
                `${instructor.experienceYears ?? 0} Years Experience`,
                ...(instructor.specialties
                  ?.slice(0, 1)
                  .map((specialty) => specialty.name) || []),
              ];

              return (
                <div
                  key={instructor.id}
                  className="border border-(--accent-color) rounded-lg px-4 py-8 text-center"
                >
                  <img
                    src={
                      instructor.imageUrl ||
                      "https://placehold.co/300x300?text=Instructor"
                    }
                    alt={instructor.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-2 border-(--accent-color)"
                  />
                  <h4 className="font-['Poppins'] font-bold text-lg mb-3">
                    {instructor.name}
                  </h4>
                  <ul className="space-y-2 mb-6 text-sm inline-block text-left">
                    {credentials.map((c, i) => {
                      const Icon = i === 0 ? Medal : i === 1 ? Network : Swords;
                      return (
                        <li
                          key={`${instructor.id}-${c}`}
                          className="flex items-center gap-2 opacity-90"
                        >
                          <Icon className="w-4 h-4 text-amber-400" />
                          {c}
                        </li>
                      );
                    })}
                  </ul>
                  <div>
                    <Link
                      to={`/instructors/${instructor.id}`}
                      className="inline-flex items-center justify-center rounded-lg bg-(--accent-color) px-3 py-1.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-red-700"
                    >
                      View Profile <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Blog */}
      <section className="py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-['Poppins'] font-bold text-4xl uppercase">
            Latest <span className="text-amber-400">Blog Posts</span>
          </h2>
          <Button variant="outline">View All</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {blogPosts.map(({ title, excerpt, image }) => (
            <div
              key={title}
              className="rounded-lg overflow-hidden border border-(--accent-color)"
            >
              <img
                src={image}
                alt={title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h4 className="font-['Poppins'] font-bold text-lg mb-2">
                  {title}
                </h4>
                <p className="opacity-90 text-sm mb-4">{excerpt}</p>
                <a href="#" className="text-amber-400 text-sm font-semibold">
                  Read More &gt;&gt;&gt;
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 text-center">
        <h2 className="font-['Poppins'] font-bold text-4xl uppercase mb-10">
          What Our <span className="text-amber-400">Student</span> Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {testimonials.map(({ id, name, role, quote, avatar }) => (
            <div
              key={id}
              className="flex flex-col items-center text-center px-4"
            >
              <img
                src={avatar}
                alt={name}
                className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 mb-3"
              />
              <div className="flex gap-0.5 text-amber-400 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="opacity-90 text-sm italic mb-2">"{quote}"</p>
              <p className="text-amber-400 font-semibold text-sm">{name}</p>
              <p className="opacity-70 text-xs">{role}</p>
            </div>
          ))}
        </div>
        <Button variant="outline" className="mt-10">
          View All Reviews
        </Button>
      </section>

      {/* Special Offers */}
      <section className="py-16">
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="text-4xl">🎁</span>
          <h2 className="font-['Poppins'] font-bold text-4xl uppercase">
            Special <span className="text-amber-400">Offers</span>
          </h2>
        </div>
        <div className="max-w-2xl mx-auto space-y-6">
          {specialOffers.map(
            ({
              title,
              description,
              image,
              button,
              buttonVariant,
              borderColor,
            }) => (
              <div
                key={title}
                className={`flex items-center justify-between gap-6 border ${borderColor} rounded-lg p-6`}
              >
                <div>
                  <h4 className="font-['Poppins'] font-bold text-lg uppercase mb-2 whitespace-pre-line">
                    {title}
                  </h4>
                  <p className="opacity-90 text-sm mb-4 whitespace-pre-line">
                    {description}
                  </p>
                  <Button variant={buttonVariant} size="sm">
                    {button.toUpperCase()}
                  </Button>
                </div>
                <img
                  src={image}
                  alt={title}
                  className="w-28 h-28 rounded-full object-cover shrink-0"
                />
              </div>
            ),
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
