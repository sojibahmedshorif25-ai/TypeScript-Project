import Link from "next/link";

const posts = [
  {
    slug: "typescript-marketplace-benefits",
    title: "Why TypeScript is the Future of Marketplace Development",
    excerpt: "Discover how TypeScript brings type safety, better developer experience, and fewer runtime errors to marketplace platforms.",
    author: "Sharif Ahmed",
    date: "July 8, 2026",
    category: "Development",
    readTime: "5 min read",
  },
  {
    slug: "nextjs-performance-tips",
    title: "10 Performance Optimization Tips for Next.js Applications",
    excerpt: "Learn how to optimize your Next.js app for better performance, faster load times, and improved SEO.",
    author: "Fatima Khan",
    date: "July 5, 2026",
    category: "Performance",
    readTime: "7 min read",
  },
  {
    slug: "mongodb-schema-design",
    title: "Best Practices for MongoDB Schema Design in 2026",
    excerpt: "A comprehensive guide to designing efficient MongoDB schemas for scalable applications.",
    author: "Rafiq Hasan",
    date: "July 1, 2026",
    category: "Backend",
    readTime: "8 min read",
  },
  {
    slug: "tailwind-css-responsive",
    title: "Mastering Responsive Design with Tailwind CSS",
    excerpt: "Tips and tricks for building beautiful, responsive interfaces using Tailwind CSS utility classes.",
    author: "Nusrat Jahan",
    date: "June 28, 2026",
    category: "Frontend",
    readTime: "6 min read",
  },
  {
    slug: "jwt-authentication-guide",
    title: "Complete Guide to JWT Authentication in Next.js",
    excerpt: "Step-by-step tutorial on implementing secure JWT-based authentication in your Next.js application.",
    author: "Sharif Ahmed",
    date: "June 22, 2026",
    category: "Security",
    readTime: "10 min read",
  },
  {
    slug: "recharts-data-visualization",
    title: "Data Visualization with Recharts: A Practical Guide",
    excerpt: "Learn how to create stunning charts and graphs for your web application using the Recharts library.",
    author: "Fatima Khan",
    date: "June 18, 2026",
    category: "Frontend",
    readTime: "6 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Insights, tutorials, and updates from the TypeMarket team
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <span className="text-4xl font-bold text-blue-600 opacity-30 group-hover:opacity-50 transition-opacity">
                    TS
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                  <h2 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
