import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../services/adminDashboardService";

const statusStyles = {
  RESOLVED: "text-green-600 font-semibold",
  NEW: "text-gray-900 font-semibold",
  PENDING: "text-amber-500 font-semibold",
};

const today = new Date().toLocaleDateString("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
});

const Dashbord = () => {
  const [stats, setStats] = useState([]);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getAdminDashboard();

        const dashboardStats = [
          {
            value: data?.statistics?.pendingEnrollments ?? 0,
            label: "Pending Enrollments",
          },
          {
            value: data?.statistics?.totalActiveClasses ?? 0,
            label: "Active Classes",
          },
          {
            value: data?.statistics?.recentPendingEnrollments?.length ?? 0,
            label: "Recent Pending Requests",
          },
        ];

        const enquiries = (
          data?.statistics?.recentPendingEnrollments ?? []
        ).map((enquiry) => ({
          name: enquiry?.email || "Unknown",
          reason:
            enquiry?.membership?.name && enquiry?.class?.title
              ? `${enquiry.membership.name} • ${enquiry.class.title}`
              : enquiry?.membership?.name || enquiry?.class?.title || "N/A",
          date: new Date(enquiry?.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          }),
          status: "Pending",
        }));

        setStats(dashboardStats);
        setRecentEnquiries(enquiries);
      } catch (err) {
        setError(err.message || "Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-bold text-3xl">Hello Admin</h1>
        <p className="text-sm font-medium">{today}</p>
      </div>

      {loading ? (
        <div className="text-center text-gray-600 py-10">
          Loading dashboard...
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="border border-amber-400 rounded-xl px-10 py-8 text-center min-w-45"
              >
                <p className="text-3xl font-bold mb-2">{value}</p>
                <p className="text-sm font-semibold uppercase">{label}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 text-gray-900 border border-amber-400 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
            <h2 className="text-red-500 font-bold text-xl text-center mb-4">
              Recent Enquiries
            </h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-amber-400 text-left">
                  <th className="pb-2 font-semibold">Name</th>
                  <th className="pb-2 font-semibold">Reason</th>
                  <th className="pb-2 font-semibold">Date</th>
                  <th className="pb-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.length > 0 ? (
                  recentEnquiries.map((enquiry) => (
                    <tr key={`${enquiry.name}-${enquiry.date}`}>
                      <td className="py-2 font-medium">{enquiry.name}</td>
                      <td className="py-2">{enquiry.reason}</td>
                      <td className="py-2">{enquiry.date}</td>
                      <td className={`py-2 ${statusStyles.PENDING}`}>
                        {enquiry.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-gray-500">
                      No pending enquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashbord;
