import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as reviewService from "../services/reviewService";
import { AuthRequest } from "../types";

export const getReviews = asyncHandler(async (req: Request, res: Response) => {
  const result = await reviewService.getReviews(req.params.id as string);
  res.json({ success: true, data: result });
});

export const createReview = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { rating, comment } = req.body;
  const review = await reviewService.createReview(req.params.id as string, req.user!.userId, rating, comment);
  res.status(201).json({ success: true, data: review });
});
