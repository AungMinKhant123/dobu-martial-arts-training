import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { User, Mail, Phone, Calendar, Home, ChevronDown } from "lucide-react";
import Button from "../../components/Button";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",
  address: "",
  gender: "",
  membershipId: "",
  classId: "",
};

const Enrollment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);
  const [membershipOptions, setMembershipOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedMembership = membershipOptions.find(
    (option) => option.id === formData.membershipId,
  );
  const isBasic = selectedMembership?.name === "Basic";
  const hasFullAccess = selectedMembership?.allowsAllClasses ?? false;

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [membershipRes, classRes] = await Promise.all([
          fetch("/api/memberships"),
          fetch("/api/classes"),
        ]);

        if (!membershipRes.ok || !classRes.ok) {
          throw new Error("Failed to load enrollment options.");
        }

        const membershipData = await membershipRes.json();
        const classData = await classRes.json();
        const classes = classData?.data ?? classData;

        setMembershipOptions(
          Array.isArray(membershipData) ? membershipData : [],
        );
        setClassOptions(Array.isArray(classes) ? classes : []);
      } catch (err) {
        setError(err.message || "Unable to load enrollment options.");
      }
    };

    fetchOptions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMembershipChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, membershipId: value, classId: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreed) {
      setError("Please agree to the terms and conditions before continuing.");
      return;
    }

    if (!formData.membershipId) {
      setError("Please choose a membership plan.");
      return;
    }

    if (isBasic && !formData.classId) {
      setError("Please select a class for the Basic membership.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        dob: formData.dob,
        gender: formData.gender,
        address: formData.address.trim(),
        membershipId: formData.membershipId,
        ...(isBasic && formData.classId ? { classId: formData.classId } : {}),
      };

      const res = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(result.message || "Enrollment submission failed.");
      }

      navigate("/payment", {
        state: {
          enrollmentId: result?.data?.id,
          message: result?.message || "Enrollment submitted successfully.",
        },
      });
    } catch (err) {
      setError(err.message || "Enrollment submission failed.");
    } finally {
      setLoading(false);
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

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-x-10 gap-y-6 max-w-4xl mx-auto px-8"
      >
        <div>
          <label className="block font-semibold mb-2">
            First Name<span className="text-(--accent-color)">*</span>
          </label>
          <div className="flex items-center gap-3 border border-white/40 rounded-full px-5 py-3">
            <User className="w-4 h-4 opacity-70 shrink-0" />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
              className="bg-transparent w-full focus:outline-none placeholder-white/50"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Last Name<span className="text-(--accent-color)">*</span>
          </label>
          <div className="flex items-center gap-3 border border-white/40 rounded-full px-5 py-3">
            <User className="w-4 h-4 opacity-70 shrink-0" />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter your Last name"
              className="bg-transparent w-full focus:outline-none placeholder-white/50"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Email Address<span className="text-(--accent-color)">*</span>
          </label>
          <div className="flex items-center gap-3 border border-white/40 rounded-full px-5 py-3">
            <Mail className="w-4 h-4 opacity-70 shrink-0" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your Email Address"
              className="bg-transparent w-full focus:outline-none placeholder-white/50"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Phone Number<span className="text-(--accent-color)">*</span>
          </label>
          <div className="flex items-center gap-3 border border-white/40 rounded-full px-5 py-3">
            <Phone className="w-4 h-4 opacity-70 shrink-0" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your Phone Number"
              className="bg-transparent w-full focus:outline-none placeholder-white/50"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Date of Birth<span className="text-(--accent-color)">*</span>
          </label>
          <div className="relative flex items-center gap-3 border border-white/40 rounded-full px-5 py-3">
            <Calendar className="w-4 h-4 shrink-0 text-current" />
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="bg-transparent w-full focus:outline-none placeholder-white/50 appearance-none pr-2 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Home Address<span className="text-(--accent-color)">*</span>
          </label>
          <div className="flex items-center gap-3 border border-white/40 rounded-full px-5 py-3">
            <Home className="w-4 h-4 opacity-70 shrink-0" />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your full residential address"
              className="bg-transparent w-full focus:outline-none placeholder-white/50"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-3">
            Gender<span className="text-(--accent-color)">*</span>
          </label>
          <div className="space-y-2">
            {[
              { label: "Male", value: "MALE" },
              { label: "Female", value: "FEMALE" },
              { label: "Prefer not to say", value: "OTHER" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 text-sm opacity-90 cursor-pointer"
              >
                <input
                  type="radio"
                  name="gender"
                  value={option.value}
                  checked={formData.gender === option.value}
                  onChange={handleInputChange}
                  required
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Membership Selection<span className="text-(--accent-color)">*</span>
          </label>
          <div className="relative">
            <select
              name="membershipId"
              value={formData.membershipId}
              onChange={handleMembershipChange}
              className="w-full border border-white/40 rounded-full px-5 pr-10 py-3 bg-transparent focus:outline-none appearance-none [&>option]:bg-(--bg-color)"
              required
            >
              <option value="" disabled>
                Select Membership Plan
              </option>
              {membershipOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-current" />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Class Selection<span className="text-(--accent-color)">*</span>
          </label>
          {hasFullAccess ? (
            <div className="flex items-center border border-white/40 rounded-full px-5 py-3 opacity-70 text-sm">
              All classes included with your membership
            </div>
          ) : (
            <div className="relative">
              <select
                name="classId"
                value={formData.classId}
                onChange={handleInputChange}
                disabled={!isBasic}
                className="w-full border border-white/40 rounded-full pl-5 pr-10 py-3 bg-transparent focus:outline-none disabled:opacity-50 appearance-none [&>option]:bg-(--bg-color)"
                required={isBasic}
              >
                <option value="" disabled>
                  Class Selection
                </option>
                {classOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-current" />
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center justify-center gap-2 mt-4 text-sm">
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

          {error ? (
            <p className="mt-4 text-center text-sm text-red-400">{error}</p>
          ) : null}

          <div className="flex justify-center mt-8">
            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="px-16"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Enrollment;
