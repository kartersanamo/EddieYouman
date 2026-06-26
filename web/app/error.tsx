"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 pt-24 text-center">
      <h1 className="font-display text-4xl font-bold text-forest">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-slate/70">
        We hit an unexpected error. Please try again, or contact us if the
        problem continues.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-lg bg-teal px-6 py-3 text-sm font-semibold text-white hover:bg-teal-light"
      >
        Try again
      </button>
      {process.env.NODE_ENV === "development" ? (
        <p className="mt-6 max-w-lg break-all text-left text-xs text-red-700">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}
