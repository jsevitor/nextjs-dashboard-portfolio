export function AboutCardSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 bg-gray-lighter shadow p-4 rounded mb-4 animate-pulse">
      <div className="bg-gray-medium w-64 h-52 rounded" />
      <div className="flex flex-col gap-4 w-full">
        <div className="bg-gray-medium h-6 w-1/3 rounded" />
        <div className="bg-gray-medium h-24 w-full rounded" />
      </div>
    </div>
  );
}
