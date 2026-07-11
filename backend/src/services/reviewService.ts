import mongoose from "mongoose";
import { Review } from "../models/Review";
import { Item } from "../models/Item";
import { ApiError } from "../utils/ApiError";

export async function getReviews(itemId: string) {
  const reviews = await Review.find({ itemId })
    .populate("userId", "name email")
    .sort({ createdAt: -1 })
    .lean();

  const objectId = new mongoose.Types.ObjectId(itemId);
  const aggResult = await Review.aggregate([
    { $match: { itemId: objectId } },
    { $group: { _id: null, avgRating: { $avg: "$rating" }, count: { $sum: 1 } } },
  ]);

  return {
    reviews,
    averageRating: aggResult[0]?.avgRating || 0,
    totalReviews: aggResult[0]?.count || 0,
  };
}

export async function createReview(itemId: string, userId: string, rating: number, comment: string) {
  const item = await Item.findById(itemId);
  if (!item) {
    throw new ApiError(404, "Item not found");
  }

  const existing = await Review.findOne({ itemId, userId });
  if (existing) {
    throw new ApiError(409, "You have already reviewed this item");
  }

  const review = await Review.create({ itemId, userId, rating, comment });

  const allReviews = await Review.find({ itemId });
  const avgRating = allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;
  await Item.findByIdAndUpdate(itemId, { rating: Math.round(avgRating * 10) / 10 });

  return review;
}
