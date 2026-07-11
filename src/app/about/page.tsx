import Link from "next/link";

const team = [
  { name: "Sharif Ahmed", role: "Founder & CEO", bio: "Full-stack developer passionate about TypeScript and building scalable applications." },
  { name: "Fatima Khan", role: "Lead Designer", bio: "UX designer focused on creating intuitive and beautiful user experiences." },
  { name: "Rafiq Hasan", role: "Backend Engineer", bio: "Expert in Node.js, MongoDB, and API architecture." },
  { name: "Nusrat Jahan", role: "Frontend Engineer", bio: "React/Next.js specialist with a keen eye for detail." },
];

const milestones = [
  { year: "2024", event: "TypeMarket founded with a vision to create a type-safe marketplace" },
  { year: "2024 Q3", event: "Launched beta version with core listing and search features" },
  { year: "2025 Q1", event: "Reached 1,000 active users and 500+ listings" },
  { year: "2025 Q3", event: "Introduced advanced analytics and premium features" },
  { year: "2026", event: "Expanded globally with 12,500+ active users" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About TypeMarket</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We are building the premier TypeScript-powered marketplace for quality products and services.
            Our mission is to provide a secure, fast, and delightful experience for buyers and sellers.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  TypeMarket was born from a simple idea: what if a marketplace could be as reliable as the
                  TypeScript code it's built with? We saw an opportunity to create a platform where type safety
                  isn't just a developer concept but a promise of quality and reliability for every user.
                </p>
                <p>
                  Starting in 2024, our team of passionate developers and designers set out to build a marketplace
                  that leverages the full power of the TypeScript ecosystem. From Next.js on the frontend to
                  MongoDB with Mongoose on the backend, every layer of our stack is designed for performance
                  and developer experience.
                </p>
                <p>
                  Today, TypeMarket serves thousands of users globally, facilitating transactions worth millions
                  of dollars. We continue to innovate and push the boundaries of what a modern marketplace can be.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Our Milestones</h3>
              <div className="space-y-6">
                {milestones.map((m, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-blue-600 rounded-full mt-1.5" />
                      {i < milestones.length - 1 && (
                        <div className="w-0.5 flex-1 bg-blue-200 mt-1" />
                      )}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-blue-600">{m.year}</span>
                      <p className="text-sm text-gray-600">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
            <p className="mt-4 text-gray-600">The people behind TypeMarket</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8">
            Join thousands of users who trust TypeMarket for their buying and selling needs.
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-lg"
          >
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}
