const COLORS: [string, string][] = [
  ["#2563eb", "#1d4ed8"],
  ["#3b82f6", "#2563eb"],
  ["#1e40af", "#1d4ed8"],
  ["#4f46e5", "#4338ca"],
  ["#6366f1", "#4f46e5"],
  ["#0f766e", "#047857"],
];

export function getItemImage(
  images: string[] | undefined,
  title: string,
  category: string
): string {
  if (images && images.length > 0 && images[0]) {
    return images[0];
  }

  const initials = title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "?";

  const colorIndex =
    title.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % COLORS.length;
  const [from, to] = COLORS[colorIndex];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${from}"/>
        <stop offset="100%" stop-color="${to}"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#g)"/>
    <text x="400" y="280" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-size="200" font-family="Arial,sans-serif" font-weight="bold">${initials}</text>
    <text x="400" y="380" text-anchor="middle" fill="white" font-size="28" font-family="Arial,sans-serif" font-weight="bold">${category.toUpperCase()}</text>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
