import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  itemId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    itemId: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, maxlength: 500 },
  },
  { timestamps: true }
);

ReviewSchema.index({ itemId: 1, userId: 1 }, { unique: true });

export const Review =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
