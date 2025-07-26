export function ContactCardSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 bg-gray-lighter shadow px-4 py-2 rounded-md mb-4 animate-pulse">
      <div className="bg-gray-medium w-12 h-10 rounded-full" />

      <div className="flex items-center gap-8 w-full">
        <div className="bg-gray-medium h-4 w-24 rounded" />
        <div className="bg-gray-medium h-4 w-32 rounded" />
        <div className="bg-gray-medium h-4 w-40 rounded" />
      </div>

      <div className="flex gap-2 justify-center">
        <div className="bg-gray-medium h-8 w-20 rounded" />
        <div className="bg-gray-medium h-8 w-20 rounded" />
      </div>
    </div>
  );
}
