import mongoose, { Schema, Document } from "mongoose";

export interface IItemDoc extends Document {
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
  location: string;
  priority: "low" | "medium" | "high";
  date: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ItemSchema = new Schema<IItemDoc>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
      maxlength: [200, "Short description cannot exceed 200 characters"],
    },
    fullDescription: {
      type: String,
      required: [true, "Full description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be positive"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["electronics", "fashion", "food", "health", "education", "services", "other"],
    },
    images: [{ type: String }],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    location: {
      type: String,
      default: "",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    date: {
      type: String,
      default: "",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

ItemSchema.index({ category: 1 });
ItemSchema.index({ price: 1 });
ItemSchema.index({ rating: -1 });
ItemSchema.index({ location: 1 });
ItemSchema.index({ createdAt: -1 });
ItemSchema.index({ title: "text", shortDescription: "text", location: "text" });
ItemSchema.index({ category: 1, price: 1 });
ItemSchema.index({ userId: 1 });

export const Item = mongoose.models.Item || mongoose.model<IItemDoc>("Item", ItemSchema);
