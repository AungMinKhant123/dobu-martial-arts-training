import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Button from "../../components/Button";
import {
  deleteAdminBlog,
  getAdminBlogStatistics,
  getAdminBlogs,
  publishAdminBlog,
  unpublishAdminBlog,
} from "../../services/adminBlogService";

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
];

const Blogs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "all");
  const [page, setPage] = useState(Number(searchParams.get("page") || 1) || 1);
  const [blogs, setBlogs] = useState([]);
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedStatus = useMemo(() => {
    if (status === "published") return true;
    if (status === "draft") return false;
    return undefined;
  }, [status]);

  useEffect(() => {
    const nextPage = Number(searchParams.get("page")) || 1;
    setPage(nextPage);
    setSearch(searchParams.get("search") || "");
    setStatus(searchParams.get("status") || "all");
  }, [searchParams]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getAdminBlogStatistics();
        setStats(data);
      } catch (err) {
        console.error("Unable to load blog statistics", err);
      }
    };

    const loadBlogs = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getAdminBlogs({
          page,
          limit: 10,
          search: search || undefined,
          isPublished: selectedStatus,
          sortBy: "createdAt",
          sortOrder: "desc",
        });
        setBlogs(response.data || []);
        setPagination({
          page: response.page || page,
          totalPages: response.totalPages || 1,
        });
      } catch (err) {
        console.error("Failed to load blog posts", err);
        setBlogs([]);
        setError(err.message || "Could not load blog posts.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
    loadBlogs();
  }, [page, selectedStatus, search]);

  const updateSearchParams = (nextParams) => {
    setSearchParams(
      {
        page: String(nextParams.page || 1),
        search: nextParams.search || "",
        status: nextParams.status || "all",
      },
      { replace: true },
    );
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    updateSearchParams({ page: 1, search, status });
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    updateSearchParams({ page: 1, search, status: value });
  };

  const handlePageChange = (nextPage) => {
    updateSearchParams({ page: nextPage, search, status });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog post?")) return;
    try {
      setLoading(true);
      await deleteAdminBlog(id);
      updateSearchParams({ page, search, status });
    } catch (err) {
      console.error("Unable to delete blog", err);
      setError(err.message || "Failed to delete blog.");
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (blog) => {
    try {
      setLoading(true);
      if (blog.isPublished) {
        await unpublishAdminBlog(blog.id);
      } else {
        await publishAdminBlog(blog.id);
      }
      updateSearchParams({ page, search, status });
    } catch (err) {
      console.error("Unable to update publish state", err);
      setError(err.message || "Failed to update blog status.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (value) => {
    if (!value) return "-";
    return new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase opacity-60 mb-3">
          Blog & Content Management
        </p>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Blog & Content Management</h1>
            <p className="text-sm opacity-70 mt-1">
              Manage posts, publish status, and featured content.
            </p>
          </div>
          <Link to="/admin/dashboard/blogs/new">
            <Button variant="accent" className="inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Post
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
          <p className="text-sm opacity-70 mb-4">Total Posts</p>
          <p className="text-4xl font-bold">{stats.totalBlogs}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
          <p className="text-sm opacity-70 mb-4">Published</p>
          <p className="text-4xl font-bold">{stats.publishedBlogs}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
          <p className="text-sm opacity-70 mb-4">Draft</p>
          <p className="text-4xl font-bold">{stats.draftBlogs}</p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
        <form
          onSubmit={handleSearchSubmit}
          className="grid gap-4 md:grid-cols-[1.7fr_1fr_1fr]"
        >
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search blog title or author..."
              className="w-full rounded-2xl border border-white/10 bg-slate-950/90 py-3 pl-11 pr-4 text-sm outline-none focus:border-amber-400"
            />
          </div>
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-950/90 py-3 px-4 text-sm outline-none focus:border-amber-400"
          >
            {statusOptions.map((option) => (
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

      <div className="rounded-3xl border border-white/10 bg-slate-950/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="bg-slate-950/90 text-slate-300">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Published</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-slate-950/80 text-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-400">
                    Loading blog posts...
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-400">
                    {error || "No blog posts found."}
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 max-w-xl overflow-hidden text-ellipsis whitespace-nowrap">
                      {blog.title}
                    </td>
                    <td className="px-6 py-4">
                      {blog.author?.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          blog.isPublished
                            ? "bg-emerald-500/15 text-emerald-300"
                            : "bg-slate-700/50 text-slate-200"
                        }`}
                      >
                        {blog.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(blog.publishedAt)}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <Link to={`/admin/dashboard/blogs/${blog.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="px-3 py-1.5"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleTogglePublish(blog)}
                        className="px-3 py-1.5"
                      >
                        {blog.isPublished ? (
                          <Clock className="w-4 h-4" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(blog.id)}
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

      {pagination.totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          {Array.from(
            { length: pagination.totalPages },
            (_, index) => index + 1,
          ).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => handlePageChange(pageNumber)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                pageNumber === page
                  ? "bg-amber-400 text-slate-900"
                  : "border border-white/10 text-slate-200"
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handlePageChange(Math.min(pagination.totalPages, page + 1))
            }
            disabled={page === pagination.totalPages}
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Blogs;
