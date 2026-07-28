import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Button from "../../components/Button";
import { getAllBlogs } from "../../services/blogService";

const fallbackImage = "https://placehold.co/600x600?text=DoBu+Blog";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getAllBlogs({ page: activePage, limit: 6 });
        setPosts(response.data || []);
        setPagination(
          response.pagination || {
            page: activePage,
            limit: 6,
            total: 0,
            totalPages: 1,
          },
        );
      } catch (err) {
        console.error("Failed to load blogs", err);
        setPosts([]);
        setError("We couldn’t load the latest blog posts right now.");
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, [activePage]);

  const featuredPost = posts[0] || null;

  const formatDate = (dateString) => {
    if (!dateString) return "";

    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getExcerpt = (post) => {
    if (post.summary) return post.summary;
    if (post.content) {
      const plainText = post.content.replace(/<[^>]*>/g, " ").trim();
      return plainText.slice(0, 180) + (plainText.length > 180 ? "..." : "");
    }
    return "Read this article to discover more about our martial arts community.";
  };

  return (
    <div className="w-6xl mx-auto px-4">
      <section className="text-center py-16">
        <h1 className="font-['Poppins'] font-bold text-5xl md:text-6xl leading-tight uppercase mb-6">
          Insights and Inspiration, Explore Our Blog
        </h1>
        <p className="opacity-90 max-w-2xl mx-auto">
          Dive into expert tips, training guides, and inspiring stories to
          elevate your martial arts journey.
        </p>
      </section>

      <section className="pb-16">
        {loading ? (
          <div className="rounded-2xl bg-white/10 p-8 text-center text-white/80">
            Loading latest posts...
          </div>
        ) : error ? (
          <div className="rounded-2xl bg-white/10 p-8 text-center text-white/80">
            {error}
          </div>
        ) : featuredPost ? (
          <div className="bg-white text-gray-900 rounded-2xl grid md:grid-cols-2 gap-8 p-6 items-center">
            <img
              src={featuredPost.imageUrl || fallbackImage}
              alt={featuredPost.title}
              className="rounded-xl object-cover w-full h-full max-h-100"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 mb-3">
                Featured Post
              </p>
              <h2 className="font-['Poppins'] font-bold text-3xl mb-2">
                {featuredPost.title}
              </h2>
              <p className="text-teal-500 font-semibold mb-4">
                {featuredPost.author?.name || "DoBu Team"}
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                {getExcerpt(featuredPost)}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {featuredPost.createdAt ? (
                  <span className="text-sm text-gray-500">
                    {formatDate(featuredPost.createdAt)}
                  </span>
                ) : null}
                <Link to={`/blog/${featuredPost.slug}`}>
                  <Button variant="primary">Read More</Button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-white/10 p-8 text-center text-white/80">
            No published blog posts are available yet.
          </div>
        )}
      </section>

      <section className="pb-16">
        <div className="flex items-center justify-center gap-6 mb-10">
          <hr className="w-24 border-t border-amber-400" />
          <h2 className="font-['Poppins'] text-4xl font-semibold">
            Latest Insights
          </h2>
          <hr className="w-24 border-t border-amber-400" />
        </div>

        {!loading && posts.length === 0 ? (
          <div className="rounded-2xl bg-white/10 p-8 text-center text-white/80">
            There are no blog posts to display right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white text-gray-900 rounded-xl overflow-hidden"
              >
                <img
                  src={post.imageUrl || fallbackImage}
                  alt={post.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-5">
                  <h4 className="font-['Poppins'] font-bold text-lg mb-2">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    {getExcerpt(post)}
                  </p>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-gray-500 text-xs font-semibold uppercase"
                  >
                    Read More &gt;&gt;
                  </Link>
                  <hr className="border-gray-200 mt-3" />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-amber-400/20 flex items-center justify-center text-[10px] font-semibold text-gray-700">
                        {post.author?.name?.charAt(0) || "D"}
                      </div>
                      <span className="text-xs text-gray-700">
                        {post.author?.name || "DoBu Team"}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {pagination.totalPages > 1 ? (
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => setActivePage((page) => Math.max(1, page - 1))}
              className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center hover:border-amber-400 transition-colors"
              aria-label="Previous"
              disabled={activePage === 1}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setActivePage(page)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                    activePage === page
                      ? "bg-amber-400 text-gray-900"
                      : "border border-white/40 text-white/80"
                  }`}
                >
                  PAGE {String(page).padStart(2, "0")}
                </button>
              ),
            )}

            <button
              onClick={() =>
                setActivePage((page) =>
                  Math.min(pagination.totalPages, page + 1),
                )
              }
              className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center hover:border-amber-400 transition-colors"
              aria-label="Next"
              disabled={activePage === pagination.totalPages}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default Blog;
