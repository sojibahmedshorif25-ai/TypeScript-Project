export default function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="h-52 shimmer" />
      <div className="p-5 space-y-3">
        <div className="h-5 shimmer rounded-lg w-3/4" />
        <div className="h-4 shimmer rounded-lg w-full" />
        <div className="h-4 shimmer rounded-lg w-2/3" />
        <div className="flex justify-between pt-1">
          <div className="h-7 shimmer rounded-lg w-20" />
          <div className="h-4 shimmer rounded-lg w-16" />
        </div>
        <div className="h-10 shimmer rounded-xl w-full" />
      </div>
    </div>
  );
}
