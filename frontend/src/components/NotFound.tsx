import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <SearchX size="48" />
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Not found</h1>
        <p>
          No pages matches this route
        </p>
      </div>
    </div>
  );
}
