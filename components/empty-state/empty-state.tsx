import React from "react";

export const EmptyState = ({ searchQuery }: { searchQuery: string }) => (
  <div className="rounded-lg bg-white/5 p-6 text-center">
    <p className="text-lg text-white/60">
      No repositories found for {searchQuery}
    </p>
    <p className="mt-2 text-white/40">
      Try adjusting your search terms or filters
    </p>
  </div>
);
