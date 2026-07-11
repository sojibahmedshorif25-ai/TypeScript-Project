import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Item } from "@/lib/models/Item";
import { User } from "@/lib/models/User";
import { Review } from "@/lib/models/Review";

export async function GET() {
  try {
    await connectDB();

    const [totalItems, totalUsers, totalReviews, categoryStats] = await Promise.all([
      Item.countDocuments(),
      User.countDocuments(),
      Review.countDocuments(),
      Item.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalItems,
        totalUsers,
        totalReviews,
        categoryStats,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
