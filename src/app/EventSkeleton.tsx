import { JSX } from 'react';

export const EventSkeleton = (): JSX.Element => (
  <div className="w-full border grid gap-2 text-left rounded p-2 animate-pulse">
    {/* Title skeleton */}
    <div className="h-5 bg-gray-200 rounded w-3/4"></div>

    {/* Date and time skeleton */}
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>

    {/* Location skeleton */}
    <div className="h-4 bg-gray-200 rounded w-2/3"></div>

    {/* Topic tags skeleton */}
    <div className="flex flex-wrap gap-1">
      <div className="h-6 bg-gray-200 rounded-full w-16"></div>
      <div className="h-6 bg-gray-200 rounded-full w-20"></div>
      <div className="h-6 bg-gray-200 rounded-full w-12"></div>
    </div>
  </div>
);
