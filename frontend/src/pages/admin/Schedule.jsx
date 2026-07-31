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

const stats = [
  { label: "Total Classes", value: 12, bg: "bg-red-500", Icon: Users },
  { label: "Published", value: 5, bg: "bg-amber-400", Icon: Upload },
  { label: "Draft", value: 8, bg: "bg-green-500", Icon: PenSquare },
];

const classes = [
  {
    id: 1,
    name: "Adult Kick boxing",
    level: "All levels",
    instructor: "David Lee",
    schedule: "Thu 7:00PM",
    capacity: "20/20",
    status: "Active",
    published: true,
  },
  {
    id: 2,
    name: "Adult Kick boxing",
    level: "All levels",
    instructor: "David Lee",
    schedule: "Thu 7:00PM",
    capacity: "20/20",
    status: "Inactive",
    published: false,
  },
  {
    id: 3,
    name: "Karate Beginners",
    level: "Beginner",
    instructor: "Coach Mark",
    schedule: "Mon 6:00PM",
    capacity: "15/20",
    status: "Active",
    published: true,
  },
  {
    id: 4,
    name: "Judo Intermediate",
    level: "Intermediate",
    instructor: "Sensei Lisa",
    schedule: "Tue 5:00PM",
    capacity: "10/15",
    status: "Active",
    published: true,
  },
  {
    id: 5,
    name: "Muay Thai Advanced",
    level: "Advanced",
    instructor: "Coach Ryan",
    schedule: "Wed 8:00PM",
    capacity: "12/12",
    status: "Inactive",
    published: false,
  },
  {
    id: 6,
    name: "Kids Karate",
    level: "All levels",
    instructor: "Coach Mark",
    schedule: "Sat 10:00AM",
    capacity: "18/20",
    status: "Active",
    published: true,
  },
];

const Schedule = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState(null);

  const filterRef = useRef(null);
  const sortRef = useRef(null);

  const itemsPerPage = 5;

  const filterOptions = [
    "All Levels",
    "Beginner",
    "Intermediate",
    "Standard",
    "Active",
    "Inactive",
  ];

  const sortOptions = [
    { label: "Class Name (A–Z)", key: "name" },
    { label: "Instructor (A–Z)", key: "instructor" },
  ];

  const removeFilter = (filter) => {
    setActiveFilters((filters) => filters.filter((f) => f !== filter));
  };

  const toggleFilter = (option) => {
    setActiveFilters((filters) =>
      filters.includes(option)
        ? filters.filter((f) => f !== option)
        : [...filters, option],
    );
  };

  const filteredClasses = classes
    .filter((c) =>
      activeFilters.every(
        (filter) =>
          filter.toLowerCase() === c.level.toLowerCase() ||
          filter.toLowerCase() === c.status.toLowerCase(),
      ),
    )
    .filter((c) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;
      return (
        c.name.toLowerCase().includes(query) ||
        c.instructor.toLowerCase().includes(query)
      );
    });

  const sortedClasses = sortBy
    ? [...filteredClasses].sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
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
  }, [activeFilters, searchQuery, sortBy]);

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
        {stats.map(({ label, value, bg, Icon }) => (
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
        <div className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 flex-1 min-w-[240px]">
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
                    type="checkbox"
                    checked={activeFilters.includes(option)}
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
          {activeFilters.map((filter) => (
            <span
              key={filter}
              className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1"
            >
              {filter}
              <X
                className="w-3.5 h-3.5 cursor-pointer"
                onClick={() => removeFilter(filter)}
              />
            </span>
          ))}
        </div>
        <button
          onClick={() => setActiveFilters([])}
          className="flex items-center gap-1 text-red-500 text-sm font-medium"
        >
          Clear All <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Table */}
      <div className="border border-gray-300 rounded-xl overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-300 text-left">
              <th className="px-4 py-3 font-semibold">Class</th>
              <th className="px-4 py-3 font-semibold">Level</th>
              <th className="px-4 py-3 font-semibold">Instructor</th>
              <th className="px-4 py-3 font-semibold">Schedule</th>
              <th className="px-4 py-3 font-semibold">Capacity</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Publish</th>
              <th className="px-4 py-3 font-semibold">Edit</th>
              <th className="px-4 py-3 font-semibold">Delete</th>
            </tr>
          </thead>
          <tbody>
            {paginatedClasses.length === 0 ? (
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
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3">{c.level}</td>
                  <td className="px-4 py-3">{c.instructor}</td>
                  <td className="px-4 py-3">{c.schedule}</td>
                  <td className="px-4 py-3">{c.capacity}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        c.status === "Active"
                          ? "text-green-600 font-semibold"
                          : "text-red-500 font-semibold"
                      }
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        c.published
                          ? "text-green-600 font-semibold"
                          : "text-red-500 font-semibold"
                      }
                    >
                      {c.published ? "Yes" : "No"}
                    </span>
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
                    <button aria-label="Delete">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
