export const ErrorState = ({
  error,
  onRetry,
}: {
  error: Error | null;
  onRetry: () => void;
}) => (
  <div
    className="col-span-full rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center"
    role="alert"
    aria-live="assertive"
  >
    <h2 className="mb-2 font-semibold text-red-400">
      Error Loading Repositories
    </h2>
    {error?.message ? (
      <p className="mb-4 text-white/80">{error.message}</p>
    ) : null}
    <button
      onClick={onRetry}
      className="rounded-md bg-red-500/20 px-4 py-2 text-red-400 transition-colors hover:bg-red-500/30"
      aria-label="Try loading repositories again"
    >
      Try Again
    </button>
  </div>
);
