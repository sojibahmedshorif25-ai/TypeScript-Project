export const CATEGORIES = [
  "electronics",
  "fashion",
  "food",
  "health",
  "education",
  "services",
  "other",
] as const;

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
] as const;

export const ITEMS_PER_PAGE = 12;

export const APP_NAME = "TypeMarket";
export const APP_TAGLINE = "Your Premier TypeScript Marketplace";
