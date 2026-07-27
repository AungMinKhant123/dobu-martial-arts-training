import { useState } from "react";
import { User, Mail, Phone, Calendar, Home } from "lucide-react";
import Button from "../../components/Button";

const membershipOptions = [
  "Basic Membership",
  "Standard Membership",
  "Premium Membership",
];

const classOptions = [
  "Karate",
  "Muay Thai",
  "Judo",
  "Competition Training",
  "Kids Martial Arts",
  "Self Defense",
  "Strength & Conditioning",
  "Jiu-Jitsu",
];

const Enrollment = () => {
  const [membership, setMembership] = useState("");
  const [classSelection, setClassSelection] = useState("");
  const [agreed, setAgreed] = useState(false);

  const isBasic = membership === "Basic Membership";
  const hasFullAccess =
    membership === "Standard Membership" || membership === "Premium Membership";

  const handleMembershipChange = (e) => {
    const value = e.target.value;
    setMembership(value);
    if (value !== "Basic Membership") {
      setClassSelection("");
    }
  };

  return (
    <div className="w-6xl mx-auto px-4 py-16">
      <p className="text-(--accent-color) font-bold text-lg tracking-wide uppercase mb-3">
        Enrollment Form
      </p>
      <h1 className="font-['Poppins'] font-bold text-5xl mb-2 inline-block border-b-4 border-amber-400 pb-4">
        Join DoBu Martial Arts
      </h1>
      <p className="opacity-90 leading-relaxed max-w-2xl mb-12">
        Start your martial arts journey today by completing the enrollment form
        below. Choose the membership plan that best suits your goals and begin
        training with our certified instructors.
      </p>

      <h2 className="font-['Poppins'] font-bold text-3xl text-center mb-10">
        Personal Information
      </h2>

      <form className="grid md:grid-cols-2 gap-x-10 gap-y-6 max-w-4xl mx-auto px-8">
        {/* First Name */}
        <div>
          <label className="block font-semibold mb-2">
            First Name<span className="text-(--accent-color)">*</span>
          </label>
          <div className="flex items-center gap-3 border border-white/40 rounded-full px-5 py-3">
            <User className="w-4 h-4 opacity-70 shrink-0" />
            <input
              type="text"
              placeholder="Enter your first name"
              className="bg-transparent w-full focus:outline-none placeholder-white/50"
            />
          </div>
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-semibold mb-2">
            Last Name<span className="text-(--accent-color)">*</span>
          </label>
          <div className="flex items-center gap-3 border border-white/40 rounded-full px-5 py-3">
            <User className="w-4 h-4 opacity-70 shrink-0" />
            <input
              type="text"
              placeholder="Enter your Last name"
              className="bg-transparent w-full focus:outline-none placeholder-white/50"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-2">
            Email Address<span className="text-(--accent-color)">*</span>
          </label>
          <div className="flex items-center gap-3 border border-white/40 rounded-full px-5 py-3">
            <Mail className="w-4 h-4 opacity-70 shrink-0" />
            <input
              type="email"
              placeholder="Enter your Email Address"
              className="bg-transparent w-full focus:outline-none placeholder-white/50"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold mb-2">
            Phone Number<span className="text-(--accent-color)">*</span>
          </label>
          <div className="flex items-center gap-3 border border-white/40 rounded-full px-5 py-3">
            <Phone className="w-4 h-4 opacity-70 shrink-0" />
            <input
              type="tel"
              placeholder="Enter your Phone Number"
              className="bg-transparent w-full focus:outline-none placeholder-white/50"
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block font-semibold mb-2">
            Date of Birth<span className="text-(--accent-color)">*</span>
          </label>
          <div className="flex items-center gap-3 border border-white/40 rounded-full px-5 py-3">
            <Calendar className="w-4 h-4 opacity-70 shrink-0" />
            <input
              type="text"
              placeholder="Enter you Date of Birth DD/MM/YY"
              className="bg-transparent w-full focus:outline-none placeholder-white/50"
            />
          </div>
        </div>

        {/* Home Address */}
        <div>
          <label className="block font-semibold mb-2">
            Home Address<span className="text-(--accent-color)">*</span>
          </label>
          <div className="flex items-center gap-3 border border-white/40 rounded-full px-5 py-3">
            <Home className="w-4 h-4 opacity-70 shrink-0" />
            <input
              type="text"
              placeholder="Enter your full residential address"
              className="bg-transparent w-full focus:outline-none placeholder-white/50"
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block font-semibold mb-3">
            Gender<span className="text-(--accent-color)">*</span>
          </label>
          <div className="space-y-2">
            {["Male", "Female", "Prefer not to say"].map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 text-sm opacity-90 cursor-pointer"
              >
                <input type="radio" name="gender" value={option} />
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Membership Selection */}
        <div>
          <label className="block font-semibold mb-2">
            Membership Selection<span className="text-(--accent-color)">*</span>
          </label>
          <select
            value={membership}
            onChange={handleMembershipChange}
            className="w-full border border-white/40 rounded-full pl-5 pr-10 py-3 bg-transparent focus:outline-none [&>option]:bg-(--bg-color)"
          >
            <option value="" disabled>
              Select Membership Plan
            </option>
            {membershipOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Class Selection - conditional */}
        <div>
          <label className="block font-semibold mb-2">
            Class Selection<span className="text-(--accent-color)">*</span>
          </label>
          {hasFullAccess ? (
            <div className="flex items-center border border-white/40 rounded-full px-5 py-3 opacity-70 text-sm">
              All classes included with your membership
            </div>
          ) : (
            <select
              value={classSelection}
              onChange={(e) => setClassSelection(e.target.value)}
              disabled={!isBasic}
              className="w-full border border-white/40 rounded-full pl-5 pr-10 py-3 bg-transparent focus:outline-none disabled:opacity-50 [&>option]:bg-(--bg-color)"
            >
              <option value="" disabled>
                Class Selection
              </option>
              {classOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      </form>

      <div className="flex items-center justify-center gap-2 mt-10 text-sm">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="w-4 h-4"
        />
        <span>
          I agree to the{" "}
          <a href="#" className="text-(--accent-color) font-semibold">
            Terms
          </a>{" "}
          &{" "}
          <a href="#" className="text-(--accent-color) font-semibold">
            Conditions.
          </a>
        </span>
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="accent" size="lg" className="px-16">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Enrollment;
