import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Upload } from "lucide-react";
import {
  createAdminClass,
  deleteAdminClass,
  getAdminClassById,
  updateAdminClass,
} from "../../services/adminClassService";
import { getAdminInstructors } from "../../services/adminInstructorService";

const martialArts = [
  "KARATE",
  "MUAY_THAI",
  "JUDO",
  "JIU_JITSU",
  "TAEKWONDO",
  "AIKIDO",
  "KUNG_FU",
];
const levels = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

const emptyForm = {
  title: "",
  description: "",
  martialArt: "",
  level: "",
  instructorId: "",
  minAge: "",
  duration: "",
  overview: "",
  capacity: "",
  beltRequirement: "",
  isActive: true,
};

const ScheduleAddUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState(emptyForm);
  const [instructors, setInstructors] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadInstructors = async () => {
      try {
        const response = await getAdminInstructors({ limit: 100 });
        setInstructors(Array.isArray(response?.data) ? response.data : []);
      } catch (err) {
        console.error("Failed to load instructors", err);
      }
    };

    loadInstructors();
  }, []);

  useEffect(() => {
    if (!isEditing) return;

    const loadClass = async () => {
      try {
        setLoading(true);
        setError("");
        const classData = await getAdminClassById(id);
        setFormData({
          title: classData.title || "",
          description: classData.description || "",
          martialArt: classData.martialArt || "",
          level: classData.level || "",
          instructorId: classData.instructorId || "",
          minAge: classData.minAge ?? "",
          duration: classData.duration ?? "",
          overview: classData.overview || "",
          capacity: classData.capacity ?? "",
          beltRequirement: classData.beltRequirement || "",
          isActive: classData.isActive ?? true,
        });
      } catch (err) {
        console.error("Failed to load class", err);
        setError(err.message || "Unable to load class details.");
      } finally {
        setLoading(false);
      }
    };

    loadClass();
  }, [id, isEditing]);

  const handleChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setImageFile(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      if (!isEditing && !imageFile) {
        setError("Please select an image for the class.");
        return;
      }

      const payload = {
        ...formData,
        minAge: Number(formData.minAge),
        duration: Number(formData.duration),
        capacity: Number(formData.capacity),
        imageFile: imageFile || undefined,
      };

      if (isEditing) {
        await updateAdminClass(id, payload);
      } else {
        await createAdminClass(payload);
      }

      navigate("/admin/dashboard/schedules");
    } catch (err) {
      console.error("Failed to save class", err);
      setError(err.message || "Unable to save class.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !window.confirm("Delete this class?")) return;
    try {
      setLoading(true);
      await deleteAdminClass(id);
      navigate("/admin/dashboard/schedules");
    } catch (err) {
      console.error("Failed to delete class", err);
      setError(err.message || "Unable to delete class.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <p className="text-xs opacity-70 mb-4">
        Classes & schedules &gt; {isEditing ? "Editing Class" : "New Class"}
      </p>

      <h1 className="font-bold text-3xl mb-10">
        Classes & Schedules Management
      </h1>

      <form
        onSubmit={handleSave}
        className="max-w-2xl border border-gray-300 rounded-2xl p-8"
      >
        <h2 className="font-bold text-2xl mb-8">
          {isEditing ? `Edit class — ${formData.title}` : "Add New Class"}
        </h2>

        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

        {/* Upload Photo */}
        <div className="flex items-center gap-6 mb-6">
          <label className="font-semibold w-40 shrink-0">Upload Photo</label>
          <div className="flex flex-col gap-2">
            <label className="w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center hover:border-amber-400 transition-colors cursor-pointer">
              <Upload className="w-5 h-5" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {imageFile ? (
              <span className="text-xs opacity-70">{imageFile.name}</span>
            ) : (
              <span className="text-xs opacity-70">
                Required for new classes
              </span>
            )}
          </div>
        </div>

        {/* Class Name */}
        <div className="flex items-center gap-6 mb-6">
          <label className="font-semibold w-40 shrink-0">Class Name</label>
          <input
            type="text"
            value={formData.title}
            onChange={handleChange("title")}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-transparent focus:outline-none"
          />
        </div>

        {/* Description */}
        <div className="flex items-center gap-6 mb-6">
          <label className="font-semibold w-40 shrink-0">Description</label>
          <input
            type="text"
            value={formData.description}
            onChange={handleChange("description")}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-transparent focus:outline-none"
          />
        </div>

        {/* Martial Art */}
        <div className="flex items-center gap-6 mb-6">
          <label className="font-semibold w-40 shrink-0">Martial Art</label>
          <select
            value={formData.martialArt}
            onChange={handleChange("martialArt")}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-transparent focus:outline-none [&>option]:bg-(--bg-color)"
          >
            <option value="" disabled>
              Select Martial Art
            </option>
            {martialArts.map((art) => (
              <option key={art} value={art}>
                {art}
              </option>
            ))}
          </select>
        </div>

        {/* Level */}
        <div className="flex items-center gap-6 mb-6">
          <label className="font-semibold w-40 shrink-0">Level</label>
          <select
            value={formData.level}
            onChange={handleChange("level")}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-transparent focus:outline-none [&>option]:bg-(--bg-color)"
          >
            <option value="" disabled>
              Select Level
            </option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-6 mb-6">
          <label className="font-semibold w-40 shrink-0">Instructor</label>
          <select
            value={formData.instructorId}
            onChange={handleChange("instructorId")}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-transparent focus:outline-none [&>option]:bg-(--bg-color)"
          >
            <option value="" disabled>
              Select Instructor
            </option>
            {instructors.map((instructor) => (
              <option key={instructor.id} value={instructor.id}>
                {instructor.name}
              </option>
            ))}
          </select>
        </div>

        {/* Minimum Age */}
        <div className="flex items-center gap-6 mb-6">
          <label className="font-semibold w-40 shrink-0">Minimum Age</label>
          <input
            type="number"
            value={formData.minAge}
            onChange={handleChange("minAge")}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-transparent focus:outline-none"
          />
        </div>

        {/* Capacity */}
        <div className="flex items-center gap-6 mb-6">
          <label className="font-semibold w-40 shrink-0">Capacity</label>
          <input
            type="number"
            value={formData.capacity}
            onChange={handleChange("capacity")}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-transparent focus:outline-none"
          />
        </div>

        {/* Duration */}
        <div className="flex items-center gap-6 mb-6">
          <label className="font-semibold w-40 shrink-0">Duration (min)</label>
          <input
            type="number"
            value={formData.duration}
            onChange={handleChange("duration")}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-transparent focus:outline-none"
          />
        </div>

        {/* Overview */}
        <div className="flex items-center gap-6 mb-6">
          <label className="font-semibold w-40 shrink-0">Overview</label>
          <textarea
            value={formData.overview}
            onChange={handleChange("overview")}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-transparent focus:outline-none min-h-24"
          />
        </div>

        {/* Belt Requirement */}
        <div className="flex items-center gap-6 mb-8">
          <label className="font-semibold w-40 shrink-0">
            Belt Requirement
          </label>
          <input
            type="text"
            value={formData.beltRequirement}
            onChange={handleChange("beltRequirement")}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-transparent focus:outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={handleChange("isActive")}
            />
            Active
          </label>
          <button
            type="submit"
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="border border-red-500 text-red-500 font-semibold px-6 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors disabled:opacity-60"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ScheduleAddUpdate;
