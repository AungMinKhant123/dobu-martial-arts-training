import { useState } from "react";
import { Heart, ArrowLeft, ArrowRight } from "lucide-react";
import Button from "../../components/Button";

const featuredPost = {
  title: "Post Title",
  author: "Author",
  excerpt:
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur. Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
  image: "https://placehold.co/600x600?text=Featured+Post",
};

const postPages = [
  [
    {
      title: "Post Title",
      excerpt:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
      image: "https://placehold.co/400x300?text=Post+1",
      author: "Joey Kenely",
      avatar: "https://placehold.co/40x40?text=JK",
      likes: null,
    },
    {
      title: "Post Title",
      excerpt:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
      image: "https://placehold.co/400x300?text=Post+2",
      author: "Joey Kenely",
      avatar: "https://placehold.co/40x40?text=JK",
      likes: 1129,
    },
    {
      title: "Post Title",
      excerpt:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
      image: "https://placehold.co/400x300?text=Post+3",
      author: "Joey Kenely",
      avatar: "https://placehold.co/40x40?text=JK",
      likes: 1129,
    },
    {
      title: "Post Title",
      excerpt:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
      image: "https://placehold.co/400x300?text=Post+4",
      author: "Joey Kenely",
      avatar: "https://placehold.co/40x40?text=JK",
      likes: 1129,
    },
    {
      title: "Post Title",
      excerpt:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
      image: "https://placehold.co/400x300?text=Post+5",
      author: "Joey Kenely",
      avatar: "https://placehold.co/40x40?text=JK",
      likes: 1129,
    },
    {
      title: "Post Title",
      excerpt:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
      image: "https://placehold.co/400x300?text=Post+6",
      author: "Joey Kenely",
      avatar: "https://placehold.co/40x40?text=JK",
      likes: 1129,
    },
  ],
  Array.from({ length: 6 }).map((_, i) => ({
    title: "Post Title",
    excerpt:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
    image: `https://placehold.co/400x300?text=Post+${i + 7}`,
    author: "Joey Kenely",
    avatar: "https://placehold.co/40x40?text=JK",
  })),
  Array.from({ length: 6 }).map((_, i) => ({
    title: "Post Title",
    excerpt:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
    image: `https://placehold.co/400x300?text=Post+${i + 13}`,
    author: "Joey Kenely",
    avatar: "https://placehold.co/40x40?text=JK",
  })),
];

const Blog = () => {
  const [activeTab, setActiveTab] = useState(0);
  const posts = postPages[activeTab];

  return (
    <div className="w-6xl mx-auto px-4">
      {/* Hero */}
      <section className="text-center py-16">
        <h1 className="font-['Poppins'] font-bold text-5xl md:text-6xl leading-tight uppercase mb-6">
          Insights and Inspiration, Explore Our Blog
        </h1>
        <p className="opacity-90 max-w-2xl mx-auto">
          Dive into expert tips, training guides, and inspiring stories to
          elevate your martial arts journey.
        </p>
      </section>

      {/* Featured Post */}
      <section className="pb-16">
        <div className="bg-white text-gray-900 rounded-2xl grid md:grid-cols-2 gap-8 p-6 items-center">
          <img
            src={featuredPost.image}
            alt={featuredPost.title}
            className="rounded-xl object-cover w-full h-full max-h-[400px]"
          />
          <div>
            <h2 className="font-['Poppins'] font-bold text-3xl mb-2">
              {featuredPost.title}
            </h2>
            <p className="text-teal-500 font-semibold mb-4">
              {featuredPost.author}
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              {featuredPost.excerpt}
            </p>
            <Button variant="primary">Read More</Button>
          </div>
        </div>
      </section>

      {/* Latest Insights */}
      <section className="pb-16">
        <div className="flex items-center justify-center gap-6 mb-10">
          <hr className="w-24 border-t border-amber-400" />
          <h2 className="font-['Poppins'] text-4xl font-semibold">
            Latest Insights
          </h2>
          <hr className="w-24 border-t border-amber-400" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white text-gray-900 rounded-xl overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-5">
                <h4 className="font-['Poppins'] font-bold text-lg mb-2">
                  {post.title}
                </h4>
                <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>

                <a
                  href="#"
                  className="text-gray-500 text-xs font-semibold uppercase"
                >
                  Read More &gt;&gt;
                </a>
                <hr className="border-gray-200 mt-3" />
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs text-gray-700">{post.author}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={() => setActiveTab((t) => Math.max(0, t - 1))}
            className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center hover:border-amber-400 transition-colors"
            aria-label="Previous"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {postPages.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                activeTab === i
                  ? "bg-amber-400 text-gray-900"
                  : "border border-white/40 text-white/80"
              }`}
            >
              TAB {String(i + 1).padStart(2, "0")}
            </button>
          ))}

          <button
            onClick={() =>
              setActiveTab((t) => Math.min(postPages.length - 1, t + 1))
            }
            className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center hover:border-amber-400 transition-colors"
            aria-label="Next"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Blog;
