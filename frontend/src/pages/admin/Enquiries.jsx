import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import {
  Search,
  Eye,
  ArrowLeft,
  ArrowRight,
  X,
  Mail,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Button from "../../components/Button";
import {
  getAdminEnquiries,
  getAdminEnquiryStatistics,
} from "../../services/adminEnquiryService";

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "PENDING", label: "Pending" },
  { value: "READ", label: "Read" },
  { value: "REPLIED", label: "Replied" },
];

const statusStyles = {
  PENDING: "bg-amber-500 text-black",
  READ: "bg-sky-500 text-white",
  REPLIED: "bg-emerald-500 text-white",
};

const Enquiries = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "all");
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));
  const [enquiries, setEnquiries] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    pendingEnquiries: 0,
    readEnquiries: 0,
    repliedEnquiries: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setStatus(searchParams.get("status") || "all");
    setPage(Number(searchParams.get("page") || 1));
  }, [searchParams]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");
        const [statsResponse, enquiriesResponse] = await Promise.all([
          getAdminEnquiryStatistics(),
          getAdminEnquiries({
            page,
            limit: 10,
            search: search || undefined,
            status: status === "all" ? undefined : status,
            sortBy: "createdAt",
            sortOrder: "desc",
          }),
        ]);
        setStats(statsResponse);
        setEnquiries(enquiriesResponse.enquiries || []);
        setPagination(
          enquiriesResponse.pagination || { page: 1, totalPages: 1 },
        );
      } catch (err) {
        console.error("Unable to load enquiries", err);
        setError(err.message || "Unable to load enquiries.");
        setEnquiries([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page, search, status]);

  const updateSearchParams = (values) => {
    const next = {
      page: String(values.page || 1),
      search: values.search || "",
      status: values.status || "all",
    };
    setSearchParams(next, { replace: true });
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    updateSearchParams({ page: 1, search, status });
  };

  const handleStatusChange = (nextStatus) => {
    setStatus(nextStatus);
    updateSearchParams({ page: 1, search, status: nextStatus });
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatus("all");
    updateSearchParams({ page: 1, search: "", status: "all" });
  };

  const formattedDate = (value) => {
    if (!value) return "-";
    return new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const showActiveFilters = status !== "all" || search.trim() !== "";

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase opacity-60 mb-3">Enquiries inbox</p>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Enquiry Management</h1>
            <p className="text-sm opacity-70 mt-1">
              Review customer enquiries and manage replies from the admin team.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-center">
              <p className="text-sm opacity-70">Total Enquiries</p>
              <p className="text-4xl font-bold">{stats.totalEnquiries}</p>
            </div>
            <Link to="/admin/dashboard/enquiries/0" className="hidden" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.8fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
          <form
            onSubmit={handleSearchSubmit}
            className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr]"
          >
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by customer, subject, or message..."
                className="w-full rounded-2xl border border-white/10 bg-slate-950/90 py-3 pl-11 pr-4 text-sm outline-none focus:border-amber-400"
              />
            </div>
            <select
              value={status}
              onChange={(event) => handleStatusChange(event.target.value)}
              className="rounded-2xl border border-white/10 bg-slate-950/90 py-3 px-4 text-sm outline-none focus:border-amber-400"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </form>
          {showActiveFilters && (
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              {status !== "all" && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-200">
                  Status: {status}
                  <button
                    type="button"
                    onClick={() => handleStatusChange("all")}
                  >
                    {" "}
                    <X size={14} />{" "}
                  </button>
                </span>
              )}
              {search.trim() !== "" && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-200">
                  Search: {search}
                  <button type="button" onClick={() => setSearch("")}>
                    {" "}
                    <X size={14} />{" "}
                  </button>
                </span>
              )}
              <button
                type="button"
                onClick={handleClearFilters}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200 hover:bg-white/10"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-5">
              <p className="text-sm opacity-70">Pending</p>
              <p className="text-3xl font-bold">{stats.pendingEnquiries}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-5">
              <p className="text-sm opacity-70">Replied</p>
              <p className="text-3xl font-bold">{stats.repliedEnquiries}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-5">
              <p className="text-sm opacity-70">Read</p>
              <p className="text-3xl font-bold">{stats.readEnquiries}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-slate-400">
              <th className="py-4 px-3">Customer</th>
              <th className="py-4 px-3">Email</th>
              <th className="py-4 px-3">Subject</th>
              <th className="py-4 px-3">Status</th>
              <th className="py-4 px-3">Received</th>
              <th className="py-4 px-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-400">
                  Loading enquiries...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-red-400">
                  {error}
                </td>
              </tr>
            ) : enquiries.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-400">
                  No enquiries found.
                </td>
              </tr>
            ) : (
              enquiries.map((enquiry) => (
                <tr key={enquiry.id} className="border-b border-white/10">
                  <td className="py-4 px-3 font-medium text-white">
                    {enquiry.name}
                  </td>
                  <td className="py-4 px-3 text-slate-300">{enquiry.email}</td>
                  <td className="py-4 px-3 text-slate-300">
                    {enquiry.subject}
                  </td>
                  <td className="py-4 px-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[enquiry.status] || "bg-slate-700 text-white"}`}
                    >
                      {enquiry.status}
                    </span>
                  </td>
                  <td className="py-4 px-3 text-slate-300">
                    {formattedDate(enquiry.createdAt)}
                  </td>
                  <td className="py-4 px-3">
                    <Link
                      to={`/admin/dashboard/enquiries/${enquiry.id}`}
                      className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
                    >
                      <Eye className="w-4 h-4" /> View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 items-center justify-between rounded-3xl border border-white/10 bg-slate-950/80 p-4 sm:flex-row">
        <p className="text-sm opacity-70">
          Page {pagination.page} of {pagination.totalPages}
        </p>
        <div className="inline-flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page <= 1}
            onClick={() =>
              updateSearchParams({ page: pagination.page - 1, search, status })
            }
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page >= pagination.totalPages}
            onClick={() =>
              updateSearchParams({ page: pagination.page + 1, search, status })
            }
          >
            Next <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Enquiries;
