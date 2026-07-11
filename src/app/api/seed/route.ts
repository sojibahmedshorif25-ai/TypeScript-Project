import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { Item } from "@/lib/models/Item";

async function ensureUser(email: string, data: { name: string; password: string; role: string }) {
  const existing = await User.findOne({ email });
  if (existing) return existing;
  return User.create({ email, ...data });
}

const itemSeeds = [
  {
    title: "Wireless Bluetooth Headphones",
    shortDescription: "Premium noise-canceling wireless headphones with 30-hour battery life.",
    fullDescription: "Experience crystal-clear audio with our premium wireless Bluetooth headphones. Features active noise cancellation, 30-hour battery life, comfortable over-ear design, and built-in microphone for calls.",
    price: 89.99,
    category: "electronics",
    location: "Dhaka, Bangladesh",
    rating: 4.5,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"],
  },
  {
    title: "Organic Cotton T-Shirt",
    shortDescription: "Eco-friendly organic cotton t-shirt available in multiple colors.",
    fullDescription: "Made from 100% organic cotton, this comfortable t-shirt is perfect for everyday wear. Available in sizes S-XXL and multiple colors.",
    price: 29.99,
    category: "fashion",
    location: "Chittagong, Bangladesh",
    rating: 4.2,
    images: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80"],
  },
  {
    title: "Artisan Coffee Beans",
    shortDescription: "Single-origin premium Arabica coffee beans from the highlands.",
    fullDescription: "Hand-picked Arabica coffee beans from the highlands of Ethiopia. Medium roast with notes of chocolate and citrus. Freshly roasted and shipped within 24 hours.",
    price: 24.99,
    category: "food",
    location: "Sylhet, Bangladesh",
    rating: 4.8,
    images: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"],
  },
  {
    title: "Yoga Mat Premium",
    shortDescription: "Extra-thick non-slip yoga mat for home workouts.",
    fullDescription: "Professional-grade yoga mat with 6mm thickness for superior comfort and joint protection. Non-slip texture on both sides. Lightweight with carrying strap.",
    price: 39.99,
    category: "health",
    location: "Dhaka, Bangladesh",
    rating: 4.3,
    images: ["https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80"],
  },
  {
    title: "Web Development Bootcamp",
    shortDescription: "Comprehensive online course covering full-stack web development.",
    fullDescription: "Complete web development bootcamp covering HTML, CSS, JavaScript, React, Node.js, and MongoDB. 60+ hours of video, 100+ exercises, 5 real-world projects.",
    price: 149.99,
    category: "education",
    location: "Online",
    rating: 4.7,
    images: ["https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80"],
  },
  {
    title: "Professional Photography Session",
    shortDescription: "Professional photography session for events or portraits.",
    fullDescription: "Professional photography package includes 2-hour session, 50+ edited high-resolution photos, online gallery access, and printing rights.",
    price: 199.99,
    category: "services",
    location: "Dhaka, Bangladesh",
    rating: 4.6,
    images: ["https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80"],
  },
];

export async function POST() {
  try {
    await connectDB();

    const user = await ensureUser("user@typemarket.com", {
      name: "Demo User",
      password: "password123",
      role: "user",
    });

    const admin = await ensureUser("admin@typemarket.com", {
      name: "Admin User",
      password: "password123",
      role: "admin",
    });

    const itemCount = await Item.countDocuments();
    let itemsSeeded = false;

    if (itemCount === 0) {
      for (const itemData of itemSeeds) {
        await Item.create({ ...itemData, userId: admin._id });
      }
      itemsSeeded = true;
    }

    return NextResponse.json({
      success: true,
      message: "Seed completed",
      data: {
        users: ["user@typemarket.com", "admin@typemarket.com"],
        items: itemsSeeded ? `${itemSeeds.length} items created` : "Items already exist",
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, error: "Seed failed" },
      { status: 500 }
    );
  }
}
