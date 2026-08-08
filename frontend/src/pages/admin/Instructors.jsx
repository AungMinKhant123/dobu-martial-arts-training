import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Search, Plus, Edit3, Trash2 } from "lucide-react";
import Button from "../../components/Button";
import {
  deleteAdminInstructor,
  getAdminInstructors,
} from "../../services/adminInstructorService";

const beltLevelOptions = [
  { value: "", label: "All Levels" },
  { value: "WHITE", label: "White" },
  { value: "YELLOW", label: "Yellow" },
  { value: "ORANGE", label: "Orange" },
  { value: "GREEN", label: "Green" },
  { value: "BLUE", label: "Blue" },
  { value: "PURPLE", label: "Purple" },
  { value: "BROWN", label: "Brown" },
  { value: "BLACK", label: "Black" },
];

const Instructors = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [beltLevel, setBeltLevel] = useState(
    searchParams.get("beltLevel") || "",
  );
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));
  const [instructors, setInstructors] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setBeltLevel(searchParams.get("beltLevel") || "");
    setPage(Number(searchParams.get("page") || 1));
  }, [searchParams]);

  useEffect(() => {
    const loadInstructors = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getAdminInstructors({
          page,
          limit: 10,
          search: search || undefined,
          beltLevel: beltLevel || undefined,
          sortBy: "createdAt",
          sortOrder: "desc",
        });
        setInstructors(response.data || []);
        setPagination({
          page: response.pagination?.page || 1,
          totalPages: response.pagination?.totalPages || 1,
        });
      } catch (err) {
        console.error("Failed to load instructors", err);
        setError(err.message || "Unable to load instructors.");
        setInstructors([]);
        setPagination({ page: 1, totalPages: 1 });
      } finally {
        setLoading(false);
      }
    };

    loadInstructors();
  }, [page, search, beltLevel]);

  const updateSearchParams = (nextParams) => {
    setSearchParams(
      {
        page: String(nextParams.page || 1),
        search: nextParams.search || "",
        beltLevel: nextParams.beltLevel || "",
      },
      { replace: true },
    );
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    updateSearchParams({ page: 1, search, beltLevel });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this instructor?")) return;
    try {
      setLoading(true);
      await deleteAdminInstructor(id);
      updateSearchParams({ page, search, beltLevel });
    } catch (err) {
      console.error("Unable to delete instructor", err);
      setError(err.message || "Failed to delete instructor.");
    } finally {
      setLoading(false);
    }
  };

  const pageNumbers = useMemo(() => {
    return Array.from(
      { length: pagination.totalPages },
      (_, index) => index + 1,
    );
  }, [pagination.totalPages]);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase opacity-60 mb-3">
          Instructor Management
        </p>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Instructor Management</h1>
            <p className="text-sm opacity-70 mt-1">
              Manage instructors, their experience, and qualifications.
            </p>
          </div>
          <Link to="/admin/dashboard/instructors/new">
            <Button variant="accent" className="inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add new Instructor
            </Button>
          </Link>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
        <form
          onSubmit={handleSearchSubmit}
          className="grid gap-4 md:grid-cols-[1.8fr_1fr_1fr]"
        >
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by instructor name or email..."
              className="w-full rounded-2xl border border-white/10 bg-slate-950/90 py-3 pl-11 pr-4 text-sm outline-none focus:border-amber-400"
            />
          </div>
          <select
            value={beltLevel}
            onChange={(e) => {
              setBeltLevel(e.target.value);
              updateSearchParams({
                page: 1,
                search,
                beltLevel: e.target.value,
              });
            }}
            className="rounded-2xl border border-white/10 bg-slate-950/90 py-3 px-4 text-sm outline-none focus:border-amber-400"
          >
            {beltLevelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Button variant="primary" type="submit" className="w-full">
            Search
          </Button>
        </form>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/80 px-4 py-2">
          Active Filters:
          <strong>
            {beltLevel
              ? beltLevelOptions.find((option) => option.value === beltLevel)
                  ?.label
              : "All Levels"}
          </strong>
        </span>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-950/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="bg-slate-950/90 text-slate-300">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Belt</th>
                <th className="px-6 py-4">Experience</th>
                <th className="px-6 py-4">Classes</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-slate-950/80 text-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-400">
                    Loading instructors...
                  </td>
                </tr>
              ) : instructors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-400">
                    {error || "No instructors found."}
                  </td>
                </tr>
              ) : (
                instructors.map((instructor) => (
                  <tr
                    key={instructor.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 max-w-xl overflow-hidden text-ellipsis whitespace-nowrap">
                      {instructor.name}
                    </td>
                    <td className="px-6 py-4">{instructor.beltLevel || "—"}</td>
                    <td className="px-6 py-4">
                      {instructor.experienceYears ?? 0} years
                    </td>
                    <td className="px-6 py-4">
                      {instructor._count?.classes ?? 0}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <Link
                        to={`/admin/dashboard/instructors/${instructor.id}`}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="px-3 py-1.5"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(instructor.id)}
                        className="px-3 py-1.5"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/10 bg-slate-950/80 p-4">
        <p className="text-sm text-slate-400">
          Page {pagination.page} of {pagination.totalPages}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              updateSearchParams({
                page: Math.max(pagination.page - 1, 1),
                search,
                beltLevel,
              })
            }
            disabled={pagination.page <= 1}
          >
            ‹ Prev
          </Button>
          {pageNumbers.slice(0, 5).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() =>
                updateSearchParams({ page: pageNumber, search, beltLevel })
              }
              className={`rounded-xl px-3 py-1 text-sm transition ${
                pageNumber === pagination.page
                  ? "bg-red-600 text-white"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-800"
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              updateSearchParams({
                page: Math.min(pagination.page + 1, pagination.totalPages),
                search,
                beltLevel,
              })
            }
            disabled={pagination.page >= pagination.totalPages}
          >
            Next ›
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Instructors;
