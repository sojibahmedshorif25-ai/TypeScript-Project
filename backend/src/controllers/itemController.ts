import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as itemService from "../services/itemService";
import { AuthRequest } from "../types";

export const getItems = asyncHandler(async (req: Request, res: Response) => {
  const result = await itemService.getItems(req.query as Record<string, string>);
  res.json({ success: true, data: result });
});

export const getItem = asyncHandler(async (req: Request, res: Response) => {
  const item = await itemService.getItemById(req.params.id as string);
  res.json({ success: true, data: item });
});

export const getUserItems = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await itemService.getItems({
    ...(req.query as Record<string, string>),
    userId: req.user!.userId,
  });
  res.json({ success: true, data: result });
});

export const createItem = asyncHandler(async (req: AuthRequest, res: Response) => {
  const item = await itemService.createItem({
    ...req.body,
    userId: req.user!.userId,
  });
  res.status(201).json({ success: true, data: item });
});

export const updateItem = asyncHandler(async (req: AuthRequest, res: Response) => {
  const item = await itemService.updateItem(
    req.params.id as string,
    req.user!.userId,
    req.user!.role,
    req.body
  );
  res.json({ success: true, data: item });
});

export const deleteItem = asyncHandler(async (req: AuthRequest, res: Response) => {
  await itemService.deleteItem(req.params.id as string, req.user!.userId, req.user!.role);
  res.json({ success: true, message: "Item deleted successfully" });
});

export const getDashboardStats = asyncHandler(async (_req: Request, res: Response) => {
  const stats = await itemService.getDashboardStats();
  res.json({ success: true, data: stats });
});
