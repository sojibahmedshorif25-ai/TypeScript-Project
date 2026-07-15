"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Card from "@/components/Card";
import { useAuth } from "@/components/AuthContext";
import { useItem, useItems } from "@/hooks/useItems";
import { useReviews } from "@/hooks/useReviews";
import { createReview } from "@/services/reviewService";
import { PageLoader } from "@/components/LoadingSpinner";
import { getItemImage } from "@/lib/imagePlaceholder";
import type { ItemType } from "@/types";
import toast from "react-hot-toast";

export default function ItemDetailsPage() {
  const params = useParams();
  const { user } = useAuth();
  const id = params.id as string;

  const { data: item, isLoading, error } = useItem(id);
  const { data: reviewsData, refetch: refetchReviews } = useReviews(id);

  const { data: relatedData } = useItems({
    category: item?.category || "",
    limit: 4,
    sort: "newest",
  });

  const [selectedImage, setSelectedImage] = useState(0);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  const related = relatedData?.items?.filter((i: ItemType) => i._id !== id) || [];
  const reviews = reviewsData?.reviews || [];
  const avgRating = reviewsData?.averageRating || 0;
  const totalReviews = reviewsData?.totalReviews || 0;

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      toast.error("Comment is required");
      return;
    }
    setReviewSubmitting(true);
    try {
      await createReview(id, reviewRating, reviewComment);
      toast.success("Review submitted successfully!");
      setReviewComment("");
      setReviewRating(5);
      refetchReviews();
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error || "Failed to submit review";
      toast.error(msg);
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (isLoading) return <PageLoader />;

  if (error || !item) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Item Not Found</h2>
        <p className="text-gray-600 mb-6">The item you are looking for does not exist.</p>
        <Link href="/items" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Browse Items
        </Link>
      </div>
    );
  }

  const images = item.images?.length ? item.images : [getItemImage(item.images, item.title, item.category)];

  const hasReviewed = user && reviews.some((r: { userId: { _id: string } }) => r.userId._id === user._id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/items" className="hover:text-blue-600">Items</Link>
          <span>/</span>
          <span className="text-gray-900">{item.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-3">
              <img src={images[selectedImage]} alt={item.title} className="w-full h-96 object-cover" />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === selectedImage ? "border-blue-600" : "border-transparent"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-md capitalize">{item.category}</span>
              {item.priority && (
                <span className={`px-3 py-1 text-xs font-medium rounded-md capitalize ${
                  item.priority === "high" ? "bg-red-100 text-red-700" :
                  item.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                  "bg-green-100 text-green-700"
                }`}>
                  {item.priority} priority
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{item.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-bold text-blue-600">${item.price.toLocaleString()}</span>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < Math.round(avgRating || item.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-600 ml-1">
                  {totalReviews > 0 ? `${avgRating.toFixed(1)} (${totalReviews} review${totalReviews !== 1 ? "s" : ""})` : "No reviews yet"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{item.location || "Location not specified"}</span>
              {item.date && (
                <>
                  <span className="text-gray-300">|</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{item.date}</span>
                </>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h2 className="font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">{item.fullDescription}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4 mt-4">
              <div>
                <h2 className="font-semibold text-gray-900 mb-2">Overview</h2>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><span className="font-medium text-gray-900">Category:</span> {item.category}</li>
                  <li><span className="font-medium text-gray-900">Price:</span> ${item.price.toLocaleString()}</li>
                  <li><span className="font-medium text-gray-900">Location:</span> {item.location || "N/A"}</li>
                  <li><span className="font-medium text-gray-900">Listed:</span> {new Date(item.createdAt).toLocaleDateString()}</li>
                </ul>
              </div>
              <div className="flex items-start justify-end">
                {user && (user._id === (typeof item.userId === "string" ? item.userId : item.userId?._id) || user.role === "admin") && (
                  <Link href={`/items/edit/${item._id}`} className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                    Edit Item
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Reviews ({totalReviews})</h2>

          {user && !hasReviewed && (
            <form onSubmit={handleReviewSubmit} className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Write a Review</h3>
              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setReviewRating(star)} className="p-1">
                      <svg className={`w-6 h-6 ${star <= reviewRating ? "text-yellow-400 fill-current" : "text-gray-300"}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">Comment</label>
                <textarea value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Share your experience..." />
              </div>
              <button type="submit" disabled={reviewSubmitting} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-lg transition-colors">
                {reviewSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          )}

          {!user && (
            <p className="text-sm text-gray-500 mb-6">
              <Link href="/login" className="text-blue-600 hover:underline">Sign in</Link> to leave a review.
            </p>
          )}

          {hasReviewed && <p className="text-sm text-gray-500 mb-6">You have already reviewed this item.</p>}

          {reviews.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-6">No reviews yet. Be the first!</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review: { _id: string; userId: { _id: string; name: string }; rating: number; comment: string; createdAt: string }) => (
                <div key={review._id} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                        {review.userId.name.split(" ").map((n: string) => n[0]).join("")}
                      </div>
                      <span className="font-medium text-gray-900 text-sm">{review.userId.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((r: ItemType) => <Card key={r._id} item={r} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
