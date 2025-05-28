import React from "react";

export const EmptyState = ({ searchQuery }: { searchQuery: string }) => (
  <div className="bg-white/5 rounded-lg p-6 text-center">
    <p className="text-white/60 text-lg">
      No repositories found for {searchQuery}
    </p>
    <p className="text-white/40 mt-2">
      Try adjusting your search terms or filters
    </p>
  </div>
);
