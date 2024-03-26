export default function ListLoadingSkeleton() {
  return (
    <div className="grid grid-cols 3 gap-2">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="border rounded p-3 m-2 animate-pulse space-y-3"
        >
          <div className="flex justify-between">
            <div className="h-5 w-32 bg-gray-300 rounded" />
            <div className="h-5 w-10 bg-gray-300 rounded" />
          </div>
          <div className="space-y-1">
            <div className="h-5 bg-gray-300 rounded" />
            <div className="h-5 bg-gray-300 rounded" />
            <div className="h-5 bg-gray-300 rounded" />
            <div className="h-5 bg-gray-300 rounded" />
          </div>
          <div className="h-5 bg-gray-300 rounded" />
        </div>
      ))}
    </div>
  );
}
