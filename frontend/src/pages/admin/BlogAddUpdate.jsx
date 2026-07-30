import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Upload, Save, Loader2 } from "lucide-react";
import Button from "../../components/Button";
import {
  createAdminBlog,
  getAdminBlogById,
  updateAdminBlog,
} from "../../services/adminBlogService";

const BlogAddUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditMode) return;

    const loadBlog = async () => {
      try {
        setLoading(true);
        const blog = await getAdminBlogById(id);
        setTitle(blog.title || "");
        setSummary(blog.summary || "");
        setContent(blog.content || "");
        setIsPublished(Boolean(blog.isPublished));
        setPreviewImage(blog.imageUrl || null);
      } catch (err) {
        console.error("Failed to load blog", err);
        setError(err.message || "Unable to load blog details.");
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [id, isEditMode]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim()) {
      setError("Blog title is required.");
      return;
    }
    if (!content.trim()) {
      setError("Blog content is required.");
      return;
    }
    if (!isEditMode && !imageFile) {
      setError("A featured image is required for new blog posts.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      if (isEditMode) {
        await updateAdminBlog(id, {
          title,
          summary,
          content,
          isPublished,
          imageFile,
        });
      } else {
        await createAdminBlog({
          title,
          summary,
          content,
          isPublished,
          imageFile,
        });
      }
      navigate("/admin/dashboard/blogs");
    } catch (err) {
      console.error("Blog save failed", err);
      setError(err.message || "Unable to save blog post.");
    } finally {
      setLoading(false);
    }
  };

  const headerText = isEditMode
    ? `Editing - ${title || "Blog post"}`
    : "Create New Blog Post";

  const togglePublish = () => setIsPublished((prev) => !prev);

  const renderPreview = useMemo(() => {
    if (!previewImage) return "Upload image to preview";
    return (
      <img
        src={previewImage}
        alt="Blog preview"
        className="h-full w-full object-cover rounded-xl"
      />
    );
  }, [previewImage]);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase opacity-60 mb-3">
          Blog & Content Management
        </p>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">{headerText}</h1>
            <p className="text-sm opacity-70 mt-1">
              {isEditMode
                ? "Update the blog content, status, and featured image."
                : "Add a new blog post for your admin dashboard."}
            </p>
          </div>
          <Button
            variant="outline"
            className="inline-flex items-center gap-2"
            onClick={() => navigate("/admin/dashboard/blogs")}
          >
            <ArrowLeft className="w-4 h-4" /> Back to posts
          </Button>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-4 text-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog title"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200">
              Summary
            </label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Short summary for the blog post"
              rows={3}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write the content of the blog post here"
              rows={10}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.8fr_1fr]">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">
                Featured Image
              </label>
              <label className="group flex h-60 w-full cursor-pointer items-center justify-center rounded-3xl border border-dashed border-white/20 bg-slate-950/80 p-4 text-center text-slate-400 transition hover:border-amber-400">
                {renderPreview}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/80 p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-100">
                    Publish status
                  </p>
                  <p className="text-xs opacity-70">
                    {isPublished ? "Visible on site" : "Saved as draft"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={togglePublish}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isPublished
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-slate-800 text-slate-100"
                  }`}
                >
                  {isPublished ? "Published" : "Draft"}
                </button>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-300">
                Upload a featured image to show in the blog list and detail
                views.
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate("/admin/dashboard/blogs")}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button variant="accent" type="submit" className="w-full sm:w-auto">
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  {isEditMode ? "Save Changes" : "Publish"}
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogAddUpdate;
