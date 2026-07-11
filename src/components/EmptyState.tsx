import { PackageSearch } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: { label: string; href: string };
}

export default function EmptyState({
  title = "No items found",
  description = "Try adjusting your search or filter criteria",
  action,
}: EmptyStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <PackageSearch className="w-16 h-16 text-gray-300 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{description}</p>
      {action && (
        <a
          href={action.href}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          {action.label}
        </a>
      )}
    </div>
  );
}
