import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Item } from "@/lib/models/Item";
import { getUserFromRequest } from "@/lib/auth";

const fallbackItems = [
  {
    _id: "fallback-1",
    title: "Wireless Bluetooth Headphones",
    shortDescription: "Premium noise-canceling wireless headphones with 30-hour battery life.",
    fullDescription: "Experience crystal-clear audio with active noise cancellation and a comfortable over-ear design.",
    price: 89.99,
    category: "electronics",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"],
    rating: 4.5,
    location: "Dhaka, Bangladesh",
    userId: { _id: "fallback-user", name: "Demo User", email: "user@typemarket.com" },
    createdAt: "2026-01-10T00:00:00.000Z",
  },
  {
    _id: "fallback-2",
    title: "Organic Cotton T-Shirt",
    shortDescription: "Eco-friendly organic cotton t-shirt available in multiple colors.",
    fullDescription: "Made from 100% organic cotton, this comfortable tee is perfect for everyday wear.",
    price: 29.99,
    category: "fashion",
    images: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80"],
    rating: 4.2,
    location: "Chittagong, Bangladesh",
    userId: { _id: "fallback-user", name: "Demo User", email: "user@typemarket.com" },
    createdAt: "2026-01-12T00:00:00.000Z",
  },
  {
    _id: "fallback-3",
    title: "Artisan Coffee Beans",
    shortDescription: "Single-origin premium Arabica coffee beans from the highlands.",
    fullDescription: "Hand-picked Arabica beans with bold flavor and a rich roasted finish.",
    price: 24.99,
    category: "food",
    images: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"],
    rating: 4.8,
    location: "Sylhet, Bangladesh",
    userId: { _id: "fallback-user", name: "Demo User", email: "user@typemarket.com" },
    createdAt: "2026-01-14T00:00:00.000Z",
  },
  {
    _id: "fallback-4",
    title: "Yoga Mat Premium",
    shortDescription: "Extra-thick non-slip yoga mat for home workouts.",
    fullDescription: "Professional-grade yoga mat designed for comfort and stability during workouts.",
    price: 39.99,
    category: "health",
    images: ["https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80"],
    rating: 4.3,
    location: "Dhaka, Bangladesh",
    userId: { _id: "fallback-user", name: "Demo User", email: "user@typemarket.com" },
    createdAt: "2026-01-16T00:00:00.000Z",
  },
  {
    _id: "fallback-5",
    title: "Web Development Bootcamp",
    shortDescription: "Comprehensive online course covering full-stack web development.",
    fullDescription: "Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB in one practical course.",
    price: 149.99,
    category: "education",
    images: ["https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80"],
    rating: 4.7,
    location: "Online",
    userId: { _id: "fallback-user", name: "Demo User", email: "user@typemarket.com" },
    createdAt: "2026-01-18T00:00:00.000Z",
  },
  {
    _id: "fallback-6",
    title: "Professional Photography Session",
    shortDescription: "Professional photography package for portraits or events.",
    fullDescription: "A polished photography package with edited high-resolution images for any occasion.",
    price: 199.99,
    category: "services",
    images: ["https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80"],
    rating: 4.6,
    location: "Dhaka, Bangladesh",
    userId: { _id: "fallback-user", name: "Demo User", email: "user@typemarket.com" },
    createdAt: "2026-01-20T00:00:00.000Z",
  },
];

function filterFallbackItems(items: typeof fallbackItems, search: string, category: string, minPrice: string | null, maxPrice: string | null, sort: string) {
  let filtered = [...items];

  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter((item) =>
      item.title.toLowerCase().includes(term) ||
      item.shortDescription.toLowerCase().includes(term) ||
      item.location.toLowerCase().includes(term)
    );
  }

  if (category) {
    filtered = filtered.filter((item) => item.category === category);
  }

  const min = minPrice ? Number(minPrice) : undefined;
  const max = maxPrice ? Number(maxPrice) : undefined;
  if (min !== undefined) filtered = filtered.filter((item) => item.price >= min);
  if (max !== undefined) filtered = filtered.filter((item) => item.price <= max);

  switch (sort) {
    case "price_asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "oldest":
      filtered.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
      break;
    default:
      filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  return filtered;
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const url = request.nextUrl;
    const search = url.searchParams.get("search") || "";
    const category = url.searchParams.get("category") || "";
    const minPrice = url.searchParams.get("minPrice");
    const maxPrice = url.searchParams.get("maxPrice");
    const sort = url.searchParams.get("sort") || "newest";
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "12");

    const query: Record<string, unknown> = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      const priceFilter: Record<string, number> = {};
      if (minPrice) priceFilter.$gte = parseFloat(minPrice);
      if (maxPrice) priceFilter.$lte = parseFloat(maxPrice);
      query.price = priceFilter;
    }

    let sortOption = {};
    switch (sort) {
      case "price_asc":
        sortOption = { price: 1 };
        break;
      case "price_desc":
        sortOption = { price: -1 };
        break;
      case "rating":
        sortOption = { rating: -1 };
        break;
      case "oldest":
        sortOption = { createdAt: 1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    let total = 0;
    let items: Array<Record<string, unknown>> = [];
    let dbFailed = false;

    try {
      total = await Item.countDocuments(query);
      items = await Item.find(query)
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("userId", "name email")
        .lean();
    } catch (dbError) {
      dbFailed = true;
      console.warn("Using fallback items because the database query failed", dbError);
    }

    if (dbFailed) {
      const filteredFallbackItems = filterFallbackItems(
        fallbackItems,
        search,
        category,
        minPrice,
        maxPrice,
        sort
      );
      total = filteredFallbackItems.length;
      items = filteredFallbackItems.slice((page - 1) * limit, page * limit);
    }

    return NextResponse.json({
      success: true,
      data: {
        items,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Get items error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await request.json();
    const { title, shortDescription, fullDescription, price, category, images, location, priority, date } = body;

    if (!title || !shortDescription || !fullDescription || !price || !category) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const item = await Item.create({
      title,
      shortDescription,
      fullDescription,
      price,
      category,
      images: images || [],
      location: location || "",
      priority: priority || "medium",
      date: date || new Date().toISOString().split("T")[0],
      userId: user.userId,
    });

    return NextResponse.json(
      { success: true, data: item },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create item error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
