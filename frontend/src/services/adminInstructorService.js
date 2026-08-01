const handleResponse = async (response) => {
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload?.message || payload?.error || "Request failed";
    throw new Error(message);
  }
  return payload;
};

export const getAdminInstructors = async ({
  page = 1,
  limit = 10,
  search = "",
  beltLevel,
  sortBy = "createdAt",
  sortOrder = "desc",
} = {}) => {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sortBy,
    sortOrder,
  });

  if (search) query.set("search", search);
  if (beltLevel) query.set("beltLevel", beltLevel);

  const response = await fetch(`/api/admin/instructors?${query.toString()}`, {
    credentials: "include",
  });
  return await handleResponse(response);
};

export const getAdminInstructorById = async (id) => {
  const response = await fetch(`/api/admin/instructors/${id}`, {
    credentials: "include",
  });
  const payload = await handleResponse(response);
  return payload.data || payload;
};

const buildInstructorFormData = ({
  name,
  email,
  phone,
  biography,
  beltLevel,
  experienceYears,
  qualifications,
  certifications,
  achievements,
  specialties,
  imageFile,
}) => {
  const formData = new FormData();
  if (name !== undefined) formData.append("name", name);
  if (email !== undefined) formData.append("email", email);
  if (phone !== undefined) formData.append("phone", phone);
  if (biography !== undefined) formData.append("biography", biography);
  if (beltLevel !== undefined) formData.append("beltLevel", beltLevel);
  if (experienceYears !== undefined)
    formData.append("experienceYears", String(experienceYears));
  if (qualifications !== undefined)
    formData.append("qualifications", JSON.stringify(qualifications));
  if (certifications !== undefined)
    formData.append("certifications", JSON.stringify(certifications));
  if (achievements !== undefined)
    formData.append("achievements", JSON.stringify(achievements));
  if (specialties !== undefined)
    formData.append("specialties", JSON.stringify(specialties));
  if (imageFile) formData.append("image", imageFile);
  return formData;
};

export const createAdminInstructor = async ({
  name,
  email,
  phone,
  biography,
  beltLevel,
  experienceYears,
  qualifications,
  certifications,
  achievements,
  specialties,
  imageFile,
}) => {
  const response = await fetch(`/api/admin/instructors`, {
    method: "POST",
    credentials: "include",
    body: buildInstructorFormData({
      name,
      email,
      phone,
      biography,
      beltLevel,
      experienceYears,
      qualifications,
      certifications,
      achievements,
      specialties,
      imageFile,
    }),
  });
  const payload = await handleResponse(response);
  return payload.data || payload;
};

export const updateAdminInstructor = async (
  id,
  {
    name,
    email,
    phone,
    biography,
    beltLevel,
    experienceYears,
    qualifications,
    certifications,
    achievements,
    specialties,
    imageFile,
  },
) => {
  const response = await fetch(`/api/admin/instructors/${id}`, {
    method: "PATCH",
    credentials: "include",
    body: buildInstructorFormData({
      name,
      email,
      phone,
      biography,
      beltLevel,
      experienceYears,
      qualifications,
      certifications,
      achievements,
      specialties,
      imageFile,
    }),
  });
  const payload = await handleResponse(response);
  return payload.data || payload;
};

export const deleteAdminInstructor = async (id) => {
  const response = await fetch(`/api/admin/instructors/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const payload = await handleResponse(response);
  return payload;
};

export default {
  getAdminInstructors,
  getAdminInstructorById,
  createAdminInstructor,
  updateAdminInstructor,
  deleteAdminInstructor,
};
