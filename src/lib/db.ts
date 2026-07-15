import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Item } from "@/lib/models/Item";
import dns from "dns";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

function resolveSRV(url: string): Promise<string> {
  if (!url.startsWith("mongodb+srv://")) {
    return Promise.resolve(url);
  }
  const match = url.match(/^mongodb\+srv:\/\/(.+?)@(.+?)\/(.+?)\?(.*)$/);
  if (!match) return Promise.resolve(url);

  const [_, creds, host, db, params] = match;
  const baseParams = new URLSearchParams(params);

  return new Promise((resolve) => {
    const originalServers = dns.getServers();
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
    dns.resolveSrv(`_mongodb._tcp.${host}`, (err: Error | null, addresses: Array<{ name: string; port: number }>) => {
      if (err || !addresses || addresses.length === 0) {
        dns.setServers(["8.8.4.4"]);
        dns.resolveSrv(`_mongodb._tcp.${host}`, (err2: Error | null, addresses2: Array<{ name: string; port: number }>) => {
          dns.setServers(originalServers);
          if (err2 || !addresses2 || addresses2.length === 0) {
            return resolve(url);
          }
          const hosts = addresses2.map((a) => `${a.name}:${a.port}`).join(",");
          resolve(`mongodb://${creds}@${hosts}/${db}?${baseParams.toString()}&ssl=true&authSource=admin`);
        });
        return;
      }
      dns.setServers(originalServers);
      const hosts = addresses.map((a) => `${a.name}:${a.port}`).join(",");
      resolve(`mongodb://${creds}@${hosts}/${db}?${baseParams.toString()}&ssl=true&authSource=admin`);
    });
  });
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const resolvedUri = await resolveSRV(MONGODB_URI);
    cached.promise = mongoose.connect(resolvedUri).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  try {
    await autoSeed();
  } catch (e) {
    console.warn("Auto-seed skipped:", e);
  }

  return cached.conn;
}

async function autoSeed() {
  const db = mongoose.connection.db;
  if (!db) return;

  let adminId = await db.collection("users").findOne({ email: "admin@typemarket.com" }).then((u) => u?._id);

  if (!adminId) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash("password123", salt);

    const users = await db.collection("users").insertMany([
      {
        name: "Demo User",
        email: "user@typemarket.com",
        password: hashed,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Admin User",
        email: "admin@typemarket.com",
        password: hashed,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    adminId = users.insertedIds[1];
  }

  const itemCount = await Item.countDocuments();
  if (itemCount === 0) {
    const itemSeeds = [
      { title: "Wireless Bluetooth Headphones", shortDescription: "Premium noise-canceling wireless headphones with 30-hour battery life.", fullDescription: "Experience crystal-clear audio with active noise cancellation and 30-hour battery life. Features premium over-ear design, built-in microphone, and carrying case.", price: 89.99, category: "electronics", rating: 4.5, location: "Dhaka, Bangladesh", priority: "high", date: "2026-07-01", images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"] },
      { title: "Organic Cotton T-Shirt", shortDescription: "Eco-friendly organic cotton t-shirt available in multiple colors.", fullDescription: "Made from 100% organic cotton. Comfortable and sustainably produced. Available in sizes S-XXL.", price: 29.99, category: "fashion", rating: 4.2, location: "Chittagong, Bangladesh", priority: "medium", date: "2026-07-05", images: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80"] },
      { title: "Artisan Coffee Beans", shortDescription: "Single-origin premium Arabica coffee beans from the highlands.", fullDescription: "Hand-picked Arabica beans with notes of chocolate and citrus. Medium roast, freshly roasted and shipped within 24 hours.", price: 24.99, category: "food", rating: 4.8, location: "Sylhet, Bangladesh", priority: "low", date: "2026-07-10", images: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"] },
      { title: "Yoga Mat Premium", shortDescription: "Extra-thick non-slip yoga mat for home workouts.", fullDescription: "6mm thick eco-friendly TPE mat with non-slip texture. Lightweight with carrying strap included.", price: 39.99, category: "health", rating: 4.3, location: "Dhaka, Bangladesh", priority: "medium", date: "2026-07-15", images: ["https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80"] },
      { title: "Web Development Bootcamp", shortDescription: "Comprehensive full-stack web development course.", fullDescription: "60+ hours of video, 100+ exercises, 5 real-world projects. Covers HTML, CSS, JS, React, Node.js, MongoDB.", price: 149.99, category: "education", rating: 4.7, location: "Online", priority: "high", date: "2026-07-20", images: ["https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80"] },
      { title: "Professional Photography Session", shortDescription: "Professional event or portrait photography package.", fullDescription: "2-hour session with 50+ edited photos and online gallery. Suitable for weddings, portraits, events.", price: 199.99, category: "services", rating: 4.6, location: "Dhaka, Bangladesh", priority: "medium", date: "2026-07-25", images: ["https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80"] },
    ];

    for (const item of itemSeeds) {
      await Item.create({ ...item, userId: adminId });
    }

    console.log("✓ Demo items seeded");
  }

  console.log("✓ Auto-seed check complete");
}
