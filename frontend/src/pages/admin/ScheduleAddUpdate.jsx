import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Upload } from "lucide-react";

// Same hardcoded data as Schedule.jsx — mirrors it for now until connected to classService.js
const classes = [
  {
    id: "1",
    name: "Adult Kick boxing",
    description: "",
    martialArt: "Muay Thai",
    level: "All levels",
    instructor: "David Lee",
    minAge: "",
    capacity: "20",
    schedule: "Thu 7:00PM",
    beltRequirement: "",
  },
  {
    id: "2",
    name: "Adult Kick boxing",
    description: "",
    martialArt: "Muay Thai",
    level: "All levels",
    instructor: "David Lee",
    minAge: "",
    capacity: "20",
    schedule: "Thu 7:00PM",
    beltRequirement: "",
  },
];

const martialArts = [
  "Karate",
  "Muay Thai",
  "Judo",
  "Jiu-Jitsu",
  "Self Defense",
];
const levels = ["All levels", "Beginner", "Intermediate", "Advanced"];
const instructors = ["David Lee", "Coach Mark", "Sensei Lisa", "Coach Ryan"];

const emptyForm = {
  name: "",
  description: "",
  martialArt: "",
  level: "",
  instructor: "",
  minAge: "",
  capacity: "",
  schedule: "",
  beltRequirement: "",
};

const ScheduleAddUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const existingClass = isEditing ? classes.find((c) => c.id === id) : null;

  const [formData, setFormData] = useState(existingClass || emptyForm);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: connect to classService.js to actually persist this
    console.log("Saving class:", formData);
    navigate("/admin/dashboard/schedules");
  };

  const handleDelete = () => {
    // TODO: connect to classService.js to actually delete this
    console.log("Deleting class:", id);
    navigate("/admin/dashboard/schedules");
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
          {isEditing ? `Edit class — ${formData.name}` : "Add New Class"}
        </h2>

        {/* Upload Photo */}
        <div className="flex items-center gap-6 mb-6">
          <label className="font-semibold w-40 shrink-0">Upload Photo</label>
          <button
            type="button"
            className="w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center hover:border-amber-400 transition-colors"
          >
            <Upload className="w-5 h-5" />
          </button>
        </div>

        {/* Class Name */}
        <div className="flex items-center gap-6 mb-6">
          <label className="font-semibold w-40 shrink-0">Class Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={handleChange("name")}
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
            value={formData.instructor}
            onChange={handleChange("instructor")}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-transparent focus:outline-none [&>option]:bg-(--bg-color)"
          >
            <option value="" disabled>
              Select Instructor
            </option>
            {instructors.map((instructor) => (
              <option key={instructor} value={instructor}>
                {instructor.toUpperCase()}
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

        {/* Schedule */}
        <div className="flex items-center gap-6 mb-6">
          <label className="font-semibold w-40 shrink-0">Schedule</label>
          <input
            type="text"
            value={formData.schedule}
            onChange={handleChange("schedule")}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-transparent focus:outline-none"
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
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            Save Changes
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              className="border border-red-500 text-red-500 font-semibold px-6 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
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
