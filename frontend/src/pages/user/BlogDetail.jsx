import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { getBlogBySlug } from "../../services/blogService";

const fallbackImage = "https://placehold.co/1200x700?text=DoBu+Blog";

const formatDate = (dateString) => {
  if (!dateString) return "";

  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getBlogBySlug(slug);
        setPost(data);
      } catch (err) {
        console.error("Failed to load blog post", err);
        setError("The blog post could not be found or could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center text-white/80">
        Loading article...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <p className="text-red-300 mb-6">{error || "Blog post not found."}</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-amber-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to blog
        </Link>
      </div>
    );
  }

  const content = post.content || "";
  const formattedContent = content
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .trim();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-amber-400 mb-8 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back to blog
      </Link>

      <article className="bg-white text-gray-900 rounded-3xl overflow-hidden shadow-2xl">
        <img
          src={post.imageUrl || fallbackImage}
          alt={post.title}
          className="w-full h-80 md:h-107.5 object-cover"
        />

        <div className="p-8 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-600 mb-4">
            {post.author?.name || "DoBu Team"}
          </p>
          <h1 className="font-['Poppins'] font-bold text-3xl md:text-4xl leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8">
            {post.createdAt ? <span>{formatDate(post.createdAt)}</span> : null}
            {post.summary ? <span>•</span> : null}
            {post.summary ? <span>{post.summary}</span> : null}
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line leading-8">
            {formattedContent ||
              post.summary ||
              "No article content available yet."}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
