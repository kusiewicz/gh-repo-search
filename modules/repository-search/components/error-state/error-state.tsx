import { FormattedError } from "@/utils/formatted-error/formatted-error";
import { useState } from "react";

export const ErrorState = ({
  error,
  onRetry,
}: {
  error: FormattedError | null;
  onRetry: () => void;
}) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!error) return null;

  return (
    <div
      className="z-10 col-span-full rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center"
      role="alert"
      aria-live="assertive"
    >
      <h2 className="mb-2 font-semibold text-red-400">
        Error Loading Repositories
      </h2>
      <p className="mb-4 break-words text-white/80">{error.userMessage}</p>

      {error.message && (
        <>
          <button
            onClick={() => setShowDetails((v) => !v)}
            className="mx-auto mb-4 block cursor-pointer text-xs text-red-300 underline hover:text-red-200"
            aria-label={
              showDetails ? "Hide error details" : "Show error details"
            }
          >
            {showDetails ? "Hide details" : "Show details"}
          </button>
          {showDetails && (
            <pre className="mb-4 max-w-full overflow-x-auto rounded bg-red-900/20 p-2 text-left text-xs break-words whitespace-pre-wrap text-white/60">
              {error.message}
            </pre>
          )}
        </>
      )}

      <button
        onClick={onRetry}
        className="cursor-pointer rounded-md bg-red-500/20 px-4 py-2 text-red-400 transition-colors hover:bg-red-500/30"
        aria-label="Try loading repositories again"
      >
        Try Again
      </button>
    </div>
  );
};
