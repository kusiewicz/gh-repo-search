export const ErrorState = ({
  error,
  onRetry,
}: {
  error: Error | null;
  onRetry: () => void;
}) => (
  <div className="col-span-full bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
    <h3 className="text-red-400 font-semibold mb-2">
      Error Loading Repositories
    </h3>
    <p className="text-white/80 mb-4">{error?.message}</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-md transition-colors"
    >
      Try Again
    </button>
  </div>
);
