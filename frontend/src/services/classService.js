export const getAllClasses = async () => {
  const res = await fetch("/api/classes");
  if (!res.ok) throw new Error("Failed to fetch classes");
  const data = await res.json();
  return Array.isArray(data) ? data : data.classes || [];
};

export const getClassById = async (id) => {
  const res = await fetch(`/api/classes/${id}`);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch class");
  }

  return await res.json();
};

export default {
  getAllClasses,
  getClassById,
};
