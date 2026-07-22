export const getAllInstructors = async () => {
  const res = await fetch("/api/instructors");
  if (!res.ok) throw new Error("Failed to fetch instructors");
  const data = await res.json();
  return Array.isArray(data) ? data : data.instructors || [];
};

export const getInstructorById = async (id) => {
  const res = await fetch(`/api/instructors/${id}`);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch instructor");
  }

  return await res.json();
};

export default {
  getAllInstructors,
  getInstructorById,
};
