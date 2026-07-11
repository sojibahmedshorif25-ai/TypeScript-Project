import Link from "next/link";
import { notFound } from "next/navigation";

const posts = {
  "typescript-marketplace-benefits": {
    title: "Why TypeScript is the Future of Marketplace Development",
    content: `TypeScript has revolutionized the way we build web applications. In the context of marketplace platforms, its benefits are particularly pronounced.

<h3>Type Safety Across the Stack</h3>
<p>With TypeScript, you get end-to-end type safety. From your MongoDB models to your React components, every layer of your application is checked at compile time. This means fewer runtime errors, better autocomplete, and a more enjoyable developer experience.</p>

<h3>Better Developer Experience</h3>
<p>TypeScript's tooling is second to none. With features like intelligent code completion, refactoring support, and inline documentation, developers can be more productive and write better code. When you're building a complex marketplace with multiple models and relationships, this becomes invaluable.</p>

<h3>Scalability</h3>
<p>As your marketplace grows, TypeScript scales with it. The type system makes it easy to refactor large codebases with confidence. You can change a model definition and immediately see all the places that need to be updated.</p>

<h3>Community and Ecosystem</h3>
<p>The TypeScript ecosystem is vast and mature. From Next.js to Mongoose, from Express to React, all major frameworks and libraries have excellent TypeScript support. This means you can build your entire marketplace with full type safety.`,
    author: "Sharif Ahmed",
    date: "July 8, 2026",
    category: "Development",
  },
  "nextjs-performance-tips": {
    title: "10 Performance Optimization Tips for Next.js Applications",
    content: `<p>Next.js is already fast out of the box, but there are several optimizations you can make to squeeze out even more performance.</p>

<h3>1. Use Server Components</h3>
<p>Server Components render on the server, reducing the amount of JavaScript sent to the client. Use them for static content and data fetching.</p>

<h3>2. Optimize Images</h3>
<p>Use the Next.js Image component for automatic image optimization, lazy loading, and responsive images.</p>

<h3>3. Implement Caching</h3>
<p>Leverage Next.js built-in caching mechanisms. Use <code>cache()</code> for data fetching and <code>revalidate</code> for incremental static regeneration.</p>

<h3>4. Code Splitting</h3>
<p>Next.js automatically code-splits your application. Use dynamic imports for heavy components that aren't needed immediately.</p>

<h3>5. Minimize Bundle Size</h3>
<p>Analyze your bundle with <code>next/bundle-analyzer</code> and remove unused dependencies.</p>

<h3>6. Optimize Fonts</h3>
<p>Use next/font to automatically optimize and self-host fonts, reducing layout shift and load times.</p>

<h3>7. Streaming and Suspense</h3>
<p>Use streaming with Suspense boundaries to progressively render pages and improve perceived performance.</p>

<h3>8. Route Prefetching</h3>
<p>Next.js automatically prefetches routes in the viewport. Leverage this for instant navigation.</p>

<h3>9. Edge Runtime</h3>
<p>Deploy performance-critical routes to the Edge Runtime for faster responses globally.</p>

<h3>10. Monitor with Analytics</h3>
<p>Use tools like Vercel Analytics or Google Analytics to track real-user performance metrics and identify bottlenecks.</p>`,
    author: "Fatima Khan",
    date: "July 5, 2026",
    category: "Performance",
  },
  "mongodb-schema-design": {
    title: "Best Practices for MongoDB Schema Design in 2026",
    content: `<p>Designing efficient MongoDB schemas is crucial for application performance and scalability.</p>

<h3>1. Embed vs Reference</h3>
<p>Use embedded documents for data that is frequently read together. Use references for data that grows independently or needs to be accessed separately.</p>

<h3>2. Index Strategically</h3>
<p>Create indexes for fields used in queries, sorting, and aggregation. Use compound indexes for multi-field queries.</p>

<h3>3. Schema Validation</h3>
<p>Use Mongoose schemas with validation rules to ensure data integrity at the application level.</p>

<h3>4. Avoid Large Arrays</h3>
<p>Documents with unbounded arrays can cause performance issues. Consider using separate collections for large one-to-many relationships.</p>

<h3>5. Use Proper Data Types</h3>
<p>Choose the most appropriate data types for your fields. Use ObjectId for references, Date for timestamps, and Number for numeric values.</p>

<h3>6. Design for Query Patterns</h3>
<p>Structure your schemas based on how your application queries data, not how it's displayed.</p>

<h3>7. Implement Soft Deletes</h3>
<p>Instead of deleting documents, add an isDeleted flag to preserve data and enable recovery.</p>

<h3>8. Version Documents</h3>
<p>Use a version field to track document changes and implement optimistic concurrency control.</p>`,
    author: "Rafiq Hasan",
    date: "July 1, 2026",
    category: "Backend",
  },
  "tailwind-css-responsive": {
    title: "Mastering Responsive Design with Tailwind CSS",
    content: `<p>Tailwind CSS makes responsive design intuitive with its utility-first approach and built-in breakpoints.</p>

<h3>Understanding Breakpoints</h3>
<p>Tailwind uses mobile-first breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), and 2xl (1536px). Start with mobile styles and add larger breakpoints as needed.</p>

<h3>Responsive Grid System</h3>
<p>Use the grid utilities with responsive prefixes to create fluid layouts:</p>
<p><code>grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4</code> creates a single column on mobile, two on tablet, and four on desktop.</p>

<h3>Responsive Spacing</h3>
<p>Use responsive padding and margin utilities like <code>p-4 md:p-6 lg:p-8</code> to adjust spacing across devices.</p>

<h3>Typography Adjustments</h3>
<p>Scale text sizes responsively: <code>text-base md:text-lg lg:text-xl</code> ensures readability on all screens.</p>

<h3>Hide and Show Elements</h3>
<p>Use <code>hidden md:block</code> to show elements only on desktop, and <code>block md:hidden</code> for mobile-only content.</p>

<h3>Flexbox for Dynamic Layouts</h3>
<p>Combine <code>flex flex-col md:flex-row</code> to stack vertically on mobile and horizontally on larger screens.</p>`,
    author: "Nusrat Jahan",
    date: "June 28, 2026",
    category: "Frontend",
  },
  "jwt-authentication-guide": {
    title: "Complete Guide to JWT Authentication in Next.js",
    content: `<p>JWT (JSON Web Token) authentication is a stateless, secure way to handle user authentication in modern web applications.</p>

<h3>How JWT Works</h3>
<p>When a user logs in, the server creates a signed JWT containing user information. The client stores this token and sends it with each request. The server verifies the token without needing to query the database.</p>

<h3>Implementation Steps</h3>
<p>1. User submits credentials via login form<br/>
2. Server validates credentials and generates JWT<br/>
3. JWT is sent to client as httpOnly cookie or in response body<br/>
4. Client includes JWT in subsequent requests via Authorization header or cookie<br/>
5. Server middleware verifies JWT on protected routes</p>

<h3>Best Practices</h3>
<p>Always use httpOnly cookies for token storage to prevent XSS attacks. Set appropriate expiration times and implement token refresh mechanisms. Use environment variables for secret keys and never expose them client-side.</p>

<h3>Security Considerations</h3>
<p>Implement rate limiting on login endpoints, use HTTPS in production, and validate all user inputs. Consider implementing refresh tokens for better security and user experience.</p>`,
    author: "Sharif Ahmed",
    date: "June 22, 2026",
    category: "Security",
  },
  "recharts-data-visualization": {
    title: "Data Visualization with Recharts: A Practical Guide",
    content: `<p>Recharts is a composable charting library built on React components, making it easy to create beautiful, interactive data visualizations.</p>

<h3>Getting Started</h3>
<p>Install Recharts via npm and import the components you need. The library uses a declarative API where charts are composed of simple React components.</p>

<h3>Basic Chart Types</h3>
<p>Recharts supports various chart types including BarChart, LineChart, PieChart, AreaChart, and more. Each chart type has its own set of child components for axes, tooltips, and legends.</p>

<h3>Making Charts Interactive</h3>
<p>Add tooltips for hover details, legends for data series identification, and responsive containers for automatic sizing. Use animations to make data transitions smooth and engaging.</p>

<h3>Customization Options</h3>
<p>Customize colors, labels, grid lines, and axis formatting. Use custom shapes for data points and create personalized tooltip components.</p>

<h3>Integration with Next.js</h3>
<p>Recharts works seamlessly with Next.js. Use dynamic imports with SSR disabled for charts to avoid hydration issues, and wrap chart components in client-side rendering boundaries.</p>`,
    author: "Fatima Khan",
    date: "June 18, 2026",
    category: "Frontend",
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug as keyof typeof posts];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-blue-600">Blog</Link>
          <span>/</span>
          <span className="text-gray-900">{post.title}</span>
        </nav>

        <article className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-md">
              {post.category}
            </span>
            <span className="text-sm text-gray-500">{post.date}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {post.author.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <p className="font-medium text-gray-900">{post.author}</p>
              <p className="text-sm text-gray-500">{post.date}</p>
            </div>
          </div>

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            &larr; Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
