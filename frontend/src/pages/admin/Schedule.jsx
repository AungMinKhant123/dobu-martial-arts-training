import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import {
  Plus,
  Users,
  Upload,
  PenSquare,
  Search,
  ListFilter,
  ArrowUpDown,
  X,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  deleteAdminClass,
  getAdminClassStatistics,
  getAdminClasses,
  publishAdminClass,
  unpublishAdminClass,
} from "../../services/adminClassService";

const initialStats = {
  totalClasses: 0,
  publishedClasses: 0,
  unpublishedClasses: 0,
};

const Schedule = () => {
  const [classes, setClasses] = useState([]);
  const [stats, setStats] = useState(initialStats);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const filterRef = useRef(null);
  const sortRef = useRef(null);

  const itemsPerPage = 5;

  const filterOptions = [
    "BEGINNER",
    "INTERMEDIATE",
    "ADVANCED",
    "ACTIVE",
    "INACTIVE",
  ];

  const sortOptions = [
    { label: "Class Name (A–Z)", key: "title" },
    { label: "Instructor (A–Z)", key: "instructor" },
  ];

  const removeFilter = () => {
    setActiveFilter(null);
  };

  const toggleFilter = (option) => {
    setActiveFilter((current) => (current === option ? null : option));
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");
        const [statsResponse, classesResponse] = await Promise.all([
          getAdminClassStatistics(),
          getAdminClasses({ page: 1, limit: 100 }),
        ]);
        setStats({
          totalClasses: statsResponse.totalClasses ?? 0,
          publishedClasses: statsResponse.publishedClasses ?? 0,
          unpublishedClasses: statsResponse.unpublishedClasses ?? 0,
        });
        const apiClasses = Array.isArray(classesResponse?.data)
          ? classesResponse.data
          : [];
        setClasses(apiClasses);
      } catch (err) {
        console.error("Failed to load admin classes", err);
        setError(err.message || "Unable to load classes.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredClasses = classes.filter((c) => {
    if (activeFilter) {
      const normalizedFilter = activeFilter.toLowerCase();
      const level = c.level?.toLowerCase();
      const status = c.isActive ? "active" : "inactive";
      if (level !== normalizedFilter && status !== normalizedFilter) {
        return false;
      }
    }

    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    return (
      c.title?.toLowerCase().includes(query) ||
      c.instructor?.name?.toLowerCase().includes(query)
    );
  });

  const sortedClasses = sortBy
    ? [...filteredClasses].sort((a, b) => {
        if (sortBy === "title") {
          return (a.title || "").localeCompare(b.title || "");
        }
        return (a.instructor?.name || "").localeCompare(
          b.instructor?.name || "",
        );
      })
    : filteredClasses;

  const totalPages = Math.max(
    1,
    Math.ceil(sortedClasses.length / itemsPerPage),
  );

  const paginatedClasses = sortedClasses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery, sortBy]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this class?")) return;
    try {
      setLoading(true);
      await deleteAdminClass(id);
      setClasses((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Unable to delete class", err);
      setError(err.message || "Failed to delete class.");
    } finally {
      setLoading(false);
    }
  };

  const handlePublishToggle = async (classItem) => {
    if (!classItem?.id) return;
    try {
      setLoading(true);
      setError("");
      const updatedClass = classItem.isPublished
        ? await unpublishAdminClass(classItem.id)
        : await publishAdminClass(classItem.id);
      setClasses((prev) =>
        prev.map((item) =>
          item.id === classItem.id
            ? {
                ...item,
                isPublished:
                  updatedClass?.isPublished ?? !classItem.isPublished,
              }
            : item,
        ),
      );
    } catch (err) {
      console.error("Unable to update publish status", err);
      setError(err.message || "Failed to update publish status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <p className="text-xs opacity-70 mb-4">Classes & schedules</p>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-bold text-3xl">Classes & Schedules Management</h1>
        <Link
          to="/admin/dashboard/schedules/new"
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> Add new class
        </Link>
      </div>

      {/* Stats cards */}
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {[
          {
            label: "Total Classes",
            value: stats.totalClasses,
            bg: "bg-red-500",
            Icon: Users,
          },
          {
            label: "Published",
            value: stats.publishedClasses,
            bg: "bg-amber-400",
            Icon: Upload,
          },
          {
            label: "Draft",
            value: stats.unpublishedClasses,
            bg: "bg-green-500",
            Icon: PenSquare,
          },
        ].map(({ label, value, bg, Icon }) => (
          <div
            key={label}
            className="border border-gray-300 rounded-xl px-8 py-6 flex items-center gap-4"
          >
            <div
              className={`w-14 h-14 rounded-full ${bg} flex items-center justify-center shrink-0`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm opacity-70">{label}</p>
              <p className="text-2xl font-bold">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search / Filter / Sort */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 flex-1 min-w-60">
          <Search className="w-4 h-4 opacity-60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search By Class Name or Instructor..."
            className="bg-transparent w-full text-sm focus:outline-none placeholder-gray-400"
          />
        </div>
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => {
              setFilterOpen((open) => !open);
              setSortOpen(false);
            }}
            className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium"
          >
            <ListFilter className="w-4 h-4" /> Filter
          </button>
          {filterOpen && (
            <div className="absolute top-full mt-2 right-0 border border-gray-300 rounded-lg bg-(--bg-color) shadow-lg p-3 text-sm w-48 z-10">
              {filterOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 py-1.5 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="filter"
                    checked={activeFilter === option}
                    onChange={() => toggleFilter(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>
        <div className="relative" ref={sortRef}>
          <button
            onClick={() => {
              setSortOpen((open) => !open);
              setFilterOpen(false);
            }}
            className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium"
          >
            <ArrowUpDown className="w-4 h-4" /> Sort By
          </button>
          {sortOpen && (
            <div className="absolute top-full mt-2 right-0 border border-gray-300 rounded-lg bg-(--bg-color) shadow-lg p-3 text-sm w-48 z-10">
              {sortOptions.map((option) => (
                <label
                  key={option.key}
                  className="flex items-center gap-2 py-1.5 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="sortBy"
                    checked={sortBy === option.key}
                    onChange={() => setSortBy(option.key)}
                  />
                  {option.label}
                </label>
              ))}
              <button
                onClick={() => setSortBy(null)}
                className="text-xs text-red-500 mt-2"
              >
                Clear Sort
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Active filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 text-sm">
          <span className="opacity-70">Active Filters:</span>
          {activeFilter && (
            <span className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1">
              {activeFilter}
              <X
                className="w-3.5 h-3.5 cursor-pointer"
                onClick={removeFilter}
              />
            </span>
          )}
        </div>
        <button
          onClick={() => setActiveFilter(null)}
          className="flex items-center gap-1 text-red-500 text-sm font-medium"
        >
          Clear All <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Table */}
      <div className="border border-gray-300 rounded-xl overflow-hidden mb-8">
        {error ? (
          <div className="px-4 py-6 text-sm text-red-500">{error}</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300 text-left">
                <th className="px-4 py-3 font-semibold">Class</th>
                <th className="px-4 py-3 font-semibold">Level</th>
                <th className="px-4 py-3 font-semibold">Instructor</th>
                <th className="px-4 py-3 font-semibold">Duration</th>
                <th className="px-4 py-3 font-semibold">Capacity</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Publish</th>
                <th className="px-4 py-3 font-semibold">Edit</th>
                <th className="px-4 py-3 font-semibold">Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center opacity-70">
                    Loading classes...
                  </td>
                </tr>
              ) : paginatedClasses.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center opacity-70">
                    No classes found.
                  </td>
                </tr>
              ) : (
                paginatedClasses.map((c, index) => (
                  <tr
                    key={c.id}
                    className={
                      index !== paginatedClasses.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }
                  >
                    <td className="px-4 py-3 font-medium">{c.title}</td>
                    <td className="px-4 py-3">{c.level}</td>
                    <td className="px-4 py-3">{c.instructor?.name || "-"}</td>
                    <td className="px-4 py-3">
                      {c.duration ? `${c.duration} min` : "-"}
                    </td>
                    <td className="px-4 py-3">{c.capacity}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          c.isActive
                            ? "text-green-600 font-semibold"
                            : "text-red-500 font-semibold"
                        }
                      >
                        {c.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handlePublishToggle(c)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                          c.isPublished
                            ? "bg-green-600 text-white"
                            : "bg-amber-500 text-slate-950"
                        }`}
                      >
                        {c.isPublished ? "Public" : "Make Public"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/admin/dashboard/schedules/${c.id}`}
                        aria-label="Edit"
                      >
                        <PenSquare className="w-4 h-4" />
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        aria-label="Delete"
                        onClick={() => handleDelete(c.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentPage === page
                  ? "bg-red-500 text-white"
                  : "border border-gray-300"
              }`}
            >
              {page}
            </button>
          );
        })}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Schedule;
