import { connectDB } from "./config/db";
import { User } from "./models/User";
import { Item } from "./models/Item";
import { Review } from "./models/Review";

const itemSeeds = [
  {
    title: "Wireless Bluetooth Headphones",
    shortDescription: "Premium noise-canceling wireless headphones with 30-hour battery life.",
    fullDescription: "Experience crystal-clear audio with our premium wireless Bluetooth headphones. Features active noise cancellation, 30-hour battery life, comfortable over-ear design, and built-in microphone for calls. Compatible with all Bluetooth-enabled devices. Includes carrying case and charging cable.",
    price: 89.99,
    category: "electronics",
    location: "Dhaka, Bangladesh",
    priority: "high",
    rating: 4.5,
    date: "2026-07-01",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"],
  },
  {
    title: "Organic Cotton T-Shirt",
    shortDescription: "Eco-friendly organic cotton t-shirt available in multiple colors.",
    fullDescription: "Made from 100% organic cotton, this comfortable t-shirt is perfect for everyday wear. Available in sizes S-XXL and multiple colors. Ethically sourced and produced with sustainable practices. Machine washable and pre-shrunk.",
    price: 29.99,
    category: "fashion",
    location: "Chittagong, Bangladesh",
    priority: "medium",
    rating: 4.2,
    date: "2026-07-05",
    images: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80"],
  },
  {
    title: "Artisan Coffee Beans",
    shortDescription: "Single-origin premium Arabica coffee beans from the highlands.",
    fullDescription: "Hand-picked Arabica coffee beans from the highlands of Ethiopia. Medium roast with notes of chocolate and citrus. Perfect for pour-over, French press, or espresso. Freshly roasted and shipped within 24 hours. 1kg bag.",
    price: 24.99,
    category: "food",
    location: "Sylhet, Bangladesh",
    priority: "low",
    rating: 4.8,
    date: "2026-07-10",
    images: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"],
  },
  {
    title: "Yoga Mat Premium",
    shortDescription: "Extra-thick non-slip yoga mat for home workouts.",
    fullDescription: "Professional-grade yoga mat with 6mm thickness for superior comfort and joint protection. Non-slip texture on both sides. Lightweight and easy to carry with included strap. Eco-friendly TPE material. Size: 183cm x 61cm.",
    price: 39.99,
    category: "health",
    location: "Dhaka, Bangladesh",
    priority: "medium",
    rating: 4.3,
    date: "2026-07-15",
    images: ["https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80"],
  },
  {
    title: "Web Development Bootcamp",
    shortDescription: "Comprehensive online course covering full-stack web development.",
    fullDescription: "Complete web development bootcamp covering HTML, CSS, JavaScript, React, Node.js, and MongoDB. 60+ hours of video content, 100+ coding exercises, and 5 real-world projects. Lifetime access with certificate upon completion.",
    price: 149.99,
    category: "education",
    location: "Online",
    priority: "high",
    rating: 4.7,
    date: "2026-07-20",
    images: ["https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80"],
  },
  {
    title: "Professional Photography Session",
    shortDescription: "Professional photography session for events or portraits.",
    fullDescription: "Professional photography package includes 2-hour session, 50+ edited high-resolution photos, online gallery access, and printing rights. Suitable for weddings, portraits, events, or commercial use. Travel within Dhaka city included.",
    price: 199.99,
    category: "services",
    location: "Dhaka, Bangladesh",
    priority: "medium",
    rating: 4.6,
    date: "2026-07-25",
    images: ["https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80"],
  },
];

async function seed() {
  await connectDB();

  const existingUsers = await User.countDocuments();
  let adminId: string;

  if (existingUsers === 0) {
    const users = await User.create([
      { name: "Demo User", email: "user@typemarket.com", password: "password123", role: "user" },
      { name: "Admin User", email: "admin@typemarket.com", password: "password123", role: "admin" },
    ]);
    adminId = users[1]._id.toString();
    console.log("✓ Demo users created");
  } else {
    const admin = await User.findOne({ email: "admin@typemarket.com" });
    adminId = admin!._id.toString();
    console.log("✓ Users already exist");
  }

  const itemCount = await Item.countDocuments();

  if (itemCount === 0) {
    for (const itemData of itemSeeds) {
      await Item.create({ ...itemData, userId: adminId });
    }
    console.log(`✓ ${itemSeeds.length} demo items created`);
  } else {
    console.log("✓ Items already exist");
  }

  console.log("✓ Seed completed");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
