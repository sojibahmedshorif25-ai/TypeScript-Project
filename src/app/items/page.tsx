"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Card from "@/components/Card";
import CardSkeleton from "@/components/CardSkeleton";
import { useItems } from "@/hooks/useItems";
import { useDebounce } from "@/hooks/useDebounce";
import EmptyState from "@/components/EmptyState";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  List,
} from "lucide-react";

const categories = [
  { value: "", label: "All Categories", icon: Sparkles },
  { value: "electronics", label: "Electronics", icon: null },
  { value: "fashion", label: "Fashion", icon: null },
  { value: "food", label: "Food", icon: null },
  { value: "health", label: "Health", icon: null },
  { value: "education", label: "Education", icon: null },
  { value: "services", label: "Services", icon: null },
  { value: "other", label: "Other", icon: null },
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-[3px] border-blue-100 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading explore...</p>
        </div>
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
}

function ExploreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [filtersOpen, setFiltersOpen] = useState(false);

  const debouncedSearch = useDebounce(searchInput, 400);

  const hasActiveFilters = category || minPrice || maxPrice || sort !== "newest" || debouncedSearch;

  const queryParams: Record<string, string | number | undefined> = {
    search: debouncedSearch || undefined,
    category: category || undefined,
    minPrice: minPrice || undefined,
    maxPrice: maxPrice || undefined,
    sort,
    page,
    limit: 12,
  };

  const { data, isLoading } = useItems(queryParams);

  const items = data?.items || [];
  const pagination = data?.pagination || { total: 0, page: 1, limit: 12, totalPages: 0 };

  const updateUrl = () => {
    const query = new URLSearchParams();
    if (debouncedSearch) query.set("search", debouncedSearch);
    if (category) query.set("category", category);
    if (minPrice) query.set("minPrice", minPrice);
    if (maxPrice) query.set("maxPrice", maxPrice);
    if (sort && sort !== "newest") query.set("sort", sort);
    query.set("page", page.toString());
    const qs = query.toString();
    router.replace(qs ? `/items?${qs}` : "/items", { scroll: false });
  };

  const clearFilters = () => {
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSort("newest");
    setSearchInput("");
    setPage(1);
    router.replace("/items", { scroll: false });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-3 inline-block">
              Marketplace
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Explore Items</h1>
            <p className="text-gray-500 mt-2 max-w-xl">
              Discover amazing products and services from our community
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-gray-700" />
                  <span className="font-semibold text-gray-900 text-sm">Filters</span>
                </div>
                {hasActiveFilters && (
                  <button onClick={clearFilters}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                    <X className="w-3 h-3" />
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" value={searchInput}
                      onChange={(e) => { setSearchInput(e.target.value); setPage(1); }}
                      placeholder="Search items..."
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-gray-50/50 transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Category</label>
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map(({ value: val, label }) => (
                      <button key={val}
                        onClick={() => { setCategory(val); setPage(1); }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          category === val
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Min</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                      <input type="number" value={minPrice}
                        onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
                        placeholder="0"
                        className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-gray-50/50" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Max</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                      <input type="number" value={maxPrice}
                        onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
                        placeholder="Any"
                        className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-gray-50/50" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Sort By</label>
                  <select value={sort}
                    onChange={(e) => { setSort(e.target.value); setPage(1); }}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-gray-50/50">
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                {hasActiveFilters && (
                  <span className="text-gray-900 font-medium">{pagination.total}</span>
                )}
                <span>{hasActiveFilters ? "results found" : `Showing ${items.length} of ${pagination.total}`}</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
                </motion.div>
              ) : items.length === 0 ? (
                <motion.div key="empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
                  <EmptyState
                    title="No items found"
                    description="Try adjusting your search or filter criteria"
                  />
                  {hasActiveFilters && (
                    <div className="text-center mt-4">
                      <button onClick={clearFilters}
                        className="px-5 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                        Clear all filters
                      </button>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {items.map((item, i) => (
                    <motion.div key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}>
                      <Card item={item} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {pagination.totalPages > 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-2 mt-10 pb-8">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all bg-white">
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === pagination.totalPages || Math.abs(p - page) <= 1)
                    .map((p, idx, arr) => (
                      <span key={p} className="flex items-center">
                        {idx > 0 && arr[idx - 1] !== p - 1 && (
                          <span className="px-1 text-gray-300">...</span>
                        )}
                        <button onClick={() => setPage(p)}
                          className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                            p === page
                              ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md"
                              : "border border-gray-200 text-gray-700 hover:bg-gray-50 bg-white"
                          }`}>
                          {p}
                        </button>
                      </span>
                    ))}
                </div>
                <button onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))} disabled={page === pagination.totalPages}
                  className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all bg-white">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
