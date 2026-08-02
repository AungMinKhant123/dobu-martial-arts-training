const stats = [
  { value: 2, label: "Bookings Today" },
  { value: 12, label: "Active Members" },
  { value: 1, label: "New Enquiries" },
];

const recentEnquiries = [
  {
    name: "Myint Mo Kyaw",
    reason: "Private Lessons",
    date: "10 Jul",
    status: "Resolved",
  },
  {
    name: "Aung Min Khant",
    reason: "Info",
    date: "7 Jul",
    status: "New",
  },
  {
    name: "May Phu San",
    reason: "Class Schedule",
    date: "9 Jul",
    status: "In Progress",
  },
];

const todaysClasses = [
  { time: "09:00-10:00", className: "Karate", instructor: "David Lee" },
  { time: "11:00-12:00", className: "Muay Thai", instructor: "Coach Mark" },
  { time: "18:00-19:00", className: "Judo", instructor: "Ryan" },
  { time: "19:30-20:30", className: "Yoga", instructor: "Coach Mark" },
];

const statusStyles = {
  Resolved: "text-green-600 font-semibold",
  New: "text-gray-900 font-semibold",
  "In Progress": "text-amber-500 font-semibold",
};

const today = new Date().toLocaleDateString("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
});

const Dashbord = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-bold text-3xl">Hello Admin</h1>
        <p className="text-sm font-medium">{today}</p>
      </div>

      {/* Stats cards */}
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {stats.map(({ value, label }) => (
          <div
            key={label}
            className="border border-amber-400 rounded-xl px-10 py-8 text-center min-w-[180px]"
          >
            <p className="text-3xl font-bold mb-2">{value}</p>
            <p className="text-sm font-semibold uppercase">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent Enquiries */}
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
            {recentEnquiries.map((enquiry) => (
              <tr key={enquiry.name}>
                <td className="py-2 font-medium">{enquiry.name}</td>
                <td className="py-2">{enquiry.reason}</td>
                <td className="py-2">{enquiry.date}</td>
                <td className={`py-2 ${statusStyles[enquiry.status]}`}>
                  {enquiry.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Today's Classes */}
      <div className="bg-gray-100 text-gray-900 border border-amber-400 rounded-xl p-6 max-w-2xl mx-auto">
        <h2 className="text-red-500 font-bold text-xl text-center mb-4">
          Today's Classes
        </h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-amber-400 text-left">
              <th className="pb-2 font-semibold">Time</th>
              <th className="pb-2 font-semibold">Classes</th>
              <th className="pb-2 font-semibold">Instructors</th>
            </tr>
          </thead>
          <tbody>
            {todaysClasses.map((c) => (
              <tr key={c.time}>
                <td className="py-1 font-medium">{c.time}</td>
                <td className="py-1 uppercase">{c.className}</td>
                <td className="py-1 font-semibold">{c.instructor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashbord;
