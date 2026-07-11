export default function AddItemLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-64 mb-6" />
          <div className="space-y-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <div className="h-4 bg-gray-200 rounded w-24 mb-1" />
                <div className="h-10 bg-gray-200 rounded" />
              </div>
            ))}
            <div className="h-12 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
