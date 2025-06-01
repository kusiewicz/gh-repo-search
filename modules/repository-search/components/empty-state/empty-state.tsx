export const EmptyState = ({ searchQuery }: { searchQuery: string }) => (
  <div
    className="rounded-lg bg-white/5 p-6 text-center"
    role="status"
    aria-live="polite"
  >
    <h2 className="text-lg font-semibold text-white/60">
      No repositories found for {searchQuery}
    </h2>
    <p className="mt-2 text-white/40">
      Try adjusting your search terms or filters
    </p>
  </div>
);
