export function TechCardSkeleton() {
  return (
    <div className="flex items-center gap-8 bg-gray-lighter px-4 py-2 rounded-md mb-4 animate-pulse">
      <div className="flex items-center gap-8 w-full">
        <div className="bg-gray-medium h-4 w-24 rounded" />
      </div>

      <div className="flex flex-col lg:flex-row gap-2 justify-center">
        <div className="bg-gray-medium h-8 w-20 rounded" />
        <div className="bg-gray-medium h-8 w-20 rounded" />
      </div>
    </div>
  );
}
