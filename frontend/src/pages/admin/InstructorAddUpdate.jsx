import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import Button from "../../components/Button";
import {
  createAdminInstructor,
  getAdminInstructorById,
  updateAdminInstructor,
} from "../../services/adminInstructorService";

const beltLevelOptions = [
  { value: "", label: "Select belt level" },
  { value: "WHITE", label: "White" },
  { value: "YELLOW", label: "Yellow" },
  { value: "ORANGE", label: "Orange" },
  { value: "GREEN", label: "Green" },
  { value: "BLUE", label: "Blue" },
  { value: "PURPLE", label: "Purple" },
  { value: "BROWN", label: "Brown" },
  { value: "BLACK", label: "Black" },
];

const InstructorAddUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [biography, setBiography] = useState("");
  const [beltLevel, setBeltLevel] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [qualifications, setQualifications] = useState([{ title: "" }]);
  const [certifications, setCertifications] = useState([{ name: "" }]);
  const [specialties, setSpecialties] = useState([{ name: "" }]);
  const [achievements, setAchievements] = useState([{ title: "" }]);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditMode) return;

    const loadInstructor = async () => {
      try {
        setLoading(true);
        setError("");
        const instructor = await getAdminInstructorById(id);
        setName(instructor.name || "");
        setEmail(instructor.email || "");
        setPhone(instructor.phone || "");
        setBiography(instructor.biography || "");
        setBeltLevel(instructor.beltLevel || "");
        setExperienceYears(String(instructor.experienceYears ?? ""));
        setQualifications(
          instructor.qualifications?.length
            ? instructor.qualifications.map((item) => ({ title: item.title }))
            : [{ title: "" }],
        );
        setCertifications(
          instructor.certifications?.length
            ? instructor.certifications.map((item) => ({ name: item.name }))
            : [{ name: "" }],
        );
        setSpecialties(
          instructor.specialties?.length
            ? instructor.specialties.map((item) => ({ name: item.name }))
            : [{ name: "" }],
        );
        setAchievements(
          instructor.achievements?.length
            ? instructor.achievements.map((item) => ({ title: item.title }))
            : [{ title: "" }],
        );
        setPreviewImage(instructor.imageUrl || null);
      } catch (err) {
        console.error("Failed to load instructor", err);
        setError(err.message || "Unable to load instructor details.");
      } finally {
        setLoading(false);
      }
    };

    loadInstructor();
  }, [id, isEditMode]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleListChange = (setter, index, field, value) => {
    setter((current) =>
      current.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item,
      ),
    );
  };

  const removeListItem = (setter, index) => {
    setter((current) => current.filter((_, idx) => idx !== index));
  };

  const addListItem = (setter, defaultItem) => {
    setter((current) => [...current, defaultItem]);
  };

  const validateForm = () => {
    if (!name.trim()) {
      setError("Name is required.");
      return false;
    }
    if (!email.trim()) {
      setError("Email is required.");
      return false;
    }
    if (!biography.trim()) {
      setError("Biography is required.");
      return false;
    }
    if (!experienceYears.trim() || Number.isNaN(Number(experienceYears))) {
      setError("Experience years must be a valid number.");
      return false;
    }
    if (!isEditMode && !imageFile) {
      setError("Profile image is required for new instructors.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError("");
      const payload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        biography: biography.trim(),
        beltLevel,
        experienceYears: Number(experienceYears),
        qualifications: qualifications.filter((item) => item.title.trim()),
        certifications: certifications.filter((item) => item.name.trim()),
        specialties: specialties.filter((item) => item.name.trim()),
        achievements: achievements.filter((item) => item.title.trim()),
        imageFile,
      };

      if (isEditMode) {
        await updateAdminInstructor(id, payload);
      } else {
        await createAdminInstructor(payload);
      }

      navigate("/admin/dashboard/instructors");
    } catch (err) {
      console.error("Instructor save failed", err);
      setError(err.message || "Unable to save instructor.");
    } finally {
      setLoading(false);
    }
  };

  const headerText = isEditMode
    ? `Editing - ${name || "Instructor"}`
    : "Create New Instructor";

  const renderImagePreview = useMemo(() => {
    if (!previewImage) {
      return <span className="text-slate-400">Upload new profile image</span>;
    }
    return (
      <img
        src={previewImage}
        alt="Instructor preview"
        className="h-full w-full rounded-xl object-cover"
      />
    );
  }, [previewImage]);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase opacity-60 mb-3">
          Instructor Management
        </p>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">{headerText}</h1>
            <p className="text-sm opacity-70 mt-1">
              {isEditMode
                ? "Update the instructor profile and credentials."
                : "Add a new instructor with qualifications, specialties, and achievements."}
            </p>
          </div>
          <Button
            variant="outline"
            className="inline-flex items-center gap-2"
            onClick={() => navigate("/admin/dashboard/instructors")}
          >
            <ArrowLeft className="w-4 h-4" /> Back to instructors
          </Button>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-4 text-red-200">
              {error}
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-200">
                    Name*
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Instructor name"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-200">
                    Email*
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-200">
                    Belt Level
                  </label>
                  <select
                    value={beltLevel}
                    onChange={(e) => setBeltLevel(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-400"
                  >
                    {beltLevelOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-200">
                    Experience Year*
                  </label>
                  <input
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    placeholder="10"
                    type="number"
                    min="0"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-200">
                  Phone
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +66123456789"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-200">
                  Biography*
                </label>
                <textarea
                  rows={5}
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                  placeholder="Instructor biography"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="mb-3 text-sm font-semibold text-slate-200">
                  Profile Image
                </p>
                <label className="group flex h-72 w-full cursor-pointer items-center justify-center rounded-3xl border border-dashed border-white/20 bg-slate-950/80 p-4 text-center text-slate-400 transition hover:border-amber-400">
                  {renderImagePreview}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
            <div className="flex items-center justify-between gap-3 pb-4">
              <h2 className="text-lg font-semibold text-slate-100">
                Qualifications
              </h2>
              <Button
                type="button"
                variant="outline"
                onClick={() => addListItem(setQualifications, { title: "" })}
              >
                + Add Qualifications
              </Button>
            </div>
            <div className="space-y-4">
              {qualifications.map((qualification, index) => (
                <div
                  key={index}
                  className="grid gap-3 md:grid-cols-[1fr_0.3fr]"
                >
                  <input
                    value={qualification.title}
                    onChange={(e) =>
                      handleListChange(
                        setQualifications,
                        index,
                        "title",
                        e.target.value,
                      )
                    }
                    placeholder="Qualification title"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-400"
                  />
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => removeListItem(setQualifications, index)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
            <div className="flex items-center justify-between gap-3 pb-4">
              <h2 className="text-lg font-semibold text-slate-100">
                Certifications
              </h2>
              <Button
                type="button"
                variant="outline"
                onClick={() => addListItem(setCertifications, { name: "" })}
              >
                + Add Certification
              </Button>
            </div>
            <div className="space-y-4">
              {certifications.map((certification, index) => (
                <div
                  key={index}
                  className="grid gap-3 md:grid-cols-[1fr_0.3fr]"
                >
                  <input
                    value={certification.name}
                    onChange={(e) =>
                      handleListChange(
                        setCertifications,
                        index,
                        "name",
                        e.target.value,
                      )
                    }
                    placeholder="Certification name"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-400"
                  />
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => removeListItem(setCertifications, index)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
            <div className="flex items-center justify-between gap-3 pb-4">
              <h2 className="text-lg font-semibold text-slate-100">
                Specialties
              </h2>
              <Button
                type="button"
                variant="outline"
                onClick={() => addListItem(setSpecialties, { name: "" })}
              >
                + Add Speciality
              </Button>
            </div>
            <div className="space-y-4">
              {specialties.map((specialty, index) => (
                <div
                  key={index}
                  className="grid gap-3 md:grid-cols-[1fr_0.3fr]"
                >
                  <input
                    value={specialty.name}
                    onChange={(e) =>
                      handleListChange(
                        setSpecialties,
                        index,
                        "name",
                        e.target.value,
                      )
                    }
                    placeholder="Specialty name"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-400"
                  />
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => removeListItem(setSpecialties, index)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
            <div className="flex items-center justify-between gap-3 pb-4">
              <h2 className="text-lg font-semibold text-slate-100">
                Achievements
              </h2>
              <Button
                type="button"
                variant="outline"
                onClick={() => addListItem(setAchievements, { title: "" })}
              >
                + Add Achievement
              </Button>
            </div>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="grid gap-3 md:grid-cols-[1fr_0.3fr]"
                >
                  <input
                    value={achievement.title}
                    onChange={(e) =>
                      handleListChange(
                        setAchievements,
                        index,
                        "title",
                        e.target.value,
                      )
                    }
                    placeholder="Achievement title"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-400"
                  />
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => removeListItem(setAchievements, index)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate("/admin/dashboard/instructors")}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button variant="accent" type="submit" className="w-full sm:w-auto">
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  {isEditMode ? "Update Instructor" : "Create Instructor"}
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstructorAddUpdate;
