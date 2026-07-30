export const getHomeData = async () => {
  const res = await fetch("/api/home");
  if (!res.ok) throw new Error("Failed to fetch home data");

  return await res.json();
};

export default {
  getHomeData,
};
