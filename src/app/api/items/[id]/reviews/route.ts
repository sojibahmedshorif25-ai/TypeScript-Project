import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Review } from "@/lib/models/Review";
import { Item } from "@/lib/models/Item";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const reviews = await Review.find({ itemId: id })
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .lean();

    const avgResult = await Review.aggregate([
      { $match: { itemId: await (await import("mongoose")).Types.ObjectId.createFromHexString(id) } },
      { $group: { _id: null, avgRating: { $avg: "$rating" }, count: { $sum: 1 } } },
    ]);

    return NextResponse.json({
      success: true,
      data: {
        reviews,
        averageRating: avgResult[0]?.avgRating || 0,
        totalReviews: avgResult[0]?.count || 0,
      },
    });
  } catch (error) {
    console.error("Get reviews error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    await connectDB();
    const { id } = await params;
    const { rating, comment } = await request.json();

    const item = await Item.findById(id);
    if (!item) {
      return NextResponse.json(
        { success: false, error: "Item not found" },
        { status: 404 }
      );
    }

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (!comment || comment.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Comment is required" },
        { status: 400 }
      );
    }

    const existing = await Review.findOne({
      itemId: id,
      userId: user.userId,
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "You have already reviewed this item" },
        { status: 409 }
      );
    }

    const review = await Review.create({
      itemId: id,
      userId: user.userId,
      rating,
      comment,
    });

    const allReviews = await Review.find({ itemId: id });
    const avgRating =
      allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;

    await Item.findByIdAndUpdate(id, { rating: Math.round(avgRating * 10) / 10 });

    return NextResponse.json(
      { success: true, data: review },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create review error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
